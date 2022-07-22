<template>
<div>
<div class="PreviewCard">
    <div class="listCover">
        <img
          :src="imgUrl"
          alt=""
          @click="clickCheckAll(listId)"
        />
    </div>
    <div class="listContainer">
        <div class="title" v-if="title!==''">{{title}}</div>
        <table>
            <tr
            class="listRows"
            v-for="(item, index) in songs"
            :key="index"
            @dblclick="clickSong(item)"
          >
            <td class="index">{{ index + 1 }}</td>
            <td class="musicName">{{ item.name }}</td>
            <td class="singer">{{ showAllSinger(item.ar) }}</td>
          </tr>
        </table>
        <div class="checkAll" v-if="showAllBtn" @click="clickCheckAll(listId)">
            查看全部 <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</div>
</div>
</template>
<script>
// 接收参数：歌曲列表 songs
//          标题 title
//          封面地址 imgUrl
//          目标ID listId
//          显示“查看全部” showAllBtn
// 自定义事件： @clickDetail=___(id)
//             @clickSong=___(id)
export default {
    name: "PreviewCard",
    props: ['songs','title','imgUrl','listId','showAllBtn'],
    data() {
        return {

        }
    },
    methods: {
        clickCheckAll() {
            this.$emit("clickDetail",this.listId)
        },
        clickSong(row) {
            this.$emit('clickSong',row)
        },
        showAllSinger(ar) {
            let res = []
            ar.forEach(element => {
                res.push(element.name)
            })
            return res.join('/')
        }
    }
}
</script>

<style scoped>
.PreviewCard {
  display: flex;
}

.listCover {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  cursor: pointer;
}

.listCover img {
  width: 100%;
  border-radius: 10px;
}

.listContainer {
  width: calc(100% - 220px);
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

.listRows {
  height: 35px;
  font-size: 14px;
  color: rgb(153, 153, 153);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.listRows:nth-child(odd) {
  background-color: #f9f9f9;
}
.listRows:hover {
  background-color: #f4f4f4;
}

.index {
  text-align: center;
  line-height: 35px;
  width: 30px;
}

.listRows .musicName {
  color: rgb(31, 31, 31);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
}

.singer {
  text-align: right;
  position: absolute;
  right: 10px;
  display: block;
}

.checkAll {
  color: rgb(134, 134, 134);
  font-size: 14px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.checkAll i {
  font-size: 14px;
}

.selectRow {
  background-color: #efefef !important;
}

tr {
  cursor: pointer;
}

</style>