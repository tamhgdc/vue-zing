<template>
<div class="bottomControl">
    <audio 
    :src="musicUrl"
    autoplay
    @play="updatePlayState(true)"
    @pause="updatePlayState(false)"
    @ended="playEnded"
    @timeupdate="timeupdate"
    ref="audioPlayer"
    >
    </audio>
    <div class="left">
        <div class="avatar" @click="showMusicDetail">
            <img v-if="playReady" :src="musicDetail.al.picUrl" alt="">
            <img v-else src="../assets/img/imgLoading.png" alt="">
        </div>
        <div class="musicinfo" v-if="playReady">
            <div class="musicname" @click="showMusicDetail">
                {{musicDetail.name}}
            </div>
            <div class="singer">
                <span v-for="(item,index) in musicDetail.ar" :key="index" @click="clickListCardItem(item.id)">
                    {{item.name}}
                </span>
            </div>
        </div>
    </div>
    <div class="center">
        <div class="buttons">
            <span @click="changePlayType">
                <i :class="playTypeClass[$store.state.playType]"></i>
            </span>
            <span @click="playPrev">
                <i class="iconfont icon-24gf-previous"></i>
            </span>
            <span @click="changePlayState">
                <i :class="$store.state.isPlay ? 'iconfont icon-24gf-pause2' : 'iconfont icon-24gf-play'"></i>
            </span>
            <span @click="playNext">
                <i class="iconfont icon-24gf-next"></i>
            </span>
            <span>
                <i class="iconfont icon-zhuifanshu"></i>
            </span>
        </div>
        <div class="progressBar">
            <span class="currentTime" v-if="$store.state.playIndex!==-1">{{currTime}}</span>
            <el-slider
                class="progressSlider"
                v-model="timeProress"
                :show-tooltip="false"
                @change="changeProgress"
                :disabled="!playReady"
            >
            </el-slider>
            <span class="totalTime" v-if="$store.state.playIndex!==-1">{{duraTime}}</span>
        </div>
    </div>
    <div class="right">
        <div class="volumeControl">
            <span class="volumeButton" @click="changeMutedState">
                <i :class="isMuted? 'iconfont icon-shengyinjingyin' : 'iconfont icon-shengyinkai'"></i>
            </span>
            <el-slider
                class="volumeSlider"
                v-model="volume"
                @input="changeVolume"
                :show-tooltip="false"
            ></el-slider>
        </div>
        <div class="showplaylist" @click="showPlayList">
            <i class="iconfont icon-24gf-playlist"></i>
        </div>
    </div>
    <el-drawer
        :visible.sync="isShowList"
        direction="rtl"
        :with-header="false"
        :modal = "false"
        size="25%"
    >
        <div class="playListTitle">当前播放</div>
        <div class="playListHeader">
            <div class="total">共{{$store.state.playList.length}}首</div>
            <div class="clear" @click="clearPlayList">清空列表</div>
        </div>
        <el-table
            :data="$store.state.playList"
            stripe
            :show-header="false"
            @row-dblclick="clickRow"
            @cell-click="clickCell"
            :row-class-name="highlightPlaying"
            lazy
        >
            <el-table-column prop="name" min-width="150px">
            </el-table-column>
            <el-table-column prop="ar" :formatter="showAllSinger" min-width="100px">
            </el-table-column>
            <el-table-column prop="dt" :formatter="showTime" min-width="50px">
            </el-table-column>
            <el-table-column label="" min-width="25px"><i class="el-icon-close"></i> </el-table-column>
        </el-table>
    </el-drawer>
</div>
</template>

<script>
import {secondToTime} from '../utils/index'

