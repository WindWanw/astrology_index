<template>
  <div class="user-list">
    <!-- <div class="table_title">
      <div class="search_wrap"></div>
    </div>-->
    <div class="content">
      <div class="content-3">
        <div class="content-3-1">
          <div>
            <span>前台标题语言：</span>
          </div>
          <div>
            <el-radio-group v-model="language" size="small" @change="setLanguage">
              <el-radio-button label="zh-CN">中文</el-radio-button>
              <el-radio-button label="en-US">英文</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="content-7">
        <!-- <div class="content-7-1">
          <div>
            <span>前台标题语言：</span>
          </div>
          <div>
            <el-radio-group v-model="language" size="small" @change="setLanguage">
              <el-radio-button label="zh-CN">中文</el-radio-button>
              <el-radio-button label="en-US">英文</el-radio-button>
            </el-radio-group>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      language: ""
    };
  },
  watch: {},
  methods: {
    setLanguage(data) {
      this.$api.setIndexLanguage({ language: data }).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        this.getLanguage();
      });
    },
    getLanguage() {
      this.$api.getIndexLanguage().then(res => {
        if (!res.code) {
          this.language = res.data.data || "zh-CN";
        }
      });
    }
  },
  created() {
    this.getLanguage();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
.content-3 {
  width: 28%;
  margin: 5px;
  padding: 10px;
  box-shadow: 5px 5px 5px #dedede;
}
.content-3-1 {
  display: flex;
  justify-content: space-between;
}
.content-3-1 span {
  height: 32px;
  line-height: 32px;
  color: #555555;
  font-size: 16px;
}
.content-7 {
  width: 68%;
  margin: 5px;
  padding: 10px;
  box-shadow: 5px 5px 5px #dedede;
}
.content-7-1 {
  display: flex;
  justify-content: space-between;
}
.content-7-1 span {
  height: 32px;
  line-height: 32px;
  color: #555555;
  font-size: 16px;
}
</style>