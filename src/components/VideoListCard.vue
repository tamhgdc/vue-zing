<template>
    <div class="VideoListCard">
        <div 
        class="cardItem"
        v-for="item in videoList"
        :key="item.id"
        >
            <div class="videoCover">
                <img :src="(item.coverUrl || item.imgurl) + '?param=1260y800'" alt="">
                <div class="playCount">
                    <i class="el-icon-view"></i>
                    {{showCount(item.playTime || item.playCount)}}
                </div>
                <div class="videoTime">
                    {{showTime(item.durationms || item.duration)}}
                </div>
            </div>
            <div class="videoTitle">{{item.title || item.name}}</div>
        </div>
    </div>
</template>

<script>
import {secondToTime, zipNumber} from '../utils/index'
export default {
    name: "VideoListCard",
    props: ['videoList'],
    methods: {
        showTime(time) {
            return secondToTime(time)
        },
        showCount(count) {
            return zipNumber(count)
        }
    }
}
</script>

<style scoped>
.VideoListCard {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin:20px 0;
}
.cardItem {
    width: 13vw;
    margin: 0 0 25px 0;
    overflow: hidden;
    cursor: pointer;
}
.cardItem:nth-child(5n) {
    margin-right: 0;
}

.videoCover {
    height: 7.3vw;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}

.playCount {
  font-size: 16px;
  color: white;
  position: absolute;
  top: 5px;
  right: 5px;
} 

.videoTime {
  font-size: 16px;
  color: white;
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 2px;
  background-color: rgba(0,0,0,0.5);
}

.videoCover img {
    width: 100%;
}

.videoTitle {
  margin-top: 8px;
  padding: 0 2px;
  font-size: 16px;
  color: black;
  line-height: 20px;
  /* 两行溢出 */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>