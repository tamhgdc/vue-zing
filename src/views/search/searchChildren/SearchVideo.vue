<template>
<div class="searchvideo">
    <div class="tip">找到{{videoCount}}个视频</div>
    <video-list-card
    :videoList="searchVideoList"
    ></video-list-card>
    <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :page-size="30"
            :total="videoCount"
            :current-page="currentPage"
            @current-change="pageChange"
        >
        </el-pagination>
    </div>
</div>
</template>

<script>
import VideoListCard from "../../../components/VideoListCard.vue"
export default {
    name: 'SearchVideo',
    components: {VideoListCard},
    data() {
        return {
            videoCount: 0,
            searchVideoList: [],
            currentPage: 1,
        }
    },
    methods: {
        async getSearchVideo() {
            let res = await this.$request("/cloudsearch", {
                keywords: this.$route.params.id,
                offset: 30 * (this.currentPage - 1),
                type: 1014,
            });
            this.videoCount = res.data.result.videoCount
            this.searchVideoList = res.data.result.videos
        },
        pageChange(page) {
            this.currentPage = page;
            this.searchVideoList = [];
            this.getSearchVideo();
        },
    },
    created() {
        this.getSearchVideo();
    },
}
</script>

<style scoped>
.searchvideo {
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