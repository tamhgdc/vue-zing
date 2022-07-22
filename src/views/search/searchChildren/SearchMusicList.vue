<template>
<div class="searchmusicList">
    <div class="tip">找到{{musicListCount}}个歌单</div>
    <music-list-card
        :listCardData="searchMusicListList"
        @clickListCardItem="clickListCardItem"
    ></music-list-card>
    <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :page-size="30"
            :total="musicListCount"
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
    name: 'SearchMusicList',
    components: {MusicListCard},
    data() {
        return {
            musicListCount: 0,
            searchMusicListList: [],
            currentPage: 1,
        }
    },
    methods : {
        async getSearchMusicList(){
            let res = await this.$request("/cloudsearch",{
                keywords: this.$route.params.id,
                offset: 30 * (this.currentPage - 1),
                type: 1000,
            })
            this.musicListCount = res.data.result.playlistCount
            this.searchMusicListList = res.data.result.playlists
        },
        pageChange(page) {
            this.currentPage = page;
            this.searchMusicListList = [];
            this.getSearchMusicList();
        },
        clickListCardItem(id) {
            // console.log(id)
            this.$router.push({name:'musiclist',params:{id}})
        }
    },
    created() {
        this.getSearchMusicList()
    }
}
</script>

<style scoped>
.searchmusicList {
    padding: 0 15vw;
}
.tip {
    font-size: 18px;
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin: 20px 0;
}
.pager {
    width: 100%;
    text-align: center;
    margin: 20px 0;
}
</style>