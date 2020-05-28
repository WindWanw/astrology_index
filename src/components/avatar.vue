<template>
  <div>
    <div class="cover-picture" v-if="types==1">
      <el-avatar :shape="shapes" :size="sizes" :fit="fits" :src="url"></el-avatar>
    </div>
    <div class="demo-image__preview" v-else-if="types==2">
      <el-image :style="styles" :src="url" :fit="fits"></el-image>
    </div>

    <el-dialog :visible.sync="isDialog" width="30%" @closed="close">
      <div class="img-dialog">
        <img :src="img" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props:['url','style'],
  data() {
    return {
      dialog: false,
      img: ""
    };
  },
  props: {
    types: {
      type: Number,
      default: 1
    },
    //设置头像的形状circle / square
    shapes: {
      type: String,
      default: () => "square"
    },
    //设置头像的大小number / large / medium / small
    sizes: {
      type: [String, Number],
      default: () => "large"
    },
    //当展示类型为图片的时候，设置图片如何适应容器框fill / contain / cover / none / scale-down
    fits: {
      type: String,
      default: () => "cover"
    },
    styles: {
      type: Object,
      default: () => {
        return { width: "70px", height: " 70px" };
      }
    },
    url: {
      type: String,
      default: "",
      reuqire: true
    },
    isDialog: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    view(url) {
      this.img = url;
    },
    close() {
      this.$emit("close", false);
    }
  },
  created() {}
};
</script>

<style>
.cover-picture {
  width: 70px;
  height: 70px;
}
.cover-picture img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.demo-image__preview img {
  cursor: pointer;
}
.img-dialog {
  width: 100%;
  height: 100%;
}
.img-dialog img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
