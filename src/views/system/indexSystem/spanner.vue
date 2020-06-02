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
        <!-- <el-input
          clearable
          v-model="search.title"
          placeholder="请输入"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-button
          type="success"
          class="iconfont iconchakan"
          size="mini"
          @click="findData"
          style="margin-left:5px;"
        >搜索</el-button>-->
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
        :data="dataList.data"
        stripe
        border
        style="width:100%"
        v-loading="loading"
        class="user-table"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center">
          <template slot-scope="scope">
            <i class="iconfont spanner-icon" :class="scope.row.icon"></i>
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="en" label="英文" align="center"></el-table-column>
        <el-table-column prop="url" label="路由" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status ? 'success' : 'danger'"
              :title="scope.row.status ? '点击禁用' : '点击启用'"
            >{{scope.row.status | getStatus}}</el-tag>
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
        title="修改博客文章"
        :visible.sync="openAddEditDialog"
        v-loading="loading"
        top="30px"
        width="60%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
      >
        <div>
          <el-form label-position="right" label-width="120px" :model="form">
            <el-form-item label="导航名称" prop="title">
              <el-input v-model="form.title" size="mini" placeholder="请填写导航名称"></el-input>
            </el-form-item>
            <el-form-item label="导航英文" prop="en">
              <el-input v-model="form.en" size="mini" placeholder="请填写导航英文名称，为空将自动翻译导航名称"></el-input>
            </el-form-item>
            <el-form-item label="导航图标" prop="icon">
              <el-input v-model="form.icon" size="mini" placeholder="请输入导航图标">
                <i slot="suffix" class="iconfont iconshouye1"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="导航路由" prop="url">
              <el-input v-model="form.url" size="mini" placeholder="请输入导航路由名"></el-input>
            </el-form-item>
            <el-form-item label="导航排序" prop="sort">
              <el-input type="number" v-model="form.sort" size="mini" placeholder="请输入导航排序，倒序排序"></el-input>
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
            <el-form-item label="导航描述" prop="description">
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="200"
                show-word-limit
                v-model="form.description"
                placeholder="请输入导航描述"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button class="iconfont iconqueding3" size="mini" type="success" @click="addEdit">确定修改</el-button>
          <el-button class="iconfont iconquxiao" size="mini" @click="openAddEditDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Editor from "@/components/editor.vue";
export default {
  components: { Editor },
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
        title: "",
        en: "",
        icon: "",
        url: "",
        sort: "",
        status: "",
        description: ""
      },
      openAddEditDialog: false
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
    //返回
    reset() {
      this.$func.setDefaultData(this.search);
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getSpannerList(this.search).then(res => {
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
    addEdit() {
      this.loading = true;

      this.$api[this.form.id ? "editSpanner" : "addSpanner"](this.form).then(
        res => {
          this.$message[res.code ? "error" : "success"](res.data.message);
          if (res.code) return;
          this.getDataList();
          this.openAddEditDialog = false;
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
.spanner-icon{
  margin: 0 10px;
}
</style>