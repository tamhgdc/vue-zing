import Vue from 'vue';
import VueRouter from 'vue-router'

const Index = () => import('../components/Index.vue')
const Discover = () => import('../views/discover/Discover.vue')
const DiscMusicList = () => import('../views/discover/discoverChildren/DiscMusicList.vue')
const DiscRanking = () => import('../views/discover/discoverChildren/DiscRanking.vue')
const DiscRecommend = () => import('../views/discover/discoverChildren/DiscRecommend.vue')
const DiscSinger = () => import('../views/discover/discoverChildren/DiscSinger.vue')
const Search = () => import('../views/search/Search.vue')
const SearchSong = () => import('../views/search/searchChildren/SearchSong.vue')
const SearchSinger = () => import('../views/search/searchChildren/SearchSinger.vue')
const SearchAlbum = () => import('../views/search/searchChildren/SearchAlbum.vue')
const SearchVideo = () => import('../views/search/searchChildren/SearchVideo.vue')
const SearchMusicList = () => import('../views/search/searchChildren/SearchMusicList.vue')
const AlbumDetail = ()=> import('../views/detail/AlbumDetail.vue')
const MusicListDetail = ()=> import('../views/detail/MusicListDetail.vue')
const SingerDetail = ()=> import('../views/detail/SingerDetail.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        redirect: '/index' 
    },
    {
        path: '/index',
        component: Index,
        redirect: '/discover',
        children: [
            {
                path: '/discover',
                component: Discover,
                redirect: '/discover/discrecommend',
                children: [
                    {path: '/discover/discrecommend', name: 'discrecommend', component: DiscRecommend},
                    {path: '/discover/discmusiclist', name: 'discmusiclist', component: DiscMusicList},
                    {path: '/discover/discranking', name: 'discranking', component: DiscRanking},
                    {path: '/discover/discsinger', name: 'discsinger', component: DiscSinger},
                ]
            },
            {
                path: '/search/:id', name: 'search', component: Search,
                redirect: '/search/searchsong/:id',
                children: [
                    { path: '/search/searchsong/:id', name: 'searchSong', component: SearchSong },
                    { path: '/search/searchsinger/:id', name: 'searchSinger', component: SearchSinger },
                    { path: '/search/searchalbum/:id', name: 'searchAlbum', component: SearchAlbum },
                    { path: '/search/searchvideo/:id', name: 'searchVideo', component: SearchVideo },
                    { path: '/search/searchmusiclist/:id', name: 'searchMusicList', component: SearchMusicList },
                ]
            },
            {path: '/album/:id', name: 'album', component:AlbumDetail},
            {path: '/musiclist/:id', name: 'musiclist', component:MusicListDetail},
            {path: '/singer/:id', name: 'singer', component:SingerDetail},
        ]
    }
]

const router = new VueRouter({
    routes,
    // mode: 'history',
    mode:'hash',
})

export default router