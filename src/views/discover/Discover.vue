<template>
    <div class="discover">
        <el-menu 
        :default-active="activeIndex"
        class="el-menu-demo" 
        mode="horizontal"
        router>
            <el-menu-item 
            v-for="item in navList" 
            :index="item.index" 
            :route="item.path" 
            :key="item.index"
            >
                {{item.label}}
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Discover',
    data() {
        return {
            activeIndex: this.$route.path.split('/')[2],
            navList: [
                {
                    index: 'discrecommend',
                    path: '/discover/discrecommend',
                    label: '个性推荐'
                },
                {
                    index: 'discmusiclist',
                    path: '/discover/discmusiclist',
                    label: '歌单'
                },
                {
                    index: 'discranking',
                    path: '/discover/discranking',
                    label: '排行榜'
                },
                {
                    index: 'discsinger',
                    path: '/discover/discsinger',
                    label: '歌手'
                },
            ]
        }
    }
}
</script>

<style scoped>
    .el-menu {
        border: none !important;
        margin: 0 20px !important;
    }
</style>