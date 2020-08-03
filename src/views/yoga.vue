<template>
  <div class="yoga">
    <div class="center">
      <div class="header">
        <el-button class="btn" size="mini" type="primary" @click="add">添加</el-button>
        <el-button class="btn" size="mini" type="success" @click="sure">提交</el-button>
      </div>
      <div class="top">
        <el-input id="title" v-model="form.title" placeholder="请输入标题"></el-input>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" label-position="right">
          <div class="yoga-module" v-for="(item,index) in form.content" :key="index">
            <div class="del">
              <i class="iconfont iconshanchu2" @click="del(index)"></i>
            </div>
            <div class="yoga-form">
              <el-form-item label="上课时间">
                <el-time-picker
                  is-range
                  v-model="item.time"
                  size="mini"
                  clearable
                  value-format="HH:mm"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                ></el-time-picker>
              </el-form-item>
              <el-form-item label="星期一">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.one.title"
                    :style="'color:'+item.one.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.one.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.one.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期二">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.two.title"
                    :style="'color:'+item.two.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.two.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.two.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期三">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.three.title"
                    :style="'color:'+item.three.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.three.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.three.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期四">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.four.title"
                    :style="'color:'+item.four.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.four.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.four.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期五">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.five.title"
                    :style="'color:'+item.five.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.five.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.five.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期六">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.six.title"
                    :style="'color:'+item.six.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.six.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.six.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="星期日">
                <el-col :span="8">
                  <input
                    class="yoga-input"
                    v-model="item.seven.title"
                    :style="'color:'+item.seven.color"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="item.seven.color" clearable placeholder="请选择颜色" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-radio-group v-model="item.seven.icon" size="mini">
                    <el-radio-button label>无</el-radio-button>
                    <el-radio-button label="star">☆五角星</el-radio-button>
                    <el-radio-button label="heart">❤心</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "yoga",
  data() {
    return {
      options: [
        {
          label: "猩红",
          value: "Crimson",
        },
        {
          label: "深粉色",
          value: "DeepPink",
        },
        {
          label: "紫红色",
          value: "Fuchsia",
        },
        {
          label: "紫色",
          value: "Purple",
        },
        {
          label: "纯蓝",
          value: "Blue",
        },
        {
          label: "道奇蓝",
          value: "DoderBlue",
        },
        {
          label: "纯绿",
          value: "Green",
        },
        {
          label: "纯红",
          value: "Red",
        },
      ],
      form: {
        title: "禅·瑜伽",
        content: [
          {
            time: "",
            one: {
              title: "",
              color: "",
              icon: "",
            },
            two: {
              title: "",
              color: "",
              icon: "",
            },
            three: {
              title: "",
              color: "",
              icon: "",
            },
            four: {
              title: "",
              color: "",
              icon: "",
            },
            five: {
              title: "",
              color: "",
              icon: "",
            },
            six: {
              title: "",
              color: "",
              icon: "",
            },
            seven: {
              title: "",
              color: "",
              icon: "",
            },
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    add(i) {
      this.form.content.splice(i + 1, 0, {
        time: "",
        one: {
          title: "",
          color: "",
          icon: "",
        },
        two: {
          title: "",
          color: "",
          icon: "",
        },
        three: {
          title: "",
          color: "",
          icon: "",
        },
        four: {
          title: "",
          color: "",
          icon: "",
        },
        five: {
          title: "",
          color: "",
          icon: "",
        },
        six: {
          title: "",
          color: "",
          icon: "",
        },
        seven: {
          title: "",
          color: "",
          icon: "",
        },
      });
    },
    del(i) {
      if (this.form.content && this.form.content.length > 1) {
        this.$confirm("确定要移除吗？").then((_) => {
          this.form.content.splice(i, 1);
        });
      } else {
        this.$message("最后一个，无法删除！");
      }
    },
    sure() {
      // console.log(this.form);return ;
      this.$api.yoga(this.form).then((res) => {
        if (res.code) return this.$error(res.data.message);

        this.$confirm(res.data.message).then((_) => {
          window.open("http://www.ast.gold/h5/yoga?id=" + res.data.id);
        });
      });
    },
  },
  created() {},
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
.yoga {
  width: 100%;
  height: 100%;
}
.center {
  width: 70%;
  margin: 50px auto;
  background-color: floralwhite;
}
.header {
  padding: 50px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
}
.btn {
  margin: 0 20px;
  width: 100px;
}
.top {
  margin: 20px 0;
  padding: 10px;
}
#title {
  text-align: center;
}
.content {
  margin: 20px 0;
  padding: 10px;
}
.yoga-module {
  margin: 0 0 10px 0;
  padding: 10px;
  border: 1px solid gray;
}
/* .yoga-form {
  margin: 5px;
  border: 1px solid gold;
} */
.yoga-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  line-height: 28px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.del {
  display: flex;
  flex-direction: row-reverse;
}
.del i {
  cursor: pointer;
}
.del i:hover {
  color: red;
}
</style>