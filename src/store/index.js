import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    playId : '',    // 当前播放音乐的ID
    playIndex: -1,  // 当前播放音乐在playList的位置
    playList: [],   // 当前播放音乐列表
    musicId: '',    // 音乐URL
    isPlay: false,  // 是否正在播放
    isLoad: false,  // 音乐正在加载
    playType: 0,    // 播放模式 0-顺序 1-随机 2-单曲循环
    currentTime : 0, //已播放时间
    replay: true, //在buttomControl中设置watch实现重播
    isShowMusicDetail : false
}
const actions = {
    execHandler(context, [handler, ...value]) {
        if (value.length>0) context.commit(handler,...value)
            else context.commit(handler)
    }
}

const mutations = {
    updatePlayState(state, value) {
        state.isPlay = value
    },
    updatePlayType(state) {
        state.playType = (state.playType + 1) % 3
    },
    updateMusicLoadState(state, isLoad) {
        state.isLoad = isLoad
    },
    updateCurrentTime(state, time) {
        state.currentTime = time
    },
    updatePlayIndex(state, i) {
        state.playIndex = i
        state.playId = state.playList[i].id
    },
    addPlayListItem(state, item) {
        for (let i=0; i<state.playList.length; i++) {
            if (item.id === state.playList[i].id) {
                if (state.playIndex===i) {
                    //同ID处理
                    state.replay = !state.replay
                    return
                } else {
                    state.playIndex = i
                    state.playId = state.playList[i].id
                    return
                }
            }
        }
        state.playList.push(item)
        state.playIndex = state.playList.length - 1
        state.playId = state.playList[state.playIndex].id
    },
    removePlayListItem(state, rmId) {
        //寻找rmId位置
        let rmIndex = -1
        for (let i=0; i<state.playList.length; i++) {
            if (rmId === state.playList[i].id) {
                rmIndex = i
                break
            }
        }
        state.playList.splice(rmIndex,1)
        if (state.playList.length===0) {
            state.playIndex = -1
            state.playId = ''
            return
        }
        //处理playIndex的变化
        if (rmIndex < state.playIndex) state.playIndex-=1 //删除歌曲在当前播放之前
        if (rmIndex === state.playIndex) {
            if (state.playIndex >= state.playList.length) state.playIndex = 0
        }
        state.playId = state.playList[state.playIndex].id
        // console.log(rmIndex,state.playIndex)
        // rmIndex > state.playIndex 无变化
    },
    //清空整个播放列表
    removePlayListAll(state) {
        state.playList = []
        state.playIndex = -1
        state.playId = ''
    },
    //替换整个播放列表
    updatePlayList(state, newList) {
        state.playList = newList.slice() //拷贝一个新数组 不然会影响原数组
        state.playIndex = 0
        state.playId = state.playList[0].id
        state.replay = !state.replay
    },
    playNext(state) {
        const n = state.playList.length
        if (state.playType===0) {
            state.playIndex = (state.playIndex + 1) % n
        } else if (state.playType===1) {
            state.playIndex = (state.playIndex + Math.floor(Math.random()*(n-1)) + 1) % n
        }
        state.playId = state.playList[state.playIndex].id
    },
    playPrev(state) {
        const n = state.playList.length
        if (state.playType===0) {
            if (state.playIndex===0) state.playIndex = n - 1
                else state.playIndex -= 1
        } else if (state.playType===1) {
            state.playIndex = (state.playIndex + Math.floor(Math.random()*(n-1)) + 1) % n
        }
        state.playId = state.playList[state.playIndex].id
    },
    changeMusicDetailCardState(state) {
        state.isShowMusicDetail = !state.isShowMusicDetail
    },
}

const store = new Vuex.Store({
    state,
    actions,
    mutations,
})

export default store