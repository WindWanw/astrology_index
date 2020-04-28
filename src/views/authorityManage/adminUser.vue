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
          v-model="search.username"
          placeholder="请输入账号"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-input
          class="search_warp_default"
          clearable
          v-model="search.phone"
          placeholder="请输入联系电话"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
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
          size="small"
          style="margin-left:5px;"
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
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="账号" align="center"></el-table-column>
        <el-table-column prop="role" label="角色" align="center">
          <template slot-scope="scope">{{scope.row.role ? scope.row.role.roles.role_name : '未知'}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="reg_ip" label="注册ip" align="center"></el-table-column>
        <el-table-column prop="block_status" label="是否锁定" align="center">
          <template slot-scope="scope">
            <el-tag
              class="el-tag"
              effect="dark"
              size="small"
              :title="scope.row.block_status ? '点击接触用户锁定' : '点击锁定用户'"
              :type="scope.row.block_status ? 'danger' : 'success'"
              @click="blockUser(scope.row)"
            >{{scope.row.block_status ? '锁定' : '未锁定'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reg_from" label="注册来源" align="center"></el-table-column>
        <el-table-column prop="logintime" label="登录次数" align="center"></el-table-column>
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
        :title="form.id ? '修改用户信息' : '添加用户信息'"
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
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" size="mini" placeholder="请填写账号"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="form.phone" size="mini" placeholder="请填写电话号码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" size="mini" placeholder="请填写邮箱">
                <el-select v-model="form.suffix" slot="append" placeholder="请选择邮箱后缀">
                  <el-option
                    v-for="(item,index) in suffixList"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                size="mini"
                show-password
                :readonly="form.id ? true : false"
                placeholder="请填写电话号码"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户角色" prop="role">
              <el-select v-model="form.role" clearable placeholder="请选择用户角色">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont"
            :class="form.id ? 'iconbianji' : 'iconiconfontzhizuobiaozhunbduan20'"
            size="mini"
            :type="form.id ? 'primary' : 'success'"
            @click="addEditUser()"
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
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      dataList: [],
      suffixList: [],
      roleList: [],
      search: {
        page: 1,
        limit: 10,
        username: "",
        phone: ""
      },
      form: {
        id: "",
        username: "",
        phone: "",
        email: "",
        suffix: "",
        password: "",
        role: ""
      },
      rules: {
        username: [{ required: true, message: "请填写账号", trigger: "blur" }],
        phone: [{ required: true, message: "请填写电话号码", trigger: "blur" }],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择用户角色", trigger: "change" }]
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getAdminUserList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //点击锁定/解锁用户
    blockUser(data) {
      let block = data.block_status ? 0 : 1;
      this.$api.blockUser({ id: data.id, block_status: block }).then(res => {
        this.$message[res.code ? "error" : "success"](res.message);
        if (res.code) return;
        this.getDataList();
      });
    },
    //点击打开增加/修改dialog
    openAddEdit(type, data) {
      this.openAddEditDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
      } else {
        this.$func.setAssignData(this.form, data);

        if (data.role) {
          this.form.role = data.role.role_id;
        }
      }
      this.getEmailSuffix();
      this.getRoleSelect();
    },
    //获取邮箱常用后缀
    getEmailSuffix() {
      this.$api.getEmailSuffix().then(res => {
        this.suffixList = res.data || [];
      });
    },
    //获取角色相关信息
    getRoleSelect() {
      this.$api.getRoleSelect().then(res => {
        this.roleList = res.data || [];
      });
    },
    //增加修改用户信息
    addEditUser() {
      this.loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api[this.form.id ? "editUserInfo" : "addUserInfo"](
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