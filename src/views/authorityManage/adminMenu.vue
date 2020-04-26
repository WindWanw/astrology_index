<template>
  <div class="user-list">
    <div class="table_title">
      <div></div>
      <div class="search_wrap">
        <el-button
          type="success"
          class="iconfont icontianjia"
          size="mini"
          style="margin-left:5px;"
        >添加</el-button>
      </div>
    </div>
    <div class="content admin-menu">
      <div class="menu menu-list">
        <el-tree :data="menuList" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
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
                <!-- <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
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
          <el-form-item label="菜单操作" prop="isAction">
            <el-radio v-model="form.isAction" label="0">不存在</el-radio>
            <el-radio v-model="form.isAction" label="1">存在</el-radio>
          </el-form-item>
          <el-form-item v-if="form.isAction=='1'">
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
              class="iconfont iconiconfontzhizuobiaozhunbduan20"
              type="primary"
              @click="onSubmit"
            >确定</el-button>
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
        pid: 0,
        title: "",
        code: "",
        sort: "",
        status: 0,
        isAction: "0",
        action: [
          {
            title: "",
            router: ""
          }
        ]
      }
    };
  },
  watch: {},
  methods: {
    handleNodeClick(data) {
      console.log(data);
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
        this.$func.setDefaultData(a[index]);
      } else {
        a.splice(index, 1);
      }
    },
    //确定添加菜单
    onSubmit() {
      this.loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.addMenuInfo(this.form).then(res => {
            this.$message[res.code ? "error" : "success"](res.message);
            this.getDataList();
            this.getMenuId();
            this.getDefaultForm();
          });
        }
        this.loading = false;
      });
    },
    //将form表单初始化
    getDefaultForm() {
      this.$func.setDefaultData(this.form);
      this.form.pid = 0;
      this.form.status = 0;
      this.form.isAction = "0";
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
</style>