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
          class="search_warp_default"
          clearable
          v-model="search.user_phone"
          placeholder="请输入发布人账号"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          class="search_warp_default"
          v-model="search.category"
          clearable
          placeholder="请选择专栏分类"
          size="mini"
        >
          <el-option
            v-for="item in columnList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="search_warp_default"
          clearable
          v-model="search.title"
          placeholder="请输入标题"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          class="search_warp_default"
          v-model="search.status"
          size="mini"
          clearable
          placeholder="请选择是否有效"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
        <el-select
          class="search_warp_default"
          v-model="search.top"
          size="mini"
          clearable
          placeholder="请选择是否置顶"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
        <el-button
          type="success"
          class="iconfont iconsearch"
          size="mini"
          @click="findData"
          style="margin-left:5px;"
        >搜索</el-button>
        <el-button
          type="primary"
          class="iconfont icontianjia"
          size="mini"
          @click="openAddEdit('add')"
          style="margin-left:5px;"
        >发布</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="dataList.data"
        stripe
        border
        style="width:100%"
        v-loading="loading"
        class="user-table"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="category_name" label="专栏分类" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="phone" label="发布人" align="center">
          <template slot-scope="scope">{{scope.row.user.phone}}</template>
        </el-table-column>
        <el-table-column prop="created_at" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="top" label="是否置顶" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.top=='0' ? 'danger' : 'success'"
              @click="setTop(scope.row)"
            >{{scope.row.top=='1' ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否有效" align="center">
          <template slot-scope="scope">
            <el-tag
              :title="scope.row.is_check ? scope.row.is_check==2 ? '审核未通过' : '审核通过' : '未审核'"
              :type="scope.row.status=='0' ? 'danger' : 'success'"
              @click="setStatus(scope.row)"
            >{{scope.row.status=='1' ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="查看"
              type="primary"
              size="medium"
              class="iconfont iconshenhe3"
              @click="openAddEdit('edit',scope.row)"
            >查看</el-button>
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
        :title="form.id ? '修改求职信息' : '发布求职信息'"
        :visible.sync="openAddEditDialog"
        v-loading="loading"
        top="30px"
        width="60%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
      >
        <div>
          <el-form
            ref="form"
            :rules="rules"
            label-position="left"
            label-width="120px"
            :model="form"
          >
            <el-form-item label="专栏分类" prop="category">
              <el-select v-model="form.category" clearable placeholder="请选择专栏分类">
                <el-option
                  v-for="item in columnList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input size="mini" v-model="form.title" placeholder="请填写标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="info">
              <el-input
                type="textarea"
                placeholder="请填写"
                v-model="form.info"
                maxlength="300"
                show-word-limit
                :autosize="{ minRows: 3, maxRows: 5}"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                :action="`${axios.defaults.baseURL}common/upload?type=avatar`"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                multiple
              >
                <div v-if="form.avatar">
                  <img
                    v-for="(item,index) in form.image"
                    :key="index"
                    :src="item"
                    class="avatar-upload"
                  />
                  <i class="el-icon-delete"></i>
                </div>

                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            :disabled="form.id ? true : false"
            :title="form.id ? '目前不支持修改' : '提交求职信息'"
            class="iconfont"
            :class="form.id ? 'iconbianji' : 'iconiconfontzhizuobiaozhunbduan20'"
            size="mini"
            :type="form.id ? 'primary' : 'success'"
            @click="addEdit()"
          >{{form.id ? '修改' : '提交'}}</el-button>
          <el-button
            class="iconfont iconcancel1"
            size="mini"
            type="warning"
            @click="openAddEditDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import province from "@/config/province";

export default {
  data() {
    return {
      loading: false,
      isShow: false,
      isClear: false,
      openAddEditDialog: false,
      dataList: [],
      citys: province,
      search: {
        page: 1,
        limit: 10,
        user_phone: "",
        category: "",
        title: "",
        status: "",
        top: ""
      },
      form: {
        id: "",
        category: "",
        title: "",
        info: "",
        image: []
      },
      rules: {
        category: [
          { required: true, message: "请选择专栏分类", trigger: "change" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        info: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      columnList: []
    };
  },
  watch: {},
  methods: {
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
        : this.form.image.push(res.data.img);
    },

    //返回
    reset() {
      this.$func.setDefaultData(this.search);
      this.getDataList();
      this.isShow = false;
    },
    //查询
    findData() {
      this.search.page = 1;
      this.getDataList();
      this.isShow = true;
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
    //获取所有配置数据
    getAllConfig() {
      this.$api.getAllConfig().then(res => {
        this.columnList = res.data.column_type || [];
      });
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getBuildingList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //置顶操作
    setTop(data) {
      let top = 1;
      if (data.top == "1") {
        top = 0;
      }
      this.$api
        .setTop({
          type: "building",
          id: data.id,
          top: top
        })
        .then(res => {
          this.$message[res.code ? "error" : "success"](res.message);
          if (res.code) return;
          this.getDataList();
        });
    },
    //打开添加dialog
    openAddEdit(type, data) {
      this.openAddEditDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
      } else {
        this.$func.setAssignData(this.form, data);
      }
    },
    addEdit() {
      this.loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api[this.form.id ? "editBuilding" : "addBuilding"](
            this.form
          ).then(res => {
            this.$message[res.code ? "error" : "success"](res.message);
            if (res.code) return;
            this.openAddEditDialog = false;
            this.getDataList();
          });
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.getDataList();
    this.getAllConfig();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.idcard-image {
  display: flex;
  justify-content: flex-start;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.idcard-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 150px;
  line-height: 150px;
  text-align: center;
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
  padding: 5px;
}
.el-radio-group {
  display: flex;
  padding: 5px;
}
.el-dialog__footer {
  text-align: left;
}
.el-radio-group[data-v-4687dc57] {
  margin: 4px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>