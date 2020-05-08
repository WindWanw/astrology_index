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
          style="width:200px;"
          v-model="search.status"
          size="mini"
          clearable
          placeholder="请选择招聘信息是否有效"
          @keyup.enter.native="findData"
        >
          <el-option key="1" label="是" value="1"></el-option>
          <el-option key="0" label="否" value="0"></el-option>
        </el-select>
        <el-select
          class="search_warp_default"
          v-model="search.top"
          size="mini"
          clearable
          placeholder="请选择是否置顶"
          @keyup.enter.native="findData"
        >
          <el-option key="1" label="是" value="1"></el-option>
          <el-option key="0" label="否" value="0"></el-option>
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
          @click="openAdd('add')"
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
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="phone" label="发布人账号" align="center">
          <template slot-scope="scope">{{scope.row.user.phone}}</template>
        </el-table-column>
        <el-table-column prop="company_name" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="professional" label="所需专业" align="center"></el-table-column>
        <el-table-column prop="info" label="发布内容" align="center"></el-table-column>
        <el-table-column prop="created_at" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="top" label="是否置顶" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.top=='0' ? 'danger' : 'success'"
            >{{scope.row.top=='1' ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否有效" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status=='0' ? 'danger' : 'success'"
            >{{scope.row.status=='1' ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              :title="scope.row.top=='0' ? '置顶该招聘信息' : '取消置顶'"
              :type="scope.row.top=='0' ? 'success' : 'danger'"
              size="medium"
              class="iconfont"
              :class="scope.row.top=='0' ? 'iconzhiding2' : 'iconxiazai-'"
              @click="setTop(scope.row)"
            >{{scope.row.top=='0' ? '置顶' :'取消'}}</el-button>
            <el-button
              title="设置"
              type="warning"
              size="medium"
              class="iconfont iconicon-test1"
              @click="openAuthInfo(scope.row)"
            >设置</el-button>
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
        :title="form.id ? '修改招聘' : '添加招聘信息'"
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
            <el-form-item label="招聘岗位" prop="recruitments_job">
              <el-input v-model="form.recruitments_job" size="mini" placeholder="请填写招聘岗位"></el-input>
            </el-form-item>
            <el-form-item label="证书类别" prop="certificate_type">
              <el-select
                v-model="form.certificate_type"
                clearable
                placeholder="请选择证书类别"
                @change="getProfessional"
              >
                <el-option
                  v-for="item in certificateTypeList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所需专业" prop="professional">
              <el-select v-model="form.professional" clearable placeholder="请选择所需专业">
                <el-option
                  v-for="item in professionalList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册情况" prop="registration_status">
              <el-radio-group v-model="form.registration_status">
                <el-radio
                  style="margin-top=5px;"
                  v-for="(item,index) in registrationList"
                  :key="index"
                  :label="item.key"
                >{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证书用途" prop="certificate_utility">
              <el-radio-group v-model="form.certificate_utility">
                <el-radio
                  style="margin-top=5px;"
                  v-for="(item,index) in certificateUtilityList"
                  :key="index"
                  :label="item.key"
                >{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证书省市" prop="city">
              <el-cascader
                :options="citys"
                clearable
                filterable
                v-model="form.city"
                placeholder="请选择证书省市"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="企业名称" prop="company_name">
              <el-input v-model="form.company_name" size="mini" placeholder="请填写企业名称"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="form.phone" size="mini" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="薪资范畴" prop="salary_category">
              <el-select v-model="form.salary_category" clearable placeholder="请选择薪资范畴">
                <el-option
                  v-for="item in salaryList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否面议" prop="negotiable">
              <el-switch
                style="display: block"
                v-model="form.negotiable"
                active-value="1"
                inactive-value="0"
                active-color="#00FF00"
                inactive-color="#FF0000"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否上线" prop="status">
              <el-switch
                style="display: block"
                v-model="form.status"
                active-value="1"
                inactive-value="0"
                active-color="#00FF00"
                inactive-color="#FF0000"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否置顶" prop="top">
              <el-switch
                style="display: block"
                v-model="form.top"
                active-value="1"
                inactive-value="0"
                active-color="#00FF00"
                inactive-color="#FF0000"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
            <el-form-item label="备注信息" prop="info">
              <el-input
                type="textarea"
                placeholder="请填写备注信息"
                v-model="form.info"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
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
        status: "",
        top: ""
      },
      form: {
        id: "",
        recruitments_job: "",
        certificate_type: "",
        professional: "",
        registration_status: 1,
        certificate_utility: 1,
        city: [],
        company_name: "",
        phone: "",
        salary_category: "",
        negotiable: "0",
        status: "1",
        top: "0",
        info: ""
      },
      rules: {
        recruitments_job: [
          { required: true, message: "请填写招聘岗位", trigger: "blur" }
        ],
        certificate_type: [
          { required: true, message: "请选择证书类别", trigger: "change" }
        ],
        professional: [
          { required: true, message: "请选择所需专业", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择证书省市", trigger: "change" }
        ],
        company_name: [
          { required: true, message: "请填写企业名称", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请填写招聘岗位", trigger: "blur" }],
        salary_category: [
          { required: true, message: "请选择薪资范畴", trigger: "change" }
        ],
        info: [{ required: true, message: "请填写备注信息", trigger: "blur" }]
      },
      certificateTypeList: [],
      professionalList: [],
      registrationList: [],
      certificateUtilityList: [],
      salaryList: []
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
    //获取所有配置数据
    getAllConfig() {
      this.$api.getAllConfig().then(res => {
        this.certificateTypeList = res.data.certificate_category || [];
        this.registrationList = res.data.registration_status || [];
        this.certificateUtilityList = res.data.certificate_utility || [];
        this.salaryList = res.data.salary_category || [];
      });
    },
    //根据证书类别获取所有专业
    getProfessional(value) {
      this.certificateTypeList.forEach(item => {
        if (item.value == value) {
          this.professionalList = item.children || [];
        }
      });
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getRecruitmentsList(this.search).then(res => {
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
          type: "recruitments",
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
    openAdd(type, data) {
      this.openAddEditDialog = true;
      if (type == "add") {
        this.$func.setDefaultData(this.form);
        this.form.registration_status = 1;
        this.form.certificate_utility = 1;
        this.form.negotiable = "0";
        this.form.status = "1";
        this.form.top = "0";
      }
      console.log(this.form);
      this.getAllConfig();
    },
    addEdit() {
      this.loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api[this.form.id ? "editRecruitments" : "addRecruitments"](
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
.el-radio-group[data-v-4687dc57] {
  margin: 4px 0;
}
</style>