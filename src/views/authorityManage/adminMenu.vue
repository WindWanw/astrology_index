<template>
  <div class="user-list">
    <div class="table_title">
      <div>
        <el-button
          title="添加菜单"
          type="success"
          class="iconfont icontianjia"
          size="mini"
          @click="openJsonDialog=true"
        >导入route-asy.js</el-button>
      </div>
    </div>
    <div class="content admin-menu">
      <div class="menu menu-list">
        <el-tree
          :data="menuList"
          :props="defaultProps"
          accordion
          show-checkbox
          :highlight-current="true"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="menu menu-form">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-position="left"
          label-width="120px"
          size="mini"
        >
          <el-form-item label="父级菜单">
            <el-select v-model="form.pid" placeholder="请选择目录" prop="pid">
              <el-option
                v-for="(item,index) in menuIdList"
                :key="index"
                :label="item.title"
                :value="item.id"
              >
                <span style="float: left">{{ item.title }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名" prop="title">
            <el-input v-model="form.title" placeholder="请填写菜单的中文名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单代码" prop="code">
            <el-input v-model="form.code" placeholder="请填写菜单的英文名称，与页面渲染菜单名相同，必须为英文"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序" prop="sort">
            <el-input v-model="form.sort" type="number" placeholder="请输入菜单序号，菜单将以从小到大排序"></el-input>
          </el-form-item>
          <el-form-item label="菜单状态" prop="status">
            <el-switch
              style="display: block"
              v-model="form.status"
              active-value="1"
              inactive-value="0"
              active-color="#00FF00"
              inactive-color="#FF0000"
              active-text="启用"
              inactive-text="禁止"
            ></el-switch>
          </el-form-item>
          <el-form-item label="菜单操作" prop="is_action">
            <el-radio v-model="form.is_action" label="0">不存在</el-radio>
            <el-radio v-model="form.is_action" label="1">存在</el-radio>
          </el-form-item>
          <el-form-item v-if="form.is_action==1">
            <div class="action">
              <span v-for="(item,index) in form.action" :key="index">
                <el-col :span="1">
                  <i class="iconfont icontianjia2" @click="addAction(index)"></i>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="item.title" placeholder="请输入操作名称"></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="item.router" placeholder="请输入操作路由地址"></el-input>
                </el-col>
                <el-col :span="1">
                  <i class="iconfont iconshanchu" @click="delAction(index)"></i>
                </el-col>
              </span>
            </div>
          </el-form-item>

          <el-form-item size="large">
            <el-button
              size="mini"
              class="iconfont"
              :class="form.id ? ' iconbianji' : ' iconiconfontzhizuobiaozhunbduan20'"
              :type="form.id ? 'primary' : 'success'"
              @click="onSubmit(form.id)"
            >{{form.id ? '修改' : '提交'}}</el-button>
            <el-button
              size="mini"
              class="iconfont iconcancel1"
              type="danger"
              @click="getDefaultForm"
            >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-drawer :visible.sync="openJsonDialog" direction="rtl" @close="closeDialog()" size="50%">
      <div class="el-json">
        <div>
          <el-radio-group v-model="data_type">
            <el-radio-button label="js"></el-radio-button>
            <el-radio-button label="array" disabled title="目前暂不支持"></el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <textarea class="el-json-textarea" v-model="json" placeholder="请填写正确的route-asy.js格式数据"></textarea>
        </div>
        <div class="el-button-json">
          <el-upload
            :action="`${axios.defaults.baseURL}common/get/menu/js`"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <el-button
              class="iconfont"
              :class="upLoading ? 'icondengdai' : 'iconicon_huabanfuben1'"
              title="点击上传js文件"
              size="small"
              type="success"
              :disabled="upLoading"
            >{{upLoading?'正在上传中...':'点击上传'}}</el-button>
          </el-upload>
          <el-button
            class="iconfont iconiconfontzhizuobiaozhunbduan20"
            type="primary"
            @click="addJson()"
          >确定</el-button>
          <el-button class="iconfont iconcancel1" type="warning" @click="openJsonDialog=false">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      menuList: [],
      menuIdList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入菜单代码", trigger: "blur" }]
      },
      form: {
        id: "",
        pid: 0,
        title: "",
        code: "",
        sort: "",
        status: "0",
        is_action: "0",
        action: [
          {
            title: "",
            router: ""
          }
        ]
      },
      data_type: "js",
      json: "",
      openJsonDialog: false,
      upLoading: false
    };
  },
  watch: {},
  methods: {
    //上传图片前
    beforeUpload(file) {
      this.upLoading = true;
      if (file.name.indexOf(".js") === -1) {
        this.upLoading = false;
        return this.$message.warning("请上传正确的router-asy.js文件！");
      }
    },
    //上传成功后
    uploadSuccess(res, file, fileList) {
      this.json = res.data;
      this.upLoading = false;
    },
    closeDialog() {
      this.json = "";
    },
    addJson() {
      let data = this.json;

      this.$api.getJsonMenu({ json: data }).then(res => {
        this.$message[res.code ? "error" : "success"](res.message);
        if (res.code) return;
        this.openJsonDialog = false;
        this.getDataList();
      });
    },
    handleNodeClick(data) {
      for (let i in this.form) {
        if (
          typeof data[i] == "object" &&
          data[i].length == 0 &&
          i == "action"
        ) {
          data[i] = [
            {
              title: "",
              router: ""
            }
          ];
        }
        this.form[i] = data[i];
      }
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api.getMenuList().then(res => {
        this.menuList = res.data || [];
        this.loading = false;
      });
    },
    //获取菜单id
    getMenuId() {
      this.$api.getMenuId().then(res => {
        this.menuIdList = res.data || [];
      });
    },
    //添加操作
    addAction(index) {
      console.log(index);
      this.form.action.push({
        title: "",
        router: ""
      });
    },
    //删除操作
    delAction(index) {
      console.log(index);
      let a = this.form.action;
      if (a.length == 1 && index == 0) {
        if (a[index].id) {
          a[index].title = "";
          a[index].router = "";
        } else {
          this.$func.setDefaultData(a[index]);
        }
      } else {
        a.splice(index, 1);
      }
    },
    //确定添加菜单
    onSubmit(id) {
      //如果存在操作，则操作的名称和代码不能为空
      if (this.form.is_action == "1") {
        for (let i in this.form.action) {
          console.log(this.form.action[i]);
          if (!this.form.action[i].title || !this.form.action[i].router) {
            return this.$message.error("名称和api路由不能为空");
          }
        }
      }
      this.loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api[id ? "editMenuInfo" : "addMenuInfo"](this.form).then(
            res => {
              this.$message[res.code ? "error" : "success"](res.message);
              if (res.code) return;
              this.getDataList();
              this.getMenuId();
              this.getDefaultForm();
            }
          );
        }
        this.loading = false;
      });
    },
    //将form表单初始化
    getDefaultForm() {
      this.$func.setDefaultData(this.form);
      this.form.pid = 0;
      this.form.status = "0";
      this.form.is_action = "0";
      this.form.action = [
        {
          title: "",
          router: ""
        }
      ];
    }
  },
  created() {
    this.getDataList();
    this.getMenuId();
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
.el-radio-group {
  display: flex;
  padding: 5px;
}
.el-dialog__footer {
  text-align: left;
}
.admin-menu {
  display: flex;
  justify-content: space-between;
}
.menu {
  width: 48%;
  border: 1px solid #cfcfcf;
  margin: 10px 5px;
  padding: 20px;
}
.menu-list {
  overflow-y: scroll;
  height: 600px;
}
.menu-form {
  height: 50%;
}
.icontianjia2 {
  color: #a020f0;
  cursor: pointer;
  margin: 3px 5px;
}
.iconshanchu {
  color: red;
  cursor: pointer;
  margin: 3px;
}
.action {
  overflow-y: scroll;
  height: 200px;
}
.action span {
  display: flex;
  flex-direction: row;
}
.el-json {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.el-json-textarea {
  width: 98%;
  height: 500px;
  padding: 10px;
  color: red;
  font-size: 14px;
}
.el-button-json {
  margin: 10px auto;
  display: flex;
  justify-content: flex-end;
}
</style>