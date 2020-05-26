<template>
  <div class="user-list">
    <div class="table_title">
      <div></div>
      <div class="search_wrap"></div>
    </div>
    <div class="content">
      <div class="content-center">
        <div class="content-title">
          <i class="iconfont iconbaimingdan">白名单:</i>
        </div>
        <div class="content-tag">
          <el-tag
            v-for="(item,index) in whiteList"
            :key="index"
            :type="index | getTagColor"
            closable
            :disable-transitions="false"
            @close="handleClose(item.id)"
          >{{item.title}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputWhite"
            v-model="white"
            ref="saveWhiteInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(1)"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput('white')">+ 白名单</el-button>
        </div>
      </div>
    </div>
    <div class="content black-list">
      <div class="content-center">
        <div class="content-title">
          <i class="iconfont iconheimingdan1">黑名单:</i>
        </div>
        <div class="content-tag">
          <el-tag
            v-for="(item,index) in blackList"
            :key="index"
            :type="index | getTagColor"
            closable
            :disable-transitions="false"
            @close="handleClose(item.id)"
          >{{item.title}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputBlack"
            v-model="black"
            ref="saveBlackInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(2)"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput('black')">+ 黑名单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      inputWhite: false,
      inputBlack: false,
      white: "",
      black: "",

      whiteList: [],
      blackList: []
    };
  },
  methods: {
    handleClose(tag) {
      this.$api.delWords({ id: tag }).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        if (res.code) return;
        this.getDataList();
      });
    },

    showInput(type) {
      if (type == "white") {
        this.inputWhite = true;
        this.$nextTick(_ => {
          this.$refs.saveWhiteInput.$refs.input.focus();
        });
      } else {
        this.inputBlack = true;
        this.$nextTick(_ => {
          this.$refs.saveBlackInput.$refs.input.focus();
        });
      }
    },
    handleInputConfirm(type) {
      this.loading = true;
      let title;
      if (type == 1) {
        title = this.white;
      } else {
        title = this.black;
      }
      this.$api.addWords({ title: title, type: type }).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        if (res.code) return;
        this.white = "";
        this.black = "";
        (this.inputWhite = false),
          (this.inputBlack = false),
          this.getDataList();
      });
      this.loading = false;
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getWordsList().then(res => {
        this.whiteList = res.data.white || [];
        this.blackList = res.data.black || [];
        this.loading = false;
      });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.black-list {
  margin-top: 10px;
}
.content-center {
  width: 100%;
  height: 150px;
  padding: 10px 10px 10px 5px;
  display: flex;
}
.content-title {
  width: 10%;
  margin: auto;
  color: grey;
  text-align: center;
}
.content-tag {
  width: 90%;
  padding: 10px;
  border: 1px solid #ededed;
  box-shadow: 5px 5px 5px #888888;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>