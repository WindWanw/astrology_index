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
        <el-table-column prop="user" label="招标人" align="center"></el-table-column>
        <el-table-column prop="proxy" label="招标代理机构" align="center"></el-table-column>
        <el-table-column prop="created_at" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="over_at" label="截止时间" align="center"></el-table-column>
        <el-table-column prop="countdown" label="开始倒计时" align="center"></el-table-column>
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
            >浏览</el-button>
            <el-button
              title="复核"
              type="primary"
              size="medium"
              class="iconfont icontoreview"
              @click="openAddEdit('edit',scope.row)"
            >复核</el-button>
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
        top="30px"
        width="60%"
        :before-close="beforeCloseDialog"
        @close="closeDialog()"
        center
      >
        <div>
          <el-form
            ref="form"
            :rules="rules"
            label-position="left"
            label-width="120px"
            :model="form"
          >
            <div class="el-tender-content">
              <div class="el-tender-content-center">
                <div class="el-tender-top">
                  <div class="el-tender-title">[彭泽县]马当镇集镇改造工程（二标段）(网)</div>
                  <div class="el-tender-time">[2020-05-13]</div>
                </div>
                <div class="el-tender-center">
                  <div class="el-tender-one">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tr align="center">
                        <td>发布时间</td>
                        <td>
                          <el-input></el-input>
                        </td>
                        <td>截止时间</td>
                        <td>
                          <el-input></el-input>
                        </td>
                      </tr>
                      <tr align="center">
                        <td rowspan="3">张三</td>
                        <td>语文</td>
                        <td>98</td>
                      </tr>
                      <tr align="center">
                        <td>数学</td>
                        <td>100</td>
                      </tr>
                      <tr align="center">
                        <td>英语</td>
                        <td>95</td>
                      </tr>
                      <tr align="center">
                        <td rowspan="3">李四</td>
                        <td>语文</td>
                        <td>95</td>
                      </tr>
                      <tr align="center">
                        <td>数学</td>
                        <td>98</td>
                      </tr>
                      <tr align="center">
                        <td>英语</td>
                        <td>100</td>
                      </tr>
                    </table>
                  </div>
                  <div class="el-tender-two"></div>
                  <div class="el-tender-three"></div>
                </div>
              </div>
            </div>
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
        id: ""
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
.el-tender-content {
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}
.el-tender-content-center {
  width: 90%;
  height: 100%;
  border: 1px solid black;
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
  border: 1px solid black;
}
.el-tender-one {
  width: 100%;
  margin: 10px;
}
.el-tender-one table{
    width: 98%;
}
.el-tender-two {
  width: 100%;
  margin: 10px;
}
.el-tender-three {
  width: 100%;
  margin: 10px;
}
</style>