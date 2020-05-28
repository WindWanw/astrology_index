<template>
  <div class="cover-picture">
    <img :src="url" :style="style" @click="view()" />
  </div>
</template>

<script>
export default {
  // props:['url','style'],
  data() {
    return {};
  },
  props: {
    url: {
      type: string,
      default: "",
      reuqire: true
    },
    style: {
      type: object,
      default: "{width:'60px',height:'60px'}"
    }
  },
  methods: {
    view() {}
  }
};
</script>

<style>
.cover-picture {
  width: 70px;
  height: 70px;
}
.cover-picture img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
