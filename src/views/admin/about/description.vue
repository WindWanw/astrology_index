<template>
  <div class="user-list">
    <div class="table_title">
      <div>
        <el-button
          v-if="isShow"
          type="primary"
          size="mini"
          class="el-icon-d-arrow-left"
          @click="reset()"
        >返回</el-button>
      </div>
      <div class="search_wrap">
        <el-input
          clearable
          v-model="search.title"
          placeholder="请输入博客名称"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-button
          type="success"
          class="iconfont iconchakan"
          size="mini"
          @click="findData"
          style="margin-left:5px;"
        >搜索</el-button>
        <el-button
          type="primary"
          class="iconfont icontianjia1"
          size="mini"
          @click="addEditDialog('add')"
          style="margin-left:5px;"
        >添加</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="dataList.list"
        stripe
        border
        style="width:100%"
        v-loading="loading"
        class="user-table"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="image" label="封面图" align="center">
          <template slot-scope="scope">
            <!-- <cover :url="scope.row.image"></cover> -->
            <!-- <avatar :url="scope.row.image" :sizes="70" :fits="'fill'" @click.native="view(scope.row.image)"></avatar> -->
            <div @click="view(scope.row.image)">
              <avatar
                :url="scope.row.image"
                :fits="'fill'"
                :types="2"
                ref="avatar"
                :isDialog="isDialog"
                @close="close"
              ></avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="user" label="添加者" align="center">
          <template slot-scope="scope">{{scope.row.user.nickname}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status ? 'success' : 'error'"
            >{{scope.row.status | getStatus()}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="编辑用户信息"
              type="primary"
              size="mini"
              class="iconfont iconbianji1"
              @click="addEditDialog('edit',scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="search.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
      ></el-pagination>

      <el-dialog
        :title="form.id ? '修改' : '添加'"
        :visible.sync="openAddEditDialog"
        v-loading="loading"
        top="30px"
        width="60%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
      >
        <div>
          <el-form label-position="right" label-width="120px" :model="form">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" size="mini" placeholder="请填写标题"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="image">
              <el-upload
                class="avatar-uploader"
                :action="`${axios.defaults.baseURL}common/uploadFile/open/true`"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="form.image" :src="form.image" class="avatar-upload" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <editor v-model="form.content" :isClear="isClear"></editor>
            </el-form-item>
            <el-form-item label="上线状态" prop="status">
              <el-switch
                v-model="form.status"
                active-value="1"
                inactive-value="0"
                active-color="#00FF00"
                inactive-color="#FF0000"
                active-text="启用"
                inactive-text="禁用"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont iconqueding3"
            size="mini"
            type="success"
            @click="addEdit()"
          >确定修改</el-button>
          <el-button class="iconfont iconquxiao" size="mini" @click="openAddEditDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Editor from "@/components/editor.vue";
import Cover from "@/components/coverPicture.vue";
import Avatar from "@/components/avatar.vue";
export default {
  components: { Editor, Cover, Avatar },
  data() {
    return {
      loading: false,
      isShow: false,
      isClear: false,
      dataList: [],
      search: {
        page: 1,
        limit: 10
      },
      form: {
        id: "",
        title: "", //标题
        image: "", //封面
        content: "", //简介
        status: "1" //状态
      },
      openAddEditDialog: false,
      isDialog: false
    };
  },
  watch: {},
  methods: {
    view(url) {
      this.isDialog = true;
      this.$refs.avatar.view(url);
    },
    close(params) {
      this.isDialog = params;
    },
    //分页
    handleSizeChange(val) {
      this.search.limit = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.search.page = val;
      this.getDataList();
    },
    //返回
    reset() {
      this.$func.setDefaultData(this.search);
      this.search.status = "3";
      this.getDataList();
      this.isShow = false;
    },
    beforeCloseDialog(done) {
      this.$confirm("确定要关闭吗？").then(_ => {
        done();
      });
    },
    //关闭dialog
    closeDialog() {
      this.$func.setDefaultData(this.form);
    },
    //查询
    findData() {
      this.search.page = 1;
      this.getDataList();
      this.isShow = true;
    },
    //上传图片前
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //上传成功后
    uploadSuccess(res, file, fileList) {
      res.code
        ? this.$message.error(res.data.error)
        : (this.form.image = res.data.img);
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getAboutList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },

    addEditDialog(type, item) {
      this.openAddEditDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
        this.form.status = "1";
      } else {
        this.$func.setAssignData(this.form, item);
      }
    },

    //添加修改
    addEdit() {
      this.loading = true;

      this.$api[this.form.id ? "editAbout" : "addAbout"](this.form).then(
        res => {
          this.$message[res.code ? "error" : "success"](res.data.message);
          if (res.code) return;
          this.openAddEditDialog = false;
          this.getDataList();
        }
      );
      this.loading = false;
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
.el-button {
  margin: 0 10px;
}
.el-upload-image {
  width: 60px;
  height: 60px;
}
</style>