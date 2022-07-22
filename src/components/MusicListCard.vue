<template>
    <div class="MusiclistCard">
        <div class="MusiclistCardItem"
        v-for="(item,index) in listCardData"
        :key="index"
        @click="clickListCardItem(item.id)"
        >
            <div class="cover">
                <img :src="(item.picUrl || item.coverImgUrl) + '?param=400y400'" alt="">
                <span class="tag"><i class="el-icon-video-play"></i> {{showCount(item.playCount)}}</span>
                <div class="clickbtn" @click.stop="clickListCardBtn(item.id)">
                    <i class="el-icon-caret-right"></i>
                </div>
            </div>
            <div class="title">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
import {zipNumber} from '../utils/index'
export default {
    name: 'MusicListCard',
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
        },
        clickListCardBtn(id) {
            this.$emit("clickListCardBtn",id)
        },
        showCount(num) {
            return zipNumber(num)
        }
    },
    //listCardData为包含id,picUrl或coverImgUrl,name数组
}
</script>

<style scoped>
.MusiclistCard {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:20px 0;
}
.MusiclistCardItem {
    width: 17.6%;
    margin: 0 0 25px 0;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cover {
    width: 12vw;
    height: 12vw;
    background-color: #eee;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}

.cover img {
    width: 100%;
}
.cover .tag {
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 2px;
    right: 10px;
}
.cover .clickbtn {
    font-size: 25px;
    line-height: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #fff;
    color: #70B879;
    position: absolute;
    bottom: 10px;
    right: 10px;
    opacity: 0.8;
    visibility:hidden;
}
.cover:hover .clickbtn {
    visibility: visible;
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