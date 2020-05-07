<template>
  <div id="home">
    <div id="header">
      <Header @changeCollapse="changeCollapse"></Header>
    </div>
    <div id="main">
      <div id="aside">
        <Aside :collapse="collapse"></Aside>
      </div>
      <div id="content">
        <div id="content_menu">
          <Menu></Menu>
        </div>
        <div id="content_main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header";
import Aside from "@/components/aside";
import Menu from "@/components/menu";
export default {
  data() {
    return {
      collapse: false //侧边栏展开收起状态
    };
  },
  components: { Header, Aside, Menu },
  methods: {
    //由子组件触发
    changeCollapse() {
      this.collapse = !this.collapse;
    },
    //获取用户相关信息，将该信息保存在vue状态管理中
    getUserInfo() {
      this.$api.getUserInfo().then(res => {
        if (res.code) {
          this.$message.error(res.message);
          this.$router.replace("/login");
          localStorage.clear("token");
        } else {
          this.$store.commit("ADD_USER_INFO", res.data);
          this.$store.commit("GET_AUTH_PATH",res.data.path)
        }
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>
<style>
#home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1024px;
}
#main {
  flex: 1;
  display: flex;
}

#aside {
  background-color: rgb(84, 92, 100);
}
#content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f1f2f7;
  width: 100%;
  height: 100%;
  /* position: relative; */
  overflow: auto;
}
#content_menu {
  /* position: absolute; */
  width: 100%;
}
#content_main {
  top: 60px;
  /* position: absolute; */
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
}
.expand_wrap p {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.expand_wrap p span {
  width: 120px;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
  color: #99a9bf;
}
.el-button--mini,
 .el-button--small {
  font-size: 12px;
  border-radius: 3px;
  padding: 6px 6px !important;
}
.el-menu-item i {
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
ul {
  list-style: none;
}
.el-dialog__body__diy {
  overflow-y: hidden;
}
.el-submenu__title i {
  color: #fff;
}
.el-text-change {
  cursor: pointer;
}
.el-text-change:hover {
  font-size: 1.1em;
  color: red;
}
.avatar {
  width: 50px;
  height: 50px;
}
.idcardImg {
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 10px;
  margin-top: 10px;
}
.search_wrap{
  display: flex;
  justify-content: flex-end;
}
/** 设置上传单张图片的样式 */
.avatar-uploader {
  width: 150px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-upload {
  width: 150px;
  height: 150px;
  display: block;
}
.idcard-uploader {
  width: 250px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.idcard-uploader:hover {
  border-color: #409eff;
}
.idcard-upload {
  width: 250px;
  height: 150px;
  display: block;
}
.el-button+.el-button {
    margin-left: 0;
}
.el-card__header {
    padding: 10px 20px;
}
</style>
