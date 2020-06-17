<template>
  <div class="cache-list">
    <div class="cache-content">
      <el-form :model="imageForm" label-width="150px" label-position="left" class="demo-imageForm">
        <el-form-item label="图片类型" prop="type">
          <el-checkbox-group v-model="imageForm.type">
            <el-checkbox
              v-for="(item,index) in imageList"
              :key="index"
              :label="item.value"
            >{{item.key}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item size="mini">
          <el-button
            class="iconfont iconchenggong1"
            size="mini"
            type="primary"
            @click="onSubmit('image')"
          >确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      imageList: [],
      imageForm: {
        type: []
      }
    };
  },
  watch: {},
  methods: {
    onSubmit(type) {
      switch (type) {
        case "image":
          this.cache();
          break;
      }
    },
    //清除缓存
    cache() {
      this.$api.clearImageCache(this.imageForm).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        if (res.code) return;
        this.imageForm.type = [];
      });
    },

    //图片类型
    getImageCacheType() {
      this.$api.getImageCacheType().then(res => {
        this.imageList = res.data || [];
      });
    }
  },
  created() {
    this.getImageCacheType();
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
.cache-content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
}
.demo-imageForm {
  margin: 30px;
}
</style>