<template>
  <div class="menu">
    <!-- <router-link class="href" :to="item.path" v-for="(item,index) in menuList" :key="index">
      <el-button
        round
        :type="item.path==$route.path?'primary':''"
        size="mini"
        :class="item.meta.iconfont"
      >
        {{item.name}}
        <span
          v-if="menuList.length!=1"
          class="el-icon-close"
          @click.prevent.stop="closeTags(item)"
        ></span>
      </el-button>
    </router-link> -->
    <menuType></menuType>
  </div>
</template>

<script>
import menuType from "./menuType";
export default {
  components:{menuType},
  data() {
    return {};
  },
};
</script>

<style>
.menu {
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
.href {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
