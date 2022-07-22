<template>
<div>
<div class="MusicListDetail">
        <!-- 歌单信息 -->
        <div class="MusicListInfo">
            <!-- 歌单封面 -->
            <div class="MusicListCover">
                <img :src="musicListInfo.coverImgUrl" alt="">
            </div>
            <!-- 歌单杂项 -->
            <div class="MusicListItems">
                <!-- 标题 -->
                <div class="MusicListTitle">
                    <!-- 标签 -->
                    <div class="tag">歌单</div>
                    <!-- 标题 -->
                    <div class="title">{{musicListInfo.name}}</div>
                </div>
                <div class="creator">
                    <div class="userAvatar">
                        <img :src="musicListInfo.creator.avatarUrl" alt="">
                    </div>
                    <div class="userName">{{musicListInfo.creator.nickname}}</div>
                    <div class="time">{{createTime}}创建</div>
                </div>
                <!-- 按钮 -->
                <div class="buttons">
                    <el-button round type="mybtn2" @click="playAll"><i class="el-icon-caret-right"></i> 播放全部</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-folder-add"></i> 收藏</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-share"></i> 分享</el-button>
                    <el-button round type="mybtn1"><i class="el-icon-download"></i> 下载全部</el-button>
                </div>
                <!-- 歌单信息 -->
                <div class="OtherDetails">
                    <div>标签: 
                        <span v-for="(item,index) in musicListInfo.tags" :key="index">{{item}}</span>
                        <span v-if="musicListInfo.tags.length===0">暂无标签</span>
                    </div>
                    <div>歌曲: {{musicListInfo.trackCount}} 播放: {{musicListInfo.playCount}}</div>
                    <div class="desc">简介: {{musicListInfo.description ? musicListInfo.description : "暂无简介"}}</div>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="歌曲列表" name="first">
                <el-table
                :data="musicListInfo.tracks"
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
                    <el-table-column prop="al.name" label="歌单" min-width="140"></el-table-column>
                    <el-table-column prop="dt" :formatter="showTime" label="时长" min-width="100"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="收藏者" name="third">
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import {secondToTime} from '../../utils/index'
import moment from 'moment'
export default {
    name:'MusicListDetail',
    data() {
        return {
            musicListInfo:{},
            activeName: 'first'
        }
    },
    methods: {
        async getMusicListDetail() {
            let timestamp = Date.parse(new Date())
            let res = await this.$request("/playlist/detail", {
                id: this.$route.params.id,
                timestamp,
            });
            // res = res.data.playlist
            // 处理歌曲时间
            // res.tracks.forEach((item, index) => {
            //     res.tracks[index].dt = secondToTime(item.dt);
            // });
            // console.log(res);
            // this.musicListInfo = res;
            this.musicListInfo = res.data.playlist
        },
        //点击播放全部
        playAll() {
            this.$store.dispatch('execHandler',['updatePlayList',this.musicListInfo.tracks])
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
        clickRow(row) {
            // console.log(row)
            this.$store.dispatch('execHandler',['addPlayListItem',row])
        },
        highlightPlaying(row) {
            // console.log('hl:',row)
            if (row.row.id===this.$store.state.playId) return "playing"
                return ''
        },
    },
    computed: {
        createTime() {
            return moment(this.musicListInfo.createTime).format('YYYY-MM-DD')
        }
    },
    created() {
        this.getMusicListDetail()
    }
}
</script>

<style scoped>
.MusicListDetail {
    margin:0 5vw;
}
.MusicListInfo {
    display: flex;
    margin: 50px 0 20px 0;
}
.MusicListCover {
    width: 200px;
    height: 200px;
    margin-right: 30px;
}
.MusicListCover img{
    width: 100%;
    border-radius: 15px;
}
.MusicListItems {
    display: flex;
    flex-direction: column;
}
.MusicListTitle {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.MusicListTitle .tag {
    font-size: 14px;
    color: #70B879;
    border: 1px solid #70B879;
    padding: 1px 2px;
    border-radius: 2px;
    margin-right: 10px;
}
.MusicListTitle .title {
    font-size: 24px;
    font-weight: 700;
    white-space: nowrap;
}
.creator {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.creator .userAvatar {
    height: 30px;
    width: 30px;
    overflow: hidden;
    border-radius: 15px;
    margin-right: 10px;
}
.creator .userAvatar img {
    width: 100%;
}
.creator .userName {
    margin-right: 10px;
}

.buttons {
    display: flex;
    margin-bottom: 10px;
}
.el-button {
    font-size: 16px;
    padding: 10px 20px 10px 16px;
}
.OtherDetails {
    font-size: 14px;
    color: grey;
}
.OtherDetails span {
    margin-right: 5px;
    font-weight: 700;
}
.OtherDetails div {
    margin: 5px 0;
}
.OtherDetails .desc {
    width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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