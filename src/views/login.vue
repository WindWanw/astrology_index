<template>
  <div class="login">
    <div class="login-top">
      <div class="login-language">

      </div>
    </div>
    <div class="login-content">
      <div class="login_title">
        <span>Astrology管理系统</span>
      </div>
      <div>
        <el-input
          size="small"
          placeholder="请输入账号"
          prefix-icon="iconfont iconziyuan1"
          v-model="form.username"
        ></el-input>
        <el-input
          prefix-icon="iconfont iconziyuan"
          placeholder="请输入密码"
          v-model="form.password"
          size="small"
          show-password
          @keyup.enter.native="login"
        ></el-input>
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="text"></div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      url: ""
    };
  },
  components: {},
  //页面加载调用获取cookie值
  mounted() {},
  methods: {
    login() {
      if (!this.form.username)
        return this.$message.error("账号不能为空，请填写账号");
      if (!this.form.password)
        return this.$message.error("密码不能为空，请填写密码");
      this.$api.login(this.form).then(res => {

        this.$message[res.code ? 'error' : 'success'](res.data.message);
        if(res.code) return ;
        localStorage.setItem("token",res.data.list.token.token);
        this.$router.replace(this.url);
      });
    },

    //跳转路由
    routerPush($r) {
      this.url = $r.query.redirect || "/home";

      if (localStorage.getItem("token")) {
        this.$router.replace(this.url);
      }
    }
  },
  created() {
    this.routerPush(this.$route);
  }
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../assets/background.jpg") no-repeat;
  background-size: cover;
}
.login-content {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.3);
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 10px;
}
.login_title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  font-style: normal;
}
.login_title span {
  width: 80%;
  height: 100%;
  border-bottom: 2px solid #409eff;
}
.el-input {
  margin-bottom: 15px;
}
.el-button--small {
  width: 100%;
  border-radius: 20px;
  margin: 10px auto;
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: #409eff;
  height: 50px;
}
.iconfont.iconziyuan1.iconziyuan {
    margin: 5px;
}
</style>
