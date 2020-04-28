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
          v-model="search.company_card"
          placeholder="请输入企业认证账号"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-input
          class="search_warp_default"
          clearable
          v-model="search.company_name"
          placeholder="请输入公司名称"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          class="search_warp_default"
          style="width:200px;"
          v-model="search.type"
          size="mini"
          clearable
          placeholder="请选择企业类型"
          @keyup.enter.native="findData"
        >
          <el-option
            v-for="item in qualificationList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          class="search_warp_default"
          v-model="search.status"
          size="mini"
          clearable
          placeholder="请选择审核状态"
          @keyup.enter.native="findData"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          type="success"
          class="iconfont iconsearch"
          size="mini"
          @click="findData"
          style="margin-left:5px;"
        >搜索</el-button>
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
        <el-table-column prop="company_name" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="type" label="企业类型" align="center"></el-table-column>
        <el-table-column prop="truename" label="企业法人" align="center"></el-table-column>
        <el-table-column prop="name" label="联系人" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="company_card" label="企业认证账号" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="check_time" label="审核时间" align="center"></el-table-column>
        <el-table-column prop="status" label="审核状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status | getColor"
              size="small"
            >{{scope.row.status | getAuthStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==0"
              title="企业认证审核"
              type="warning"
              size="medium"
              class="iconfont iconshenhe2"
              @click="openAuthInfo(scope.row)"
            >审核</el-button>
            <el-button
              v-else
              title="查看企业认证"
              :type="scope.row.status | getColor"
              size="medium"
              class="iconfont iconshenhe3"
              @click="openAuthInfo(scope.row)"
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
      <!--审核界面-->
      <el-dialog
        title="企业认证审核"
        :visible.sync="authInfoDialog"
        v-loading="loading"
        top="30px"
        width="30%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
      >
        <div>
          <el-form label-position="left" label-width="120px" :model="form">
            <el-form-item label="企业名称" prop="company_name">
              <el-input v-model="form.company_name" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="企业类型" prop="type">
              <el-input v-model="form.type" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="企业法人" prop="truename">
              <el-input v-model="form.truename" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="name">
              <el-input v-model="form.name" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" prop="phone">
              <el-input v-model="form.phone" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="企业认证账号" prop="company_card">
              <el-input v-model="form.company_card" size="mini" readonly></el-input>
            </el-form-item>
            <el-form-item label="审核结果" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="(item,index) in statusList"
                  :key="index"
                  :label="item.value"
                >{{item.key}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核反馈" prop="remark">
              <el-input
                type="textarea"
                :row="3"
                placeholder="退回修改或不通过原因"
                v-model="form.remark"
                :autosize="{ minRows: 3, maxRows: 5}"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            v-if="!isStatus"
            class="iconfont iconiconfontzhizuobiaozhunbduan20"
            size="mini"
            type="success"
            @click="auditEnterpriseCertification()"
          >确定修改</el-button>
          <el-button
            class="iconfont iconcancel1"
            size="mini"
            type="danger"
            @click="authInfoDialog = false"
          >返 回</el-button>
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
      isClear: false,
      isStatus:0,
      dataList: [],
      qualificationList: [],
      statusList: [
        { key: "待审核", value: "0" },
        { key: "未通过", value: "2" },
        { key: "已通过", value: "1" }
      ],
      search: {
        page: 1,
        limit: 10,
        company_card: "",
        company_name: "",
        type: "",
        status: ""
      },
      form: {
        id: "",
        company_name: "",
        type: "",
        truename: "",
        name: "",
        phone: "",
        company_card: "",
        status: "",
        remark: ""
      },
      authInfoDialog: false //打开企业认证dialog
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
      this.$api.getEnterpriseAuth(this.search).then(res => {
        console.log(res.data.data);
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //获取企业类别
    getQualificationCategory() {
      this.$api.getQualificationCategory().then(res => {
        this.qualificationList = res.data.info || [];
      });
    },
    //打开审核详细
    openAuthInfo(data) {
      this.form = this.$func.setAssignData(this.form, data);
      this.isStatus=data.status;
      this.authInfoDialog = true;
    },
    //审核
    auditEnterpriseCertification() {
      this.$api.auditEnterpriseCertification(this.form).then(res => {
        this.$message[res.code ? 'error' : 'success'](res.message)
        this.authInfoDialog=false;
        this.getDataList();
      });
    }
  },
  created() {
    this.getDataList();
    this.getQualificationCategory();
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