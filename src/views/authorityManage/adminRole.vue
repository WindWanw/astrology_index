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
        <el-button
          title="添加角色"
          type="success"
          class="iconfont icontianjia"
          size="mini"
          @click="openAddEditRole('add')"
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
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="role_code" label="角色代码" align="center"></el-table-column>
        <el-table-column prop="describe" label="角色描述" align="center"></el-table-column>
        <el-table-column prop="creater" label="创建人" align="center">
          <template slot-scope="scope">{{scope.row.user.username}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              style="cursor:pointer;"
              :type="scope.row.status | getColor"
              :title="scope.row.status=='0' ? '点击启用' : '点击禁用'"
              @click="setRoleStatus(scope.row)"
            >{{scope.row.status=='0' ? '未启用' : '启用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
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
        :title="form.id ? '修改角色信息' : '添加角色信息'"
        :visible.sync="openAddEditRoleDialog"
        v-loading="loading"
        top="30px"
        width="60%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
      >
        <div>
          <el-form label-position="left" label-width="120px" :model="form">
            <el-form-item label="角色名称" prop="role_name">
              <el-input v-model="form.role_name" size="mini" placeholder="请填写角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色代码" prop="role_code">
              <el-input v-model="form.role_code" size="mini" placeholder="请填写角色代码"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="describe">
              <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont iconqueding3"
            size="mini"
            type="success"
            @click="addRole()"
          >确定修改</el-button>
          <el-button
            class="iconfont iconquxiao"
            size="mini"
            @click="openAddEditRoleDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      dataList: [],
      search: {
        page: 1,
        limit: 10
      },
      form: {
        id: "",
        role_name: "",
        role_code: "",
        describe: ""
      },
      openAddEditRoleDialog: false
    };
  },
  watch: {},
  methods: {
    //分页
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getRoleList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //打开dialog操作
    openAddEditRole(type, data) {
      this.openAddEditRoleDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
      } else {
        this.form = this.$func.setAssignData(this.form, data);
      }
    },
    //添加角色
    addRole() {
      this.$api.addRole(this.form).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        if (res.code) return;
        this.getDataList();
        this.openAddEditRoleDialog = false;
      });
    },
    //启用
    setRoleStatus(data) {
      let status = data.status == "0" ? "1" : "0";
      this.$api.setRoleStatus({ id: data.id, status: status }).then(res => {
        this.$message[res.code ? "error" : "success"](res.data.message);
        if (res.code) return;
        this.getDataList();
      });
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
</style>