<template>
  <div class="baidu-map">
    <div class="map-search">
      <el-input size="mini" placeholder="请输入地址查询" class="map-input" v-model="map"></el-input>
      <el-button size="mini" type="primary" class="map-button" @click="searchMap()">查询</el-button>
      <!-- <span>
        <el-input v-model.number="center.lng"></el-input>
        <el-input v-model.number="center.lat"></el-input> 
      </span> -->
    </div>
    <div>
      <baidu-map
        class="bm-view"
        ak="xGMrgnl0MGoAKhXcPzuup2685AypHzGi"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"
        @ready="handler"
      ></baidu-map>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      map: ""
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    searchMap() {
      this.center = this.map;
    },
  }
};
</script>

<style scoped>
/**地图大小 */
.bm-view {
  width: 100%;
  height: 900px;
}
.map-search {
  margin: 10px 10px;
}
.map-input {
  width: 300px;
  margin: 5px;
}
.map-button {
  margin: 5px;
}
</style>