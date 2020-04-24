<template>
  <div class="header theme-bg-blue">
    <div class="left">
      <el-dropdown trigger="click" :hide-on-click="false">
        <div class="logo">广盈集团</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont iconcaidan">
            <el-tooltip content="点击切换menu栏" placement="top">
              <el-switch
                v-model="menuType"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="2"
                inactive-value="1"
                active-text="单模块标题"
                inactive-text="浏览器Tab"
                @change="setMenuType()"
              ></el-switch>
            </el-tooltip>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <i class="iconfont iconcaidan" title="收起/展开" @click="$emit('changeCollapse')"></i>
    </div>

    <div class="right">
      <theme-picker></theme-picker>
      <i class="iconfont icongeren"></i>
      <span class="username">{{userInfo.username}}</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="iconfont iconqiehuanzuhu"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="openEditPassword">
              <i class="iconfont iconxiugaimima"></i>修改密码
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="loginout">
              <i class="iconfont icontuichu3"></i>退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/components/themePicker";
export default {
  data() {
    return {
      // username: JSON.parse(localStorage.getItem("userinfo")).username || "",
      menuType: this.$store.state.menuType
    };
  },
  computed: {
    userInfo(){
		
      return this.$store.getters.userInfo
    }
  },
  components: {
    ThemePicker
  },
  methods: {
    loginout() {
      this.$confirm("确定要退出当前登录吗？")
        .then(_ => {
          this.$router.replace("/login");
          localStorage.clear("token");
        })
        .catch(_ => {});
    },
    openEditPassword() {
      this.$router.replace("/userSetting");
    },

    setMenuType(){
      this.$store.commit('SET_MENUTYPE',this.menuType);
      this.$store.dispatch("addTab", this.$route);
    }
  },
  created(){
	  
  }
};
</script>

<style>
.header {
  /* border-bottom: 1px solid #e8e9ed; */
  min-height: 60px;
  /* background-color: #009DFB; */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iconfont.iconcaidan {
  font-size: 25px;
  font-weight: 600;
  color: #fff;
  margin-left: 50px;
  cursor: pointer;
}
.logo {
  font-size: 28px;
  color: #fff;
}
.iconfont.icongeren {
  margin-left: 10px;
}
.right .username {
  margin: 0 10px;
}
.iconfont.iconqiehuanzuhu {
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  padding: 5px;
}
.icontuichu {
  font-size: 12px;
  color: #fff;
}
</style>
