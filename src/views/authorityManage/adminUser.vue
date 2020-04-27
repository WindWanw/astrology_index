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
          v-model="search.name"
          placeholder="请输入姓名"
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
        <el-input
          class="search_warp_default"
          clearable
          v-model="search.user_phone"
          placeholder="请输入会员账号"
          size="mini"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          class="search_warp_default"
          v-model="search.examination_category"
          size="mini"
          clearable
          placeholder="请选择报考类别"
          @keyup.enter.native="findData"
        >
          <el-option
            v-for="item in examList"
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
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.sex | getColor">{{scope.row.sex | getSexStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="examination_category" label="报考类别" align="center"></el-table-column>
        <el-table-column prop="school" label="报考医院学校" align="center"></el-table-column>
        <el-table-column prop="professional" label="报考专业" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="rederees_phone" label="推荐人电话" align="center"></el-table-column>
        <el-table-column prop="userPhone" label="会员账号" align="center">
          <template slot-scope="scope">{{scope.row.user.phone}}</template>
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
      dataList: [],
      examList: [],
      search: {
        page: 1,
        limit: 10,
        name: "",
        phone: "",
        user_phone: "",
        examination_category: ""
      }
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getEducationList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //获取企业类别
    getExamCategory() {
      this.$api.getExamCategory().then(res => {
        this.examList = res.data.info || [];
      });
    }
  },
  created() {
    this.getDataList();
    this.getExamCategory();
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