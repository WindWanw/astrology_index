<template>
  <el-menu
    :default-active="active"
    :router="true"
    unique-opened
    class="el-menu-vertical-demo"
    :collapse="collapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 一级菜单 -->
    <template v-for="item in asideList">
      <el-submenu
        v-if="item.children && item.children.length"
        :index="item.path"
        :key="item.path"
      >
        <template slot="title">
          <i :class="item.meta.iconfont"></i>
          <span>{{item.meta.name}}</span>
        </template>

        <!-- 二级菜单 -->
        <template v-for="itemChild in item.children">
          <el-submenu
            v-if="itemChild.children && itemChild.children.length"
            :index="itemChild.path"
            :key="itemChild.path"
          >
            <template slot="title">
              <i :class="itemChild.meta.iconfont"></i>
              <span>{{itemChild.meta.name}}</span>
            </template>

            <!-- 三级菜单 -->
            <el-menu-item
              v-for="itemChild_Child in itemChild.children"
              :index="itemChild_Child.path"
              :key="itemChild_Child.path"
            >
              <i :class="itemChild_Child.meta.iconfont"></i>
              <span slot="title">{{itemChild_Child.meta.name}}</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item
            v-else
            :index="itemChild.path"
            :key="itemChild.path"
          >
            <i :class="itemChild.meta.iconfont"></i>

            <span slot="title">
              {{itemChild.meta.name}}
              <!-- <el-badge
                :value="getNum(itemChild.name)"
                :max="99"
                class="item"
                :hidden="check.indexOf(itemChild.name) ==-1 || getNum(itemChild.name)==0"
              >{{itemChild.meta.name}}</el-badge> -->
            </span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-menu-item
        v-else
        :index="item.path"
        :key="item.path"
      >
        <i :class="item.meta.iconfont"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  props: ["collapse"],
  data() {
    return {
      active: this.$route.path,
    };
  },
  methods: {
    
  },
  computed: {
    asideList() {
      return this.$store.getters.asideList;
    }
  },
  watch: {
    $route(to, from) {
      this.active = this.$route.path;
    }
  },
  components: {},
  created() {
    this.active = this.$route.path;
  }
};
</script>

<style>
.el-menu {
  height: 100%;
  /* border-right: none; */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.el-menu-item i {
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
li i {
  padding: 0 10px;
  box-sizing: border-box;
}
.el-badge__content.is-fixed {
  top: 16px;
  right: 1px;
}
</style>
