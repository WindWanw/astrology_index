<!--
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-28 10:35:26
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.theme-bg-blue {
  background-color: #409eff;
}
/* 导航菜单 */
.el-menu-item {
  border-left: 4px solid transparent;
}
.el-menu-item.is-active {
  border-left: 4px solid #409eff;
  font-size: 16px;
}
/* 选择主题按钮 */
.el-color-picker__color {
  border: none !important;
}
/* 标题样式 */
.title {
  border-bottom: 1px solid #eee;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #409eff;
  margin-bottom: 20px;
}
/* 表格标题 */
.table_title {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
/* 分页样式 */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
/* dialog */
.el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
/* 表格展开 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.search_warp_default{
  margin:0 10px;
  width: 200px;

}
.el-select>.el-input {
    display: block;
    width: 200px;
}
.iconbianji1:before {
    margin: 0 5px;
}
.iconshanchu1:before {
     margin: 0 5px;
}
.el-tag{
  cursor: pointer;
}
</style>
