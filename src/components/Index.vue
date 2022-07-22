<template>
    <el-container>
        <el-header>
          <header-bar/>
        </el-header>
        <el-main>
            <!-- <div class="routerView"></div> -->
            <router-view class="routerView" :key="$route.fullPath"></router-view>
        </el-main> 
        <el-footer>
          <bottom-control/>
        </el-footer>
        <music-detail></music-detail>
    </el-container>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import BottomControl from './BottomControl.vue'
import MusicDetail from '../views/detail/MusicDetail.vue'
export default {
    components:{HeaderBar, BottomControl, MusicDetail},
    created() {
        //console.log(this.$route)
    }
}
</script>

<style scoped>
.routerView {
  padding: 0;
  margin: 0;
  width: 100%;
  height: calc(100vh - 150px);
}

.el-header {
  background-color: rgb(170, 217, 165);
  height: 60px !important;
  padding: 0;
  margin: 0;
  z-index: 100;
}

.el-main {
  padding: 0;
  height: calc(100vh - 150px);
}

.el-footer {
  height: 90px !important;
  padding: 0;
  margin: 0;
  z-index: 10000;
}
</style>