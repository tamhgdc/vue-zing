<template>
    <div :class="['musicDetail', isShowMusicDetail? '' : 'hide' ]">
        <div class="close" @click="$store.commit('changeMusicDetailCardState')">
            <i class="el-icon-arrow-down"></i>
        </div>
        <div class="main" v-if="$store.state.playId">
            <div class="left">
                <div class="cover">
                    <img :src="musicInfo.al.picUrl" alt=""/>
                </div>
            </div>
            <div class="right">
                <div class="title">
                    <div class="name">{{musicInfo.name}}</div>
                    <div class="albumsinger">{{musicInfo.al.name}}-{{showAllSinger(musicInfo.ar)}}</div>
                </div>
                <lyrics-scroll :lyric="lyric"></lyrics-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import LyricsScroll from "../../components/LyricsScroll"

export default {
    name: "MusicDetail",
    components : {LyricsScroll},
    data() {
        return {
            isShowMusicDetail : false,
            musicInfo : {},
            lyric : [],
        }
    },
    methods: {
        async getLyric(id) {
            let res = await this.$request("/lyric",{id})
            res = res.data.lrc.lyric
            let arr = res.split("\n")
            let ret = []
            arr.forEach((item)=>{
                let time = item.split("]")[0].slice(1).split(":")
                let str = item.split("]")[1]
                ret.push([parseInt(time[0])*60+parseFloat(time[1]), str])
            })
            this.lyric = ret
        },
        showAllSinger(ar) {
            let res = []
            ar.forEach(element => {
                res.push(element.name)
            })
            return res.join('/')
        },
    },
    watch : {
        "$store.state.isShowMusicDetail"(isShowMusicDetail) {
            this.isShowMusicDetail = isShowMusicDetail
            this.lyric = [[0,'加载中']]
            if (isShowMusicDetail) {
                this.getLyric(this.$store.state.playId)
            }
        },
        "$store.state.playId"() {
            this.musicInfo = this.$store.state.playList[this.$store.state.playIndex]
            this.lyric = [[0,'加载中']]
            if (this.isShowMusicDetail) {
                this.getLyric(this.$store.state.playId)
            }
        }
    }
}
</script>

<style scoped>
    .musicDetail {
        position: fixed;
        width: 100%;
        height: calc(100vh - 90px);
        bottom: 90px;
        left: 0;
        z-index: 1000;
        transition: bottom 0.5s ease;
        background-color: #fff;
        background-image: linear-gradient(to bottom, #eee, #fff);
    }
    .hide {
        bottom: calc(-100vh + 90px)
    }
    .main {
        display: flex;
        align-items: center;
        height: 100%;
        margin:0 20vw;
        justify-content: space-between;
    }
    .left {
        width: 20vw;
        height: 20vw;
        
    }
    .cover {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        overflow: hidden;
        background-color: #eee;
        box-shadow: 5px 5px 10px #bbb;
    }
    .cover img {
        width: 100%;
        height: 100%;
    }
    .right {
        width: 30vw;
        height: 60vh;
    }
    .title {
        width: 100%;
        text-align: center;
        font-size: 18px;
        margin: 15px 0;
        color: #333;
    }
    .name {
        font-size: 30px;
        color: #222;
        margin: 10px;
    }
    .albumsinger {
        margin: 10px;
    }
    .close {
        font-size: 30px;
        color: #555;
        position: absolute;
        left: 15px;
        top: 15px;
        cursor: pointer;
    }
</style>