export default {
    name: 'BottomControl',
    data() {
        return {
            // musicDetail: {}, //音乐详细信息（转由计算属性从VUEX中获取）
            musicUrl: '', //音乐地址
            timeProress: 0, //播放进度条
            volume: 50, //音量
            prevVolume : 50, //静音前音量
            isMuted: false, //静音
            lastSecond: 0, //用于判断是否需要更新进度条
            isShowList: false,
            playTypeClass : [
                'iconfont icon-xunhuanbofang',
                'iconfont icon-suijibofang',
                'iconfont icon-danquxunhuan',
            ], // 显示对应图标
        }
    },
    methods : {
        //获取音乐Url
        async getMusicDetail(id) {
            this.$store.commit("updateMusicLoadState", true) //加载中
            let url = await this.$request("/song/url",{id})
            if (url.data.data[0].url === null) {
                this.$message.error("该歌曲无法播放，将为您自动播放下一首")
                this.playNext()
                return
            }
            // let res = await this.$request("/song/detail",{ids:id})
            this.musicUrl = url.data.data[0].url
            // this.musicDetail = res.data.songs[0]
            // console.log("@@", this.musicUrl)
            // console.log("$$", this.musicDetail)
            this.$store.commit("updateMusicLoadState", false)
        },
        playMusic() {
            this.$refs.audioPlayer.play()
        },
        pauseMusic() {
            this.$refs.audioPlayer.pause()
        },
        playNext() {
            if (this.playReady) {
                //单曲循环
                if (this.$store.state.playType===2 || this.$store.state.playList.length===1) {
                    this.$refs.audioPlayer.currentTime = 0
                    this.timeupdate()
                    this.playMusic()
                } else 
                    this.$store.dispatch('execHandler',["playNext"])
            }
        },
        playPrev() {
            if (this.playReady) {
                this.$store.dispatch('execHandler',["playPrev"])

                //单曲循环
                if (this.$store.state.playType===2) {
                    this.$refs.audioPlayer.currentTime = 0
                    this.timeupdate()
                    this.playMusic()
                }
            }
        },
        //播放结束
        playEnded() {
            this.playNext()
        },
        //播放时间位置更新
        timeupdate() {
            let time = this.$refs.audioPlayer.currentTime
            this.$store.commit("updateCurrentTime", time)
            time = Math.floor(time)
            if (time!==this.lastSecond) {
                this.lastSecond = time
                let dt = this.musicDetail.dt
                if (dt>10000) dt = Math.floor(dt / 1000)
                this.timeProress = Math.floor(time/dt *100)
            }
        },
        //通过滑条改变播放进度
        changeProgress() {
            // console.log('进度改变:',this.timeProress)
            let dt = this.musicDetail.dt
            if (dt>10000) dt = Math.floor(dt / 1000)
            let time = Math.floor((this.timeProress/100)*dt)
            this.$store.commit("updateCurrentTime", time)
            this.$refs.audioPlayer.currentTime = time
        },
        //切换播放状态
        changePlayState() {
            if (this.playReady) {
                if (this.$store.state.isPlay) this.pauseMusic() 
                    else this.playMusic()
            }
        },
        updatePlayState(state) {
            this.$store.dispatch('execHandler',["updatePlayState", state])
        },
        //切换播放模式
        changePlayType() {
            this.$store.dispatch('execHandler',["updatePlayType"])
        },
        //更改音量
        changeVolume() {
            // console.log('音量改变')
            this.$refs.audioPlayer.volume = this.volume / 100
            if (this.isMuted && this.volume > 0) {
                this.isMuted = false
            } else if (!this.isMuted && this.volume===0) {
                this.isMuted = true
            }
        },
        //设置静音
        changeMutedState() {
            if (this.isMuted) {
                this.volume = this.prevVolume
            } else {
                this.prevVolume = this.volume
                this.volume = 0
            }
            this.isMuted = !this.isMuted
        },
        //切换显示播放列表
        showPlayList() {
            this.isShowList = !this.isShowList
        },
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
        showTime(row,column) {
            let sec = row[column.property]
            if (sec == undefined) {
                return ""
            }
            return secondToTime(sec)
        },
        //清除播放列表
        clearPlayList() {
            this.$store.dispatch('execHandler',['removePlayListAll'])
        },
        //点击播放列表中的一项
        clickRow(row) {
            this.$store.dispatch('execHandler',['addPlayListItem',row])
        },
        clickCell(row, column, cell) {
            console.log(row, column,cell)
            if (cell.querySelector(".el-icon-close")) {
                //点击删除按钮
                this.$store.dispatch('execHandler',['removePlayListItem',row.id])
            }
        },
        highlightPlaying(row) {
            // console.log('hl:',row)
            if (row.rowIndex===this.$store.state.playIndex) return "playing"
                return ''
        },
        showMusicDetail() {
            this.$store.commit('changeMusicDetailCardState')
        },
        //点击歌手
        clickListCardItem(id) {
            this.$router.push({name:'singer',params: {id}})
        },
    },
    computed : {
        duraTime() {
            return secondToTime(this.musicDetail.dt)
        },
        currTime() {
            return secondToTime(this.$store.state.currentTime)
        },
        musicDetail() {
            if (this.$store.state.playList.length>0){
                return this.$store.state.playList[this.$store.state.playIndex]
            }
            return {}
        },
        playReady() {
            return ((this.$store.state.playIndex!==-1)&&(!this.$store.state.isLoad))
        }
    },
    watch : {
        //playId更新时更新音乐url
        "$store.state.playId"(playId) {
            this.pauseMusic()
            if  (playId !== '') {
                this.getMusicDetail(playId)
                // this.playMusic()
            }
            else {
                this.timeProress = 0
            }
        },
        "$store.state.replay" () {
            this.pauseMusic()
            this.$refs.audioPlayer.currentTime = 0
            this.timeupdate()
            this.playMusic()
        }
    },
    created() {
        
    }
}
</script>

<style scoped>
.bottomControl {
    height: 100%;
    border-top: 1px solid #ddd;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10000;
    box-sizing:border-box;
    padding: 10px 30px 10px 30px;
}
.left {
    display: flex;
    align-items: center;
    width: 300px;
}
.left .avatar {
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 15px;
    cursor: pointer;
    
}
.left .avatar img {
    width: 100%;
}
.left .musicinfo {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    width: 200px;
}
.left .musicinfo .musicname {
    font-size: 20px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.left .musicinfo .singer {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.left .musicinfo .singer span {
    font-size: 16px;
    color: #373737;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 2px;
    cursor: pointer;
}

.center {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* background-color: orange; */
}
.center .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 60%;
    /* background-color: blue; */
}
.center span {
    cursor: pointer;
}
.center span i {
    font-size: 25px;
    color: #373737;
}
.center span:nth-child(3) i {
    font-size: 30px;
}
.center span:nth-child(1) i {
    font-size: 20px;
}
.center span:nth-child(5) i {
    font-size: 20px;
}
.center .progressBar {
    display: flex;
    align-items: center;
}
.center .progressSlider {
    width: 350px;
    margin: 0 15px;
}
.center span {
    font-size: 14px;
    color: #373737;
}

.right {
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* background-color: orange; */
}
.right .volumeControl {
    display: flex;
    align-items: center;
    margin-right: 30px;
}
.right .volumeButton {
    cursor: pointer;
    margin-right: 15px;
}
.right .volumeControl .volumeButton i {
    font-size: 20px;
}
.right .volumeControl .volumeSlider {
    width: 80px;
}
.right .showplaylist {
    cursor: pointer;
}
.right .showplaylist i{
    font-size: 20px;
}
.el-table {
    font-size: 14px;
}

.playListTitle {
    font-size: 20px;
    font-weight: 700;
    margin: 20px 20px 10px 20px;
}
.playListHeader {
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;
}
.playListHeader .total {
    font-size: 14px;
    color: #aaa;
}
.playListHeader .clear {
    font-size: 16px;
    color: #82a57e;
    cursor: pointer;
}
</style>