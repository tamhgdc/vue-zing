# Vanilla Music Player

## 在线DEMO
[DEMO](http://101.33.214.39/)

## 项目介绍
项目为仿写网易云音乐PC客户端，仅用于前端学习，基本实现音乐播放、搜索、发现等功能

Vue2+Vuex+Vue Router+Element UI+axios

后端API来自NeteaseCloudMusicApi

[API仓库地址](https://github.com/Binaryify/NeteaseCloudMusicApi) [API文档](https://neteasecloudmusicapi.vercel.app/#/)

### 项目运行
1. 部署本地后端服务器
```shell
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git 
npm install
```
2. 运行本项目
```shell
npm install
npm run serve
```

### 项目效果展示
#### 播放控制
- 可选择顺序、随机、单曲循环播放模式
- 可增删播放歌曲、清空播放列表
![播放控制](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%92%AD%E6%94%BE%E6%8E%A7%E5%88%B6.png)

#### 播放详情页
- 显示专辑封面、标题、歌手
- 歌词自动滚动
- 用户滚动查看歌词自动保持3秒
![播放详情页](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%92%AD%E6%94%BE%E8%AF%A6%E6%83%85%E9%A1%B5.png)

#### 首页个性推荐
![首页个性推荐](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E4%B8%AA%E6%80%A7%E6%8E%A8%E8%8D%90.png)

#### 歌单推荐页
![歌单推荐页](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%AD%8C%E5%8D%95%E6%8E%A8%E8%8D%90.png)

#### 排行榜
![排行榜](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%8E%92%E8%A1%8C%E6%A6%9C.png)

#### 歌手
![歌手](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%AD%8C%E6%89%8B.png)

#### 歌曲搜索
![歌曲搜索](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%90%9C%E7%B4%A2%E6%AD%8C%E6%9B%B2.png)

#### 歌单搜索
![歌单搜索](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%AD%8C%E5%8D%95%E6%90%9C%E7%B4%A2.png)

#### 视频搜索
![视频搜索](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E8%A7%86%E9%A2%91%E6%90%9C%E7%B4%A2.png)

#### 歌手详情页
![歌手详情页](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%AD%8C%E6%89%8B%E8%AF%A6%E6%83%85%E9%A1%B5.png)

#### 歌单详情页
![歌单详情页](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E6%AD%8C%E5%8D%95%E8%AF%A6%E6%83%85%E9%A1%B5.png)

#### 专辑详情页
![专辑详情页](https://raw.githubusercontent.com/linyibin97/vue-music-player/master/img/%E4%B8%93%E8%BE%91%E8%AF%A6%E6%83%85%E9%A1%B5.png)
