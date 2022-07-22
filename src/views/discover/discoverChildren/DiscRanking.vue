<template>
    <div class="DiscRanking">
        <div v-if="isReady">
            <div class="offical">
                <div class="title">官方榜</div>
                <div v-for="ol in officialListDetail" :key="ol.id" class="preList">

                    <preview-card
                    :songs="ol.tracks"
                    title=""
                    :imgUrl="ol.coverImgUrl"
                    :listId="ol.id"
                    :showAllBtn="true"
                    @clickSong=clickRow
                    @clickDetail=clickListCardItem
                    >
                    </preview-card>

                </div>
            </div>
            <div class="global">
                <div class="title">全球榜</div>
                <list-card
                    :listCardData="globalList"
                    @clickListCardItem="clickListCardItem"
                ></list-card>
            </div>
        </div>
    </div>
</template>

<script>
import PreviewCard from '../../../components/PreviewCard.vue'
import ListCard from '../../../components/ListCard.vue'
export default {
    name: 'DiscRanking',
    data() {
        return {
            isReady: false,
            officialList: [],
            officialListDetail: [],
            globalList: [],
        }
    },
    methods: {
        async getAllList() {
            let tl = await this.$request("/toplist");
            this.officialList = tl.data.list.slice(0, 4);
            this.globalList = tl.data.list.slice(4);
            for (let i=0; i<4; i++) {
                let ol = await this.$request("/playlist/detail", {id:this.officialList[i].id})
                ol.data.playlist.tracks = ol.data.playlist.tracks.slice(0,5)
                this.officialListDetail.push(ol.data.playlist)
            }
        },
        clickListCardItem(id) {
            console.log(id)
            this.$router.push({name:'musiclist',params:{id}})
        },
        clickRow(row) {
            // console.log(row)
            //this.$store.commit('addPlayListItem',row)
            this.$store.dispatch('execHandler',['addPlayListItem',row])
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
    },
    components: {ListCard, PreviewCard},
    created() {
        this.isReady = false
        this.getAllList()
        this.isReady = true
    }
}
</script>

<style scoped>
.DiscRanking {
    margin: 0 15vw;
}
.preList {
    width: 100%;
    margin-bottom: 50px;
}
.preList .left {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
}
.preList .left img {
    width: 100%;
}
.preList .right {
    width: 55vw;
    height: 250px;
    overflow: hidden;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    align-items: flex-start;
}
.preList .right .more {
    cursor: pointer;
    color: #aaa;
    width: 100px;
    margin-top:30px;
}
.title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 30px 0 15px 0;
}
</style>