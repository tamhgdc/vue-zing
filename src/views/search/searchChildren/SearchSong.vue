<template>
<div class="searchsong">
    <div class="tip">找到{{songCount}}首单曲</div>
    <div class="bestMatch" v-if="bestMatch.artist && currentPage===1" @click="clickListCardItem(bestMatch.artist[0].id)">
        <div class="matchTitle">最佳匹配</div>
        <div class="matchResult">
            <img class="matchCover" :src="bestMatch.artist[0].img1v1Url+'?param==200y200'" alt="">
            <div class="matchName">歌手：{{bestMatch.artist[0].name}}</div>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
    <el-table
        class="resultList"
        :data="searchSongList"
        size="mini"
        stripe
        @row-dblclick="clickRow"
        :row-class-name="highlightPlaying"
    >
        <el-table-column label="" width="50" type="index" :index="getRealIndex"></el-table-column>
        <el-table-column label="" width="25"><i class="el-icon-star-off"></i></el-table-column>
        <el-table-column label="" width="25"><i class="el-icon-download"></i></el-table-column>
        <el-table-column prop="name" label="音乐标题" min-width="200"></el-table-column>
        <el-table-column prop="ar" label="歌手" :formatter="showAllSinger" min-width="100"></el-table-column>
        <el-table-column prop="al.name" label="专辑" min-width="170"></el-table-column>
        <el-table-column prop="dt" label="时长" :formatter="showTime" min-width="60"> </el-table-column>
    </el-table>
    <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :page-size="30"
            :total="songCount"
            :current-page="currentPage"
            @current-change="pageChange"
        >
        </el-pagination>
    </div>
</div>
</template>

<script>
import {secondToTime} from '../../../utils/index'
export default {
    name: 'SearchSong',
    data() {
        return {
            bestMatch: {},
            searchSongList: [],
            songCount: 0,
            currentPage: 1,
        }
    },
    methods: {
        //获取最佳匹配
        async getBestMatch() {
            let res = await this.$request("/search/multimatch", {
                keywords: this.$route.params.id,
            })
            this.bestMatch = res.data.result
        },

        //获取搜索单曲列表
        async getSearchSong() {
            let res = await this.$request("/cloudsearch",{
                keywords: this.$route.params.id,
                offset: 30 * (this.currentPage - 1),
            })
            this.songCount = res.data.result.songCount
            this.searchSongList = res.data.result.songs
            //将时长处理正常
            // this.searchSongList.forEach((item, index) => {
            //     this.searchSongList[index].dt = secondToTime(item.dt)
            // })
            
        },
        //加上(页数-1)*30的Index值
        getRealIndex(index) {
            index = (this.currentPage-1)*30 + index + 1
            if (index<10) return '0'+index //补零
            return index
        },
        //改变页码
        pageChange(page) {
            this.currentPage = page
            this.searchSongList = []
            this.getSearchSong()
        },
        //拼接多个歌手
        showAllSinger(row,column) {
            let singers = row[column.property]
            if (singers == undefined) {
                return ""
            }
            let ret = []
            singers.forEach(i => {
                ret.push(i.name)
            })
            return ret.join('/')
        },
        //显示格式化时间
        showTime(row,column) {
            let sec = row[column.property]
            if (sec == undefined) {
                return ""
            }
            return secondToTime(sec)
        },
        //点击添加歌曲
        clickRow(row) {
            // console.log(row)
            //this.$store.commit('addPlayListItem',row)
            this.$store.dispatch('execHandler',['addPlayListItem',row])
        },
        highlightPlaying(row) {
            if (row.row.id===this.$store.state.playId) return "playing"
                return ''
        },
        clickListCardItem(id) {
            this.$router.push({name:'singer',params: {id}})
        },
    },
    created() {
        this.getBestMatch()
        this.getSearchSong()
    }
}
</script>

<style scoped>
.searchsong {
    padding: 0 50px;
}
.tip {
    font-size: 18px;
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin: 20px 0;
}
.matchTitle {
    font-size: 16px;
    color: rgb(34, 34, 34);
    margin: 5px 0;
}
.matchResult {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: rgba(233,234,240);
    width: 300px;
    height: 100px;
    margin-bottom: 20px;
    cursor: pointer;
}
.matchCover {
    width: 100px;
    height: 100px;
}
.matchCover img {
    width: 100%;
    height: 100%;
}
.matchName {
    font-size: 18px;
    color: rgb(31, 31, 31);
    margin-left: 10px;
}
.bestMatch {
    margin:20px 0;
}
.bestMatch i {
    font-size: 18px;
    position: absolute;
    transform: translateY(-50%);
    right: 15px;
    top: 50%;
}
.resultList {
    width: 100%;
    margin: 20px 0;
    font-size: 14px;
}
.pager {
    width: 100%;
    text-align: center;
    margin: 20px 0;
}
.el-pagination .selected{
    background-color: rgb(83,139,156);
}
</style>