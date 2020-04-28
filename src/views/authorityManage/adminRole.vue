<template>
  <div class="user-list">
    <div class="table_title">
      <div></div>
      <div class="search_wrap">
        <el-button
          title="添加角色"
          type="success"
          class="iconfont icontianjia"
          size="mini"
          @click="openAddEdit('add')"
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              class="iconfont iconbianji"
              size="mini"
              type="warning"
              @click="openAddEdit('edit',scope.row)"
            >修 改</el-button>
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
        :title="form.id ? '修改角色信息' : '添加角色信息'"
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
            <el-form-item label="角色名称" prop="role_name">
              <el-input v-model="form.role_name" size="mini" placeholder="请填写角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色代码" prop="role_code">
              <el-input v-model="form.role_code" size="mini" placeholder="请填写角色代码"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="describe">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请填写角色描述"
                v-model="form.describe"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="角色权限" prop="menu_id">
              <el-tree
                :data="menuList"
                :props="defaultProps"
                accordion
                show-checkbox
                :highlight-current="true"
                node-key="id"
                ref="tree"
                @check="getCheckedKeys()"
                :default-checked-keys="form.menu_id"
                :default-expand-all="true"
              ></el-tree>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont"
            :class="form.id ? 'iconbianji' : 'iconiconfontzhizuobiaozhunbduan20'"
            size="mini"
            :type="form.id ? 'primary' : 'success'"
            @click="addRole()"
          >{{form.id ? '修改' : '提交'}}</el-button>
          <el-button
            class="iconfont iconcancel1"
            size="mini"
            type="warning"
            @click="closeDialog"
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
        describe: "",
        menu_id: []
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        role_code: [
          { required: true, message: "请输入角色代码", trigger: "blur" }
        ],
        menu_id: [{ required: true, message: "请选择权限", trigger: "blur" }]
      },
      openAddEditDialog: false
    };
  },
  watch: {},
  methods: {
    getCheckedKeys() {
      this.form.menu_id = this.$refs.tree.getCheckedKeys();
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
    beforeCloseDialog(done) {
      this.$confirm("确定要关闭吗？").then(_ => {
        done();
      });
    },
    //关闭dialog
    closeDialog() {
      this.openAddEditDialog=false;
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
    //获取权限
    getMenuList() {
      this.$api.getMenuList().then(res => {
        this.menuList = res.data || [];
      });
    },
    //打开dialog操作
    openAddEdit(type, data) {

      this.openAddEditDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
      } else {
        this.$func.setAssignData(this.form, data);
      }
      this.getMenuList();
    },
    //添加角色
    addRole() {
      // console.log(this.form);return ;
      if (!this.form.menu_id.length) {
        return this.$message.warning("必须选择权限");
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.addRole(this.form).then(res => {
            this.$message[res.code ? "error" : "success"](res.message);
            if (res.code) return;
            this.getDataList();
            this.openAddEditDialog = false;
          });
        }
      });
    },
    //启用
    setRoleStatus(data) {
      let status = data.status == "0" ? "1" : "0";
      this.$api.setRoleStatus({ id: data.id, status: status }).then(res => {
        this.$message[res.code ? "error" : "success"](res.message);
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