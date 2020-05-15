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
          style="width:200px"
          clearable
          v-model="search.title"
          placeholder="请输入标题"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          class="search_warp_default"
          v-model="search.project_type"
          clearable
          placeholder="请选择项目类别"
          size="mini"
        >
          <el-option
            v-for="item in certificateTypeList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-cascader
          class="search_warp_default"
          :options="citys"
          clearable
          filterable
          v-model="search.city"
          placeholder="请选择证书省市"
          size="mini"
        ></el-cascader>
        <el-select
          class="search_warp_default"
          v-model="search.review_status"
          size="mini"
          clearable
          placeholder="请选择复核状态"
        >
          <el-option
            v-for="item in registrationList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="search.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="mini"
        ></el-date-picker>

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
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

        <el-table-column prop="address" label="地区" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="unit" label="中标单位" align="center"></el-table-column>
        <el-table-column prop="winning_at" label="中标时间" align="center"></el-table-column>
        <el-table-column prop="created_at" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="status" label="复核状态" align="center">
          <template slot-scope="scope">{{scope.row.status=='1' ? '是' : '否'}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="浏览"
              type="primary"
              size="medium"
              class="iconfont iconliulan"
              @click="openAddEdit('edit',scope.row)"
            >浏览/复核</el-button>
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
        :visible.sync="openAddEditDialog"
        v-loading="loading"
        top="50px"
        width="50%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
        center
      >
        <div>
          <el-form ref="form" :rules="rules" :model="form">
            <div class="el-tender-content">
              <div class="el-tender-content-center">
                <div class="el-tender-top">
                  <div class="el-tender-title">{{form.title}}</div>
                  <div class="el-tender-time">{{'['+form.created_at+']'}}</div>
                </div>
                <div class="el-tender-center">
                  <div class="el-tender-one">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tr align="center">
                        <td>中标单位</td>
                        <td>
                          <el-input v-model="form.unit" placeholder="请输入中标单位"></el-input>
                        </td>
                        <td>中标时间</td>
                        <td>
                          <el-date-picker v-model="form.winning_at" type="date" placeholder="选择中标时间"></el-date-picker>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="el-tender-three">
                    <div class="el-tender-three-title">公告正文:</div>
                    <div class="el-tender-three-content">
                      <editor v-model="form.announcement" :isClear="isClear" placeholder="请填写公告正文"></editor>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont iconiconfontzhizuobiaozhunbduan20"
            size="mini"
            type="primary"
            @click="addEdit()"
          >确 定</el-button>
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
import editor from "@/components/editor";
import province from "@/config/province";

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      loading: false,
      isShow: false,
      isClear: false,
      openAddEditDialog: false,
      dataList: [],
      citys: province,
      search: {
        page: 1,
        limit: 10,
        title: "",
        project_type: "",
        city: [],
        review_status: "",
        time: []
      },
      form: {
        id: "",
        title: "[彭泽县]马当镇集镇改造工程（二标段）(网)",
        created_at: "2020-05-13",
        over_at: "",
        user: "",
        name: "",
        phone: "",
        proxy: "",
        proxy_user: "",
        proxy_phone: "",
        tender_claim: "",
        announcement: ""
      },
      rules: {},
      certificateTypeList: [],
      professionalList: [],
      professionalList1: [],
      registrationList: [],
      certificateUtilityList: [],
      salaryList: []
    };
  },
  components: { editor },
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getRecruitmentsList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
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
.el-tender-content {
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}
.el-tender-content-center {
  width: 90%;
  height: 100%;
  /* border: 1px solid black; */
  margin: 0 auto;
}
.el-tender-top {
  width: 90%;
  margin: 0 auto;
}
.el-tender-title {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 5px 0;
  /* border: 1px solid red; */
}
.el-tender-time {
  width: 100%;
  height: 25px;
  text-align: center;
  font: 12px;
  color: grey;
  padding: 5px 0 20px 0;
  /* border: 1px solid green; */
}
.el-tender-center {
  width: 90%;
  margin: 10px auto;
  /* border: 1px solid red; */
}
.el-tender-one {
  width: 100%;
  margin: 10px;
}
.el-tender-one table {
  width: 98%;
}
tr {
  margin: 5px;
  padding: 5px;
}
td {
  padding: 10px;
}
.el-tender-three {
  width: 98%;
  margin: 20px 10px 10px;
  /* border: 1px solid red; */
}
.el-tender-three-title {
  margin-top: 10px;
  padding: 5px;
  font-size: 14px;
}
.el-tender-three-content {
  padding: 5px;
}
.el-tender-three textarea {
  height: 400px;
}
textarea {
  width: 100%;
  padding: 10px;
  font-size: 15px;
}
</style>