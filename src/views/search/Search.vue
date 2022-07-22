<template>
    <div class="search">
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
    name: 'Search',
    data() {
      return {
        activeIndex: this.$route.path.split('/')[2],
        navList: [
            {
                index: 'searchsong',
                path: `/search/searchsong/${this.$route.params.id}`,
                label: '单曲'
            },
            {
                index: 'searchsinger',
                path: `/search/searchsinger/${this.$route.params.id}`,
                label: '歌手'
            },
            {
                index: 'searchalbum',
                path: `/search/searchalbum/${this.$route.params.id}`,
                label: '专辑'
            },
            {
                index: 'searchvideo',
                path: `/search/searchvideo/${this.$route.params.id}`,
                label: '视频'
            },
            {
                index: 'searchmusiclist',
                path: `/search/searchmusiclist/${this.$route.params.id}`,
                label: '歌单'
            },

        ]
      };
    },
    methods: {
    
    }
}
</script>

<style>

</style>