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
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="salary_category" label="薪资范畴" align="center"></el-table-column>
        <el-table-column prop="education" label="学历" align="center"></el-table-column>
        <el-table-column prop="certificate_type" label="证书类别" align="center"></el-table-column>
        <el-table-column prop="professional" label="所需专业" align="center"></el-table-column>
        <el-table-column prop="work_type" label="工作性质" align="center"></el-table-column>
        <el-table-column prop="current_state" label="目前状态" align="center"></el-table-column>
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
      search: {
        page: 1,
        limit: 10,
        user_phone: "",
        status: "",
        top: ""
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
      this.$api.getJobsList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },
    //置顶操作
    setTop(data) {
      
      let top = 1;
      if (data.top=='1') {
        top = 0;
      }
      this.$api
        .setTop({
          type: "jobs",
          id: data.id,
          top: top
        })
        .then(res => {
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