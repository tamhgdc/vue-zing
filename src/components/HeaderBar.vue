<template>
    <div class="headerBar">
        <div class="left" @click="goIndex">
            <!-- <img src="../assets/logo.png" alt="logo"> -->          
            <i class="el-icon-s-home"></i>
        </div>
        <div class="center">
            <div class="buttons">
                <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
                <i class="el-icon-arrow-right" @click="$router.go(1)"></i>
            </div>
            <div class="search">
                <el-input class="searchinput" placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" slot="reference" @keyup.enter.native="onSubmit" v-model="searchInput">
                </el-input>
            </div>
        </div>
        <div class="right">
            <a href="https://gitee.com/linyibin97/vanilla-music-player"><i class="el-icon-info"></i> 项目仓库地址</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
        onSubmit(e) {
            // console.log(this.searchInput)
            if (e.keyCode == 13) {
                if (this.searchInput !== "") {
                    if (this.$route.params.id !== this.searchInput)
                        this.$router.push({ name: "search", params: { id: this.searchInput } });
                } else {
                    this.$message.warning({message:'输入不能为空',duration:1000});
                }
            }
        },
        goIndex() {
            this.$router.push("/index")
        }
    }
}
</script>

<style scoped>

.headerBar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 30000;
}

.left {
    width: 60px;
    margin: 0 50px 0 50px;
    cursor: pointer;
    line-height: 36px;
    border-radius: 18px;
    text-align: center;
    background-color: rgb(112,184,121);
}

.left i {
  font-size: 20px;
  color: #fff;
}

.right {
    width:160px;
    line-height: 36px;
    border-radius: 18px;
    text-align: center;
    background-color: rgb(112,184,121);
    position: absolute;
    right: 50px;
}
.right a {
    color: #fff;
    text-decoration: none;
}
.right a:link {
    text-decoration: none;
}
.right a:visited {
    text-decoration: none;
}
.right a:hover {
    text-decoration: none;
}
.right a:active {
    text-decoration: none;
}
.right i {
  font-size: 20px;
  color: #fff;
}

.center {
  display: flex;
  align-items: center;
}

.buttons {
  display: flex;
  height: 30px;
}

.buttons i {
  background-color: rgb(112,184,121);
  color: rgb(235, 235, 235);
  font-size: 20px;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 0 5px;
  cursor:pointer
}

.search {
    line-height: 60px;
    height: 60px;
    margin: 0 20px 0 20px;
    display: flex;
}


/* 修改input样式 */
/deep/.el-input__icon {
    line-height: 30px;
    color: rgb(235, 235, 235);
}
/deep/.el-input__inner {
    background-color: rgb(112,184,121);
    border: none;
    color: white;
    font-size: 14px;
    border-radius: 15px;
    height: 30px;
}
/deep/ .el-input__inner::-webkit-input-placeholder {
    color: rgb(235, 235, 235);
}

</style>