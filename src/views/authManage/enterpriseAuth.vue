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
        <el-radio-group v-model="search.status" class="search_warp_radio">
          <el-radio :label="0">申请认证</el-radio>
          <el-radio :label="1">认证通过</el-radio>
          <el-radio :label="2">认证失败</el-radio>
        </el-radio-group>
        <el-button
          type="success"
          class="iconfont iconchakan1"
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
        <el-table-column prop="status" label="审核状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="编辑用户信息"
              type="primary"
              size="mini"
              class="iconfont iconbianji1"
              @click="openEditArticle(scope.row)"
            >编辑</el-button>
            <el-button
              title="删除用户"
              type="danger"
              size="mini"
              class="iconfont iconshanchu1"
              @click="destroy(scope.row.id)"
            >删除</el-button>
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
      qualificationList: [],
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
        title: "", //文章标题
        pics: "", //文章封面
        about: "", //简介
        info: "", //文章内容
        tags: [], //文章标签
        type: "", //文章类型
        modality: "", //文章发布类型
        status: "" //文章发布状态
      },
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
    //返回
    reset() {
      this.$func.setDefaultData(this.search);
      this.getDataList();
      this.isShow = false;
    },
    //查询
    findData() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
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

</style>