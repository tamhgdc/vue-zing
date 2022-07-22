<template>
    <div class="lyrics">
        <div class="placeholder"></div>
        <div 
        class="lyricsItem"
        :class = "lyricsIndex==index? 'current' : ''"
        v-for="(item, index) in lyric"
        :key="index"
        >
        {{item[1]}}
        </div>
        <div class="placeholder"></div>
    </div>
    
</template>

<script>
let prev = 0
let timer = null //计时器
let hold = false //滚动3秒内保持
let prevT = 0 //节流函数

export default {
    name: "LyricsScroll",
    props: {
        lyric: {
            type: Array,
            default: ()=>[]
        }
    },
    data() {
        return {
            lyricsIndex: 0
        }
    },
    methods: {
        lyricScroll(curr) {
            //歌词
            let lyricsArr = document.querySelectorAll('.lyricsItem')
            //歌词框
            let lyrics = document.querySelector(".lyrics")
            // 需要滚动的距离为当前歌词的offsetTop-第一句歌词的offset-Top
            if (lyricsArr[curr]) {
                lyrics.scrollTo({
                    behavior: "smooth",
                    top: lyricsArr[curr].offsetTop - lyricsArr[0].offsetTop
                })
            }
        },
        getLyricsIndex(currentTime) {
            let ct = 0
            for (let i=0; i<this.lyric.length; i++) {
                if (this.lyric[i][0]>currentTime) break
                ct++
            }
            this.lyricsIndex = ct - 1
        },
        handleScroll(e) {
            let currT = Date.now()
            if (currT-prevT<500) return //节流
            prevT = currT
            // console.log("scorll",e.target,e.src)
            if (!(e.target.className == "lyricsItem" || 
                e.target.className == "lyrics" ||
                e.target.className == "placeholder"
                )) return
            hold = true
            //防抖
            if (timer!==null) {
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                    hold = false
                    timer = null
                }, 3000)
        }
    },
    watch: {
        "$store.state.currentTime"(curr) {
            // 播放进度变化超过0.5秒进行处理
            if (Math.abs(curr-prev)>=0.5) {
                if (this.lyric.length>1) {
                    prev = curr
                    this.getLyricsIndex(curr)
                    if (!hold) {
                        this.lyricScroll(this.lyricsIndex)
                    } 
                } 
            }
        },
        "$store.state.musicId"() {
            this.lyricsIndex = 0;
        },
    },
    mounted() {
        this.getLyricsIndex(this.$store.state.currentTime)
        this.lyricScroll(this.lyricsIndex)

        document.onmousewheel=this.handleScroll
    }
}
</script>

<style scoped>
    .lyrics {
        width: 100%;
        height: 80%;
        font-size: 16px;
        text-align: center;
        overflow-y: scroll;
    }
    .lyrics::-webkit-scrollbar {
        display: none;
    }
    .lyricsItem {
        line-height: 20px;
        margin: 20px 5px;
        color: #888;
    }
    .current {
        font-size: 20px;
        color: #333;
    }
    .placeholder {
        width: 100%;
        height: 40%;
    }
</style>