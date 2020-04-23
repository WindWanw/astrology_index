<template>
  <div class="home">
    <!-- 总计 -->
    <div class="total_wrap">
      <div class="title">总计</div>
      <!-- <div class="total">
        <div class="item" @click="setJump()">
          <i class="iconfont yonghu3"></i>
          <div class="item_right">
            <p>总用户数(今日注册)</p>
            <p>
              1
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item" @click="setJump()">
          <i class="iconfont yonghu5"></i>
          <div class="item_right">
            <p>总专引师数(马甲专引师)</p>
            <p>
              2
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item" @click="setJump()">
          <i class="iconfont dailishang"></i>
          <div class="item_right">
            <p>代理商数</p>
            <p>
              3
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item" @click="setJump()">
          <i class="iconfont dianpu1"></i>
          <div class="item_right">
            <p>商家数</p>
            <p>
              4
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item">
          <i class="iconfont shouru2"></i>
          <div class="item_right">
            <p>总收入金额</p>
            <p>￥5</p>
          </div>
        </div>

        <div class="item">
          <i class="iconfont qian"></i>
          <div class="item_right">
            <p>进账</p>
            <p>￥6</p>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px;" id="title2" class="title">
        <div style="color:#F59E66;">
          优惠券送出总额:
          <b>￥10</b>
        </div>
        <div class="countTable">
          <span>交易额统计</span>
          <el-select
            size="mini"
            style="width:100px;"
            @change="selectTable"
            v-model="value"
            placeholder="7天"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div id="count">
        <div class="progress-box">
          <div class="time">
            <el-tag type="success">已使用(￥10)</el-tag>
          </div>
          <div class="progress">
            <el-progress type="circle" :width="width" color="#67C23A" :percentage="percentPay"></el-progress>
          </div>
          <div class="time">
            <el-tag type="warning">未使用(￥20)</el-tag>
          </div>
          <div class="progress">
            <el-progress type="circle" :width="width" color="#F59E66" :percentage="percentUnUse"></el-progress>
          </div>
        </div>

        <div>
          <ve-line :data="chartData"></ve-line>
        </div>-->
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: "", //总计
      messageList: [],
      dataList: [],
      ptotal: "",
      pallTotal: "",
      percentDay: 0,
      percentWk: 0,
      percentPay: 0,
      percentUnUse: 0,
      width: 200,
      chartData: {
        columns: ["name", "交易额"],
        rows: []
      },
      num: 7,
      options: [
        {
          value: "12",
          label: "12个月"
        },
        {
          value: "6",
          label: "6个月"
        },
        {
          value: "30",
          label: "30天"
        },
        {
          value: "7",
          label: "7天"
        }
      ],
      value: ""
    };
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {}
};
</script>

<style scoped>
.total_wrap {
  width: 100%;
  background-color: #fff;
}
.total {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
.item {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  margin-bottom: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.item_right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.item i {
  font-size: 28px;
}
.item p:nth-child(2) {
  font-size: 24px;
  /* font-weight: bold; */
}
.item p:nth-child(2) span {
  font-size: 14px;
  margin-left: 2px;
}
.total .item:nth-child(1) {
  background-color: #00adf3;
}
.total .item:nth-child(2) {
  background-color: #70c238;
}
.total .item:nth-child(3) {
  background-color: #ff9e66;
}
.total .item:nth-child(4) {
  background-color: #ffbf34;
}
.total .item:nth-child(5) {
  background-color: #00d0e2;
}
.total .item:nth-child(6) {
  background-color: #39cffb;
}

.info {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #666;
  font-size: 14px;
  position: relative;
}
.mark {
  position: absolute;
  right: 0;
  top: 2px;
}
.progress {
  margin: 40px;
}
.progress-box {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
.progress-box .time {
  width: 100px;
}
.countTable {
  display: flex;
  justify-content: space-between;
}
#title2 {
  display: flex;
}
#title2 > div {
  flex: 1;
}
#count {
  display: flex;
}
#count > div {
  flex: 1;
}
.online {
  background-color: #fff;
  margin-top: 1px;
}
.online-user {
  border-bottom: 1px solid #eee;
  line-height: 40px;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: red;
  cursor: pointer;
}
.avatar {
  width: 100%;
  height: 70px;
  display: block;
}
.el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
}
.online-user-username {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  width: 100px;
  display: block;
}
</style>
