<template>
<div class="searchsinger">
    <div class="tip">找到{{singerCount}}位歌手</div>
    <list-card
        :listCardData="searchSingerList"
        @clickListCardItem="clickListCardItem"
    ></list-card>
    <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :page-size="30"
            :total="singerCount"
            :current-page="currentPage"
            @current-change="pageChange"
        >
        </el-pagination>
    </div>
</div>
</template>

<script>
import ListCard from '../../../components/ListCard.vue'
export default {
    name: 'SearchSinger',
    components: {ListCard},
    data() {
        return {
            singerCount: 0,
            searchSingerList: [],
            currentPage: 1,
        }
    },
    methods : {
        async getSearchSinger(){
            let res = await this.$request("/cloudsearch",{
                keywords: this.$route.params.id,
                offset: 30 * (this.currentPage - 1),
                type: 100,
            })
            this.singerCount = res.data.result.artistCount
            this.searchSingerList = res.data.result.artists
        },
        pageChange(page) {
            this.currentPage = page;
            this.searchSingerList = [];
            this.getSearchSinger();
        },
        clickListCardItem(id) {
            this.$router.push({name:'singer',params: {id}})
        }
    },
    created() {
        this.getSearchSinger()
    }
}
</script>

<style scoped>
.searchsinger {
    padding: 0  15vw;
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