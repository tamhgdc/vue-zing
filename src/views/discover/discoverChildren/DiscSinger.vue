<template>
    <div class="DiscSinger">
        <div class="sortBox">
            <div class="sort">
                <div class="title">语种：</div>
                <div class="tags">
                    <el-radio
                    v-for = "(t,i) in langSort"
                    v-model = "lang" 
                    :label = "t.area" 
                    :key = "'lang'+i"
                    @change="clickTag"
                    border
                    >{{t.name}}</el-radio>
                </div>
            </div>
            <div class="sort"> 
                <div class="title">分类：</div>
                <div class="tags">
                    <el-radio
                    v-for = "(t,i) in typeSort"
                    v-model = "type" 
                    :label = "t.type" 
                    :key = "'type'+i"
                    @change="clickTag"
                    border
                    >{{t.name}}</el-radio>
                </div>
            </div>
            <div class="sort">
                <div class="title">筛选：</div>
                <div class="tags">
                    <el-radio
                    v-for = "(t,i) in initSort"
                    v-model = "init" 
                    :label = "t.initial" 
                    :key = "'init'+i"
                    @change="clickTag"
                    border
                    >{{t.name}}</el-radio>
                </div>
            </div>
        </div>
        <list-card
        :listCardData="singerList"
        @clickListCardItem="clickListCardItem"
        ></list-card>
    </div>
</template>

<script>
import ListCard from '../../../components/ListCard.vue'
export default {
    name: 'DiscSinger',
    components: {ListCard},
    data() {
        return {
            langSort: [
                { area: -1, name: "全部" },
                { area: 7, name: "华语" },
                { area: 96, name: "欧美" },
                { area: 8, name: "日本" },
                { area: 16, name: "韩国" },
                { area: 0, name: "其它" },
            ],
            typeSort: [
                { type: -1, name: "全部" },
                { type: 1, name: "男歌手" },
                { type: 2, name: "女歌手" },
                { type: 3, name: "乐队" },
            ],
            initSort: [
                { initial: -1, name: "热门" },
                { initial: "a", name: "A" },
                { initial: "b", name: "B" },
                { initial: "c", name: "C" },
                { initial: "d", name: "D" },
                { initial: "e", name: "E" },
                { initial: "f", name: "F" },
                { initial: "g", name: "G" },
                { initial: "h", name: "H" },
                { initial: "i", name: "I" },
                { initial: "j", name: "J" },
                { initial: "k", name: "K" },
                { initial: "l", name: "L" },
                { initial: "m", name: "M" },
                { initial: "n", name: "N" },
                { initial: "o", name: "O" },
                { initial: "p", name: "P" },
                { initial: "q", name: "Q" },
                { initial: "r", name: "R" },
                { initial: "s", name: "S" },
                { initial: "t", name: "T" },
                { initial: "u", name: "U" },
                { initial: "v", name: "V" },
                { initial: "w", name: "W" },
                { initial: "x", name: "X" },
                { initial: "y", name: "Y" },
                { initial: "z", name: "Z" },
                { initial: 0, name: "#" },
            ],
            lang: -1,
            type: -1,
            init: -1,
            singerList: [],
        }
    },
    methods: {
        async getSingerList() {
            let res = await this.$request("/artist/list", {
                type: this.type,
                area: this.lang,
                initial: this.init,
                offset: 30,
            });
            console.log(res);
            this.singerList = res.data.artists;
        },
        clickTag() {
            // console.log(this.lang,this.type,this.init)
            this.getSingerList()
        },
        clickListCardItem(id) {
            this.$router.push({name:'singer',params: {id}})
        }
    },
    created() {
        this.getSingerList()
    },
}
</script>

<style scoped>
.DiscSinger {
    margin: 0 15vw;
}
.sort {
    margin: 10px 0;
    display: flex;
}
.sort .title {
    width: 60px;
    font-size: 16px;
    line-height: 32px;
}
.sort .tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.el-radio {
    height: 32px;
    border-radius: 15px;
    padding: 0 !important;
    margin: 2px 5px !important;
}
</style>