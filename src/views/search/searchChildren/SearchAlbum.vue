<template>
<div class="searchalbum">
    <div class="tip">找到{{albumCount}}张专辑</div>
    <list-card
        :listCardData="searchAlbumList"
        @clickListCardItem="clickListCardItem"
    ></list-card>
    <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :page-size="30"
            :total="albumCount"
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
    name: 'SearchAlbum',
    components: { ListCard },
    data() {
        return {
            albumCount: 0,
            searchAlbumList: [],
            currentPage: 1,
        }
    },
    methods: {
        async getSearchAlbum(){
            let res = await this.$request("/cloudsearch",{
                keywords: this.$route.params.id,
                offset: 30 * (this.currentPage - 1),
                type: 10,
            })
            this.albumCount = res.data.result.albumCount
            this.searchAlbumList = res.data.result.albums
        },
        pageChange(page) {
            this.currentPage = page;
            this.searchAlbumList = [];
            this.getSearchAlbum();
        },
        clickListCardItem(id) {
            // console.log(id)
            this.$router.push({name:'album',params:{id}})
        }
    },
    created() {
        this.getSearchAlbum();
    }
}
</script>

<style scoped>
.searchalbum{
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