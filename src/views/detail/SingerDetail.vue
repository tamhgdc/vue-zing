<template>
<div>
<div class="SingerDetail">
    <div class="SingerInfo">
        <!-- 歌手封面图 -->
        <div class="SingerCover">
            <img :src="singerInfo.cover+'?param=300y300'" alt="">
        </div>
        <!-- 歌手信息 -->
        <div class="SingerItems">
            <!-- 歌手名 -->
            <div class="SingerName">{{singerInfo.name}}</div>
            <!-- 歌手其他信息 -->
            <div class="OtherDetails">
                <div>单曲数: {{singerInfo.musicSize}}</div>
                <div>专辑数: {{singerInfo.albumSize}}</div>
                <div>mv数: {{singerInfo.mvSize}}</div>
            </div>
        </div>
    </div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="专辑" name="first">
            <div class="top50">

                <!-- <preview-card
                    :songs="top10"
                    title="热门50首"
                    listId="top50"
                    :imgUrl="require('/src/assets/img/topSongsLogo.png')"
                    :showAllBtn="top50.length>10"
                    @clickSong=clickRow
                    @clickDetail=clickTop50
                    >
                </preview-card> -->
                <div class="PreviewCard">
                    <div class="listCover">
                        <img
                        :src="require('/src/assets/img/topSongsLogo.png')"
                        alt=""
                        @click="clickTop50()"
                        />
                    </div>
                    <div class="listContainer">
                        <div class="title">{{热门50首}}</div>
                        <table>
                            <tr
                            class="listRows"
                            v-for="(item, index) in top10"
                            :key="index"
                            @dblclick="clickRow(item)"
                        >
                            <td class="index">{{ index + 1 }}</td>
                            <td class="musicName">{{ item.name }}</td>
                            <td class="singer">{{ showAllSinger(item.ar) }}</td>
                        </tr>
                        </table>
                        <div class="checkAll" v-if="top50.length>10 && !isShowAllTop50" @click="clickTop50">
                            查看全部 <i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="checkAll" v-if="isShowAllTop50" @click="clickTop50To10">
                            收起 <i class="el-icon-arrow-up"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div v-for="al in albumList" :key="al.id" class="preList">
                <preview-card
                    :songs="sliceSongs(al.songs)"
                    :title="al.name"
                    :imgUrl="al.picUrl"
                    :listId="al.id"
                    :showAllBtn="al.songs.length>10"
                    @clickSong=clickRow
                    @clickDetail=clickListCardItem
                    >
                </preview-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
            <video-list-card
            :videoList="mvs"
            ></video-list-card>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="third">
            <div class="description">{{singerInfo.briefDesc}}</div>
        </el-tab-pane>
    </el-tabs>
</div>
</div>

</template>

<script>
import PreviewCard from '../../components/PreviewCard.vue'
import VideoListCard from "../../components/VideoListCard.vue"
export default {
    name: 'singerDetail',
    components: {PreviewCard, VideoListCard},
    data() {
        return {
            singerInfo: {},
            top50: [],
            top10: [],
            isShowAllTop50: false,
            mvs: [],
            albumList: [],
            singerSinger: [],
            activeName: 'first',
        }
    },
    methods: {
        sliceSongs(songs) {
            return songs.slice(0,10)
        },
        clickListCardItem(id) {
            // console.log(id)
            this.$router.push({name:'album',params:{id}})
        },
        clickRow(row) {
            // console.log(row)
            //this.$store.commit('addPlayListItem',row)
            this.$store.dispatch('execHandler',['addPlayListItem',row])
        },
        clickTop50() {
            this.top10 = this.top50
            this.isShowAllTop50 = true
        },
        clickTop50To10() {
            this.top10 = this.top50.slice(0,10)
            this.isShowAllTop50 = false
        },
        showAllSinger(ar) {
            let res = []
            ar.forEach(element => {
                res.push(element.name)
            })
            return res.join('/')
        },
        async getSingerInfo() {
            let res = await this.$request("/artist/detail", {
                id: this.$route.params.id,
            });
            // console.log(res);
            this.singerInfo = res.data.data.artist;
        },
        async getSingerTopSongs() {
            let res = await this.$request("/artist/top/song", {
                id: this.$route.params.id,
            });
            // console.log(res);
            this.top50 = res.data.songs;
            this.top10 = this.sliceSongs(this.top50)
        },
        async getAlbumInfo() {
            let res = await this.$request("/artist/album", {
                id: this.$route.params.id,
            })
            // console.log(res)
            this.albumList = res.data.hotAlbums
            for (let i=0; i<this.albumList.length; i++) {
                let ret = await this.$request("/album", { id: this.albumList[i].id })
                this.albumList[i].songs = ret.data.songs
            }
        },
        async getSingerMv() {
            let res = await this.$request("/artist/mv", {
                id: this.$route.params.id,
            })
            // console.log(res)
            this.mvs = res.data.mvs
        },
        async initData() {
            await this.getSingerInfo()
            await this.getSingerTopSongs()
            await this.getAlbumInfo()
            await this.getSingerMv()
        },
    },
    created() {
        this.initData()
    }
}
</script>

<style scoped>
.SingerDetail {
    margin:0 15vw;
}
.SingerInfo {
    display: flex;
    margin: 50px 0 20px 0;
}
.SingerCover {
    width: 200px;
    height: 200px;
    margin-right: 30px;
    border-radius: 15px;
}
.SingerCover img{
    width: 100%;
    border-radius: 15px;
}
.SingerItems {
    display: flex;
    flex-direction: column;
}
.SingerName {
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: 700;
    white-space: nowrap;
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
.top50 {
    margin:20px 0 50px 0;
}
.preList {
    margin:50px 0;
}

.PreviewCard {
  display: flex;
}

.listCover {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  cursor: pointer;
}

.listCover img {
  width: 100%;
  border-radius: 10px;
}

.listContainer {
  width: calc(100% - 220px);
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

.listRows {
  height: 35px;
  font-size: 14px;
  color: rgb(153, 153, 153);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.listRows:nth-child(odd) {
  background-color: #f9f9f9;
}
.listRows:hover {
  background-color: #f4f4f4;
}

.index {
  text-align: center;
  line-height: 35px;
  width: 30px;
}

.listRows .musicName {
  color: rgb(31, 31, 31);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
}

.singer {
  text-align: right;
  position: absolute;
  right: 10px;
}

.checkAll {
  color: rgb(134, 134, 134);
  font-size: 14px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.checkAll i {
  font-size: 14px;
}

.selectRow {
  background-color: #efefef !important;
}

tr {
  cursor: pointer;
}
</style>