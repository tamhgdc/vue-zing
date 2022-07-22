<template>
    <div class="discrecommend">
        <!-- 轮播图 -->
        <div class="banner">
            <el-carousel :interval="5000" type="card" height="250px">
                <el-carousel-item v-for="item in bannerList" :key="item.targetId">
                    <div class="imgbox" @click="clickNewSong(item.targetId)">
                        <img :src="item.imageUrl" alt="">
                        <span class="tag">{{item.typeTitle}}</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend">
          <span class="title" @click="clickTitle">推荐歌单<i class="el-icon-arrow-right"></i></span>
          <music-list-card
            :listCardData="musicList"
            @clickListCardItem="clickListCardItem"
            @clickListCardBtn="clickListCardBtn"
          ></music-list-card>
        </div>
    </div>
</template>

<script>
import MusicListCard from '../../../components/MusicListCard.vue'
export default {
    name: 'DiscRecommend',
    data() {
      return {
        bannerList: [],
        musicList: [],
      }
    },
    components : {MusicListCard},
    methods: {
      async getBannerList() {
        let res = await this.$request('/banner')
        this.bannerList = res.data.banners
        // console.log(this.bannerList)
      },
      async getMusicList() {
        let res = await this.$request("/personalized", { limit: 10 })
        this.musicList = res.data.result
      },
      clickListCardItem(id) {
        this.$router.push({name:'musiclist',params:{id}})
      },
      clickTitle() {
        this.$router.push({name:'discmusiclist'})
      },
      async clickNewSong(id) {
        // console.log(id)
        let res = await this.$request("/song/detail",{ids:id})
        // console.log(res)
        if (res.data.songs.length>0) 
          this.$store.dispatch('execHandler',['addPlayListItem',res.data.songs[0]])
        else 
          this.$message.warning('需要登录或VIP')
      },
      async clickListCardBtn(id) {
        // console.log(id)
        let res = await this.$request("/playlist/detail", {id});
        // console.log(res.data.playlist.tracks)
        this.$store.dispatch('execHandler',['updatePlayList',res.data.playlist.tracks])
      }
    },
    created() {
      this.getBannerList()
      this.getMusicList()
    }

}
</script>

<style scoped>
  .discrecommend {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15vw;
  }
  .banner {
    width: 100%;
    margin: 20px 0;
  }
  .banner .imgbox {
    height: 250px;
    overflow: hidden;
    position: relative;
    /* border-radius: 15px; */
  }
  .banner img {
    height: 100%;
  }
  .banner .tag {
    padding: 2px 10px;
    border-radius: 10px 0 0 0;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    height: 24px;
    background-color: #538B9C;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .recommend {
    margin: 20px 0;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
  .el-carousel__item {
    border-radius: 10px
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>