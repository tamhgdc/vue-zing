<template>
    <div class="listCard">
        <div class="listCardItem"
        v-for="(item,index) in listCardData"
        :key="index"
        @click="clickListCardItem(item.id)"
        >
            <div class="image">
                <img :src="(item.picUrl || item.coverImgUrl) + '?param=400y400'" alt="">
            </div>
            <div class="title">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListCard',
    props: {
        listCardData: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
        clickListCardItem(id) {
            this.$emit("clickListCardItem",id)
        }
    },
    //listCardData为包含id,picUrl或coverImgUrl,name数组
}
</script>

<style scoped>
.listCard {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:20px 0;
}
.listCardItem {
    width: 17.6%;
    margin: 0 0 25px 0;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image {
    width: 12vw;
    height: 12vw;
    background-color: #eee;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}

.image img {
    width: 100%;
}

.title {
  width: 12vw;
  margin-top: 8px;
  padding: 0 2px;
  font-size: 16px;
  color: black;
  line-height: 20px;
  /* 显示两行 */
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>