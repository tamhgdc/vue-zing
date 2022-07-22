<template>
<div>
    <div class="AlbumDetail">
        <!-- 专辑信息 -->
        <div class="AlbumInfo">
            <!-- 专辑封面 -->
            <div class="AlbumCover">
                <img :src="albumInfo.album.picUrl+'?param=300y300'" alt="">
            </div>
            <!-- 专辑杂项 -->
            <div class="AlbumItems">
                <!-- 标题 -->
                <div class="AlbumTitle">
                    <!-- 标签 -->
                    <div class="tag">专辑</div>
                    <!-- 标题 -->
                    <div class="title">{{albumInfo.album.name}}</div>
                </div>
                <!-- 按钮 -->
                <div class="buttons">
                    <el-button round type="mybtn2" @click="playAll"><i class="el-icon-caret-right"></i> 播放全部</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-folder-add"></i> 收藏</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-share"></i> 分享</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-download"></i> 下载全部</el-button>
                </div>
                <!-- 专辑信息 -->
                <div class="OtherDetails">
                    <div>歌手:{{artists}}</div>
                    <div>时间: {{publishday}}</div>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="歌曲列表" name="first">
                <el-table
                :data="albumInfo.songs"
                size="mini"
                style="width: 100%"
                stripe
                @row-dblclick="clickRow"
                :row-class-name="highlightPlaying"
                >
                    <el-table-column label="" width="50" type="index"></el-table-column>
                    <el-table-column label="" width="25"><i class="el-icon-star-off"></i></el-table-column>
                    <el-table-column label="" width="25"><i class="el-icon-download"></i></el-table-column>
                    <el-table-column prop="name" label="音乐标题" min-width="200"></el-table-column>
                    <el-table-column prop="ar" :formatter="showAllSinger" label="歌手" min-width="100"></el-table-column>
                    <el-table-column prop="al.name" label="专辑" min-width="140"></el-table-column>
                    <el-table-column prop="dt" :formatter="showTime" label="时长" min-width="100"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="专辑详情" name="third">
                <div class="description">{{albumInfo.album.description}}</div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import {secondToTime} from '../../utils/index'
import moment from 'moment'
export default {
    name:'AlbumDetail',
    data() {
        return {
            albumInfo:{},
            activeName: 'first'
        }
    },
    methods: {
        async getAlbumDetail() {
            let res = await this.$request("album", { id: this.$route.params.id });
            // res = res.data;
            // // 处理歌曲时间
            // res.songs.forEach((item, index) => {
            //     res.songs[index].dt = secondToTime(item.dt);
            // });
            // console.log(res);
            // this.albumInfo = res;
            this.albumInfo = res.data
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
        //点击播放全部
        playAll() {
            this.$store.dispatch('execHandler',['updatePlayList',this.albumInfo.songs])
        },
        //显示格式化时间
        showTime(row,column) {
            let sec = row[column.property]
            if (sec == undefined) {
                return ""
            }
            return secondToTime(sec)
        },
        clickRow(row) {
            // console.log(row)
            this.$store.dispatch('execHandler',['addPlayListItem',row])
        },
        highlightPlaying(row) {
            if (row.row.id===this.$store.state.playId) return "playing"
                return ''
        },
    },
    computed: {
        artists() {
            let ret = ''
            this.albumInfo.album.artists.forEach((item)=>{
                ret = ret + ' ' + item.name
            })
            return ret
        },
        publishday() {
            return moment(this.albumInfo.album.publishTime).format('YYYY-MM-DD')
        }
    },
    created() {
        this.getAlbumDetail()
    }
}
</script>

<style scoped>
.AlbumDetail {
    margin:0 5vw;
}
.AlbumInfo {
    display: flex;
    margin: 50px 0 20px 0;
}
.AlbumCover {
    width: 200px;
    height: 200px;
    margin-right: 30px;
    border-radius: 15px;
}
.AlbumCover img{
    width: 100%;
    border-radius: 15px;
}
.AlbumItems {
    display: flex;
    flex-direction: column;
}
.AlbumTitle {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.AlbumTitle .tag {
    font-size: 14px;
    color: #70B879;
    border: 1px solid #70B879;
    padding: 1px 2px;
    border-radius: 2px;
    margin-right: 10px;
}
.AlbumTitle .title {
    font-size: 24px;
    font-weight: 700;
    white-space: nowrap;
}
.buttons {
    display: flex;
    margin-bottom: 30px;
}
.el-button {
    font-size: 16px;
    padding: 10px 20px 10px 16px;
}
.OtherDetails {
    font-size: 16px;
    color: grey;
}
.OtherDetails div {
    margin: 5px 0;
}
.description {
    font-size: 16px;
    color: #373737;
    line-height: 30px;
    letter-spacing: 0.5px;
    text-indent: 2em;
}
.el-table {
    font-size: 14px;
}
</style>