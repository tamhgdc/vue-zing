<template>
    <div class="DiscMusicList">
        <!-- 精品歌单 -->
        <div class="choicedList" @click="clickChoicedList">
            <img :src="choicedList.coverImgUrl" alt="" class="backgroundImg"/>
            <div class="imgbox">
                <img :src="choicedList.coverImgUrl" alt="">
            </div>
            <div class="listInfo">
                <div class="tag"><i class="el-icon-collection-tag"></i> 精品歌单</div>
                <div class="name">{{choicedList.name}}</div>
                <div class="desc">{{choicedList.copywriter}}</div>
            </div>
        </div>
        <!-- 歌单列表 -->
        <div class="ListNavBar">
            <div class="left">
                <el-popover
                placement="bottom-start"
                width="400"
                trigger="click"
                ref="tagPopover"
                >
                    <!-- 标签 -->
                    <div class="tags">
                        <el-radio v-model="currentTag" label="全部" :key="0" @change="clickTag" border>全部</el-radio>
                        <el-radio
                        v-for = "t in tags"
                        v-model = "currentTag" 
                        :label = "t.name" 
                        :key = "t.name"
                        @change="clickTag"
                        border
                        >{{t.name}}</el-radio>
                    </div>
                <el-button round type="tagbtn" slot="reference" class="tagbtn">{{currentTag}} <i class="el-icon-arrow-right"></i></el-button>
                </el-popover>
            </div>
            <div class="right">
                <el-radio
                    v-for = "t in hotTags"
                    v-model = "currentTag" 
                    :label = "t.name" 
                    :key = "t.name+'2'"
                    @change="clickTag"
                    border
                >{{t.name}}</el-radio>
                </div>
        </div>
        <!-- 歌单展示 -->
        <music-list-card
            :listCardData="musicList.playlists"
            @clickListCardItem="clickListCardItem"
            @clickListCardBtn="clickListCardBtn"
        ></music-list-card>
        <div class="pager" v-if="musicList.playlists">
        <el-pagination
            layout="prev, pager, next"
            :total="musicList.total"
            :page-size="50"
            :current-page="currentPage"
            @current-change="pageChange"
        >
        </el-pagination>
        </div>
    </div>
</template>

<script>
import MusicListCard from '../../../components/MusicListCard.vue'
export default {
    components: { MusicListCard },
    name: "DiscMusicList",
    data() {
        return {
            choicedList: {},
            tags: [],
            hotTags: [],
            musicList: {},
            currentTag: "全部", 
            currentPage: 1,

        }
    },
    methods: {
        // 处理请求事件
        // 获取高质量歌单的第一条数据
        async getTheFirstOfHighquality() {
            let result = await this.$request("/top/playlist/highquality", {limit: 1,})
            this.choicedList = result.data.playlists[0];
        },
        // 获取歌单tag数据
        async getTags() {
            let res = await this.$request("/playlist/hot")
            this.hotTags = res.data.tags
            res = await this.$request("/playlist/catlist")
            this.tags = res.data.sub
        },
        // 根据歌名请求歌单列表
        async getMusicList() {
            this.musicList = {};
            let result = await this.$request("/top/playlist", {
                cat: this.currentTag,
                offset: 50 * (this.currentPage - 1),
            });
            this.musicList = result.data;
        },
        //当页数发生改变时
        pageChange(page) {
            this.currentPage = page;
            this.getMusicList();
        },
        //点击歌单的回调
        clickListCardItem(id) {
            // console.log(id);
            this.$router.push({ name: "musiclist", params: { id } });
        },
        //点击播放按钮的回调
        async clickListCardBtn(id) {
            // console.log(id)
            let res = await this.$request("/playlist/detail", {id});
            // console.log(res.data.playlist.tracks)
            this.$store.dispatch('execHandler',['updatePlayList',res.data.playlist.tracks])
        },
        clickTag() {
            // console.log(this.currentTag)
            this.currentPage = 1;
            this.getMusicList();
            this.$refs.tagPopover.doClose()
        },
        clickChoicedList() {
            console.log(this.choicedList.id)
            this.$router.push({name:'musiclist',params:{id:this.choicedList.id}})
        }
    },
    // created生命周期
    async created() {
        this.getTheFirstOfHighquality();
        await this.getTags();
        this.getMusicList();
    },
}  
</script>

<style scoped>
.DiscMusicList {
    padding: 0 15vw;
}
.choicedList {
    display: flex;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    margin: 20px 0;
    cursor: pointer;
}
.choicedList .backgroundImg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    filter: blur(30px) brightness(70%);
}
.choicedList .imgbox {
    width: 150px;
    height: 150px;
    margin: 20px;
    overflow: hidden;
    border-radius: 15px;
}
.choicedList .imgbox img {
    width: 100%;
}
.choicedList .listInfo {
    margin: 20px;
}
.choicedList .listInfo .tag {
    color: #d59e54;
    border: 1px solid #d59e54;
    padding: 5px 10px;
    width: 80px;
    font-size: 14px;
    margin: 20px 0;
    border-radius: 15px;
}
.choicedList .listInfo .tag i {
  font-size: 16px;
}
.choicedList .listInfo .name {
  color: white;
  font-size: 16px;
  margin: 10px 0;
}
.choicedList .listInfo .desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}
.ListNavBar {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
}
.tagbtn {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    font-size: 16px;
}
.tags {
    padding: 10px;
    height: 40vh;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.tags::-webkit-scrollbar {
    display:none
}
.el-radio {
    height: 32px;
    border-radius: 15px;
    padding: 0 !important;
    margin: 2px 5px !important;
}
.pager {
    width: 100%;
    text-align: center;
    margin: 20px 0;
}

</style>