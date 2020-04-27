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
          clearable
          v-model="search.title"
          placeholder="请输入博客名称"
          size="mini"
          style="width:15%;margin-left:5px;"
          @keyup.enter.native="findData"
        ></el-input>
        <el-input
          clearable
          v-model="search.tags"
          placeholder="请输入文章标签"
          size="mini"
          style="width:15%;margin-left:5px;"
          @keyup.enter.native="findData"
        ></el-input>
        <el-select
          v-model="search.type"
          size="mini"
          style="width:15%;margin-left:5px;"
          clearable
          placeholder="请选择博客类型"
          @keyup.enter.native="findData"
        >
          <el-option
            v-for="item in articleType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="search.modality"
          size="mini"
          style="width:15%;margin-left:5px;"
          clearable
          placeholder="请选择发送形式"
          @keyup.enter.native="findData"
        >
          <el-option
            v-for="item in modalityType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          style="width:20%;margin-left:5px;"
          value-format="timestamp"
          size="mini"
          v-model="search.create_time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
      <el-tabs v-model="search.status" @tab-click="handleClick" type="border-card">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.value"
        >
          <el-table
            :data="dataList.list"
            stripe
            border
            style="width:100%"
            v-loading="loading"
            class="user-table"
          >
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="pics" label="封面图" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.pics" class="avatar" />
                <p>{{scope.row.author}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="tags" label="文章标签" align="center">
              <template slot-scope="scope">
                <p v-for="(item,index) in scope.row.tags" :key="index" style="margin-bottom:5px;">
                  <el-tag :type="index+1 | getColor" size="small">{{item}}</el-tag>
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="文章类型" align="center">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  :type="scope.row.type | getColor"
                >{{scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="modality" label="发布形式" align="center">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  :type="scope.row.modality | getColor"
                >{{scope.row.modality | getArticleModality}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="view" label="查看次数" align="center"></el-table-column>
            <el-table-column prop="praise" label="点赞次数" align="center"></el-table-column>
            <el-table-column prop="create_time" label="添加时间" align="center"></el-table-column>
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
        </el-tab-pane>
      </el-tabs>
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
        title="修改博客文章"
        :visible.sync="openArticleDialog"
        v-loading="loading"
        top="30px"
        width="60%"
        :before-close="beforeCloseArticleDialog"
        @close="closeArticleDialog()"
      >
        <div>
          <el-form label-position="right" label-width="120px" :model="form">
            <el-form-item label="文章标题" prop="title">
              <el-input
                v-model="form.title"
                size="mini"
                placeholder="请填写博客文章标题"
                suffix-icon="iconfont iconyonghu3"
              ></el-input>
            </el-form-item>
            <el-form-item label="文章封面" prop="pics">
              <el-upload
                class="avatar-uploader"
                :action="`${axios.defaults.baseURL}/upload/uploadFile/upload/upload_article_pics`"
                :show-file-list="false"
                :on-success="uploadSuccess1"
                :before-upload="beforeUpload1"
              >
                <img v-if="form.pics" :src="form.pics" class="avatar-upload" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="文章简介" prop="about">
              <el-input
                type="textarea"
                :row="2"
                placeholder="请填写文章相关简单介绍信息"
                v-model="form.about"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="info">
              <editor v-model="form.info" :isClear="isClear"></editor>
            </el-form-item>
            <el-form-item label="文章标签" prop="tags">
              <el-tag
                :key="index"
                v-for="(tag,index) in form.tags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag iconfont iconicon-test"
                size="small"
                @click="inputTag"
              >标签</el-button>
            </el-form-item>
            <el-form-item label="文章类型" prop="type">
              <el-select v-model="form.type" size="mini" clearable placeholder="请选择文章类型">
                <el-option
                  v-for="item in articleType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布形式" prop="modality">
              <el-radio-group v-model="form.modality">
                <el-radio
                  v-for="(item,index) in modalityType"
                  :key="index"
                  :label="item.value"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer btn">
          <el-button
            class="iconfont iconcaogao1"
            size="mini"
            type="warning"
            @click="editArticle('2')"
          >保存草稿</el-button>
          <el-button
            class="iconfont iconqueding3"
            size="mini"
            type="success"
            @click="editArticle('3')"
          >确定修改</el-button>
          <el-button class="iconfont iconquxiao" size="mini" @click="openArticleDialog = false">取 消</el-button>
        </span>
      </el-dialog>
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
      pickerOptions: {
        //快捷键
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
      tabList: [
        { label: "已发布", value: "3" },
        { label: "草稿箱", value: "2" },
        { label: "审核中", value: "1" },
        { label: "全部", value: "0" }
      ],
      dataList: [],
      articleType: [],
      modalityType: [],
      search: {
        page: 1,
        limit: 10,
        status: "3",
        title: "",
        tags: "",
        type: "",
        modality: "",
        create_time: []
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
      openArticleDialog: false,
      inputVisible: false,
      inputValue: ""
    };
  },
  watch: {},
  methods: {
    handleClick(tab) {
      this.search.status = tab.name;
      this.search.page = 1;
      this.getDataList();
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
    //返回
    reset() {
      this.$func.setDefaultData(this.search);
      this.search.status = "3";
      this.getDataList();
      this.isShow = false;
    },
    beforeCloseArticleDialog(done) {
      this.$confirm("确定要关闭吗？").then(_ => {
        done();
      });
    },
    //关闭dialog
    closeArticleDialog() {
      this.$func.setDefaultData(this.form);
    },
    //删除标签
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    //动态添加标签
    inputTag() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //查询
    findData() {
      this.search.page = 1;
      this.getDataList();
      this.isShow = true;
    },
    //上传图片前
    beforeUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //上传成功后
    uploadSuccess1(res, file, fileList) {
      res.code
        ? this.$message.error(res.data.error)
        : (this.form.pics = res.data.img);
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getArticleList(this.search).then(res => {
        this.dataList = res.data || [];
        this.loading = false;
      });
    },

    openEditArticle(item) {
      this.form = this.$func.setAssignData(this.form, item);

      this.openArticleDialog = true;
    },
    //修改
    editArticle(status) {
      this.loading = true;
      this.form.status = status;
      this.$api.editArticleInfo(this.form).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.loading = false;
        if (res.code) return;
        this.getDataList();
        this.openArticleDialog = false;
      });
    },
    //删除
    destroy(id) {
      this.$confirm("确定要删除？").then(_ => {
        this.$api.deleteArticle({ id: id }).then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          this.getDataList();
        });
      });
    },
    //文章类型
    getArticleType() {
      this.$api.getArticleType().then(res => {
        this.articleType = res.data.list;
      });
    },
    //文章发布形式
    getArticleModality() {
      this.$api.getArticleModality().then(res => {
        this.modalityType = res.data.list;
      });
    }
  },
  created() {
    this.getArticleType();
    this.getArticleModality();
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
}
</style>