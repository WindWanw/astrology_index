<template>
  <div id="menu-type">
    <div v-if="menuType==1">
      <router-link class="href" v-for="(item,index) in menuList" :key="index" :to="item.path">
        <el-button
          :type="item.path==$route.path?'primary':''"
          size="mini"
          :class="item.meta.iconfont"
        >
          {{item.meta.name}}
          <span
            v-if="menuList.length!=1"
            class="el-icon-close"
            @click.prevent.stop="closeTags(item)"
          ></span>
        </el-button>
      </router-link>
    </div>
    <div v-if="menuType==2">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuType",
  data() {
    return {
      
    };
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    },
    breadcrumb(){
      return this.$store.getters.breadcrumb;
    },
    menuType(){
        return this.$store.state.menuType;
    }
  },
  watch: {
    //  添加标签页
    $route(to, from) {
      this.$store.dispatch("addTab", to);
    }
  },
  methods: {
    //  删除标签页，当标签页是当前页删除跳转到上一个页面
    closeTags(item) {
      this.$store.dispatch("delTab", item).then(res => {
        if (item.path == this.$route.path) {
          this.$router.push(res[res.length - 1].path);
        }
      });
    }
  },
  created() {
    this.$store.dispatch("addTab", this.$route);
  }
};
</script>

<style>
#menu-type {
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.href {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
