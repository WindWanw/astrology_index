<template>
  <div class="cover-picture">
    <img :src="url" :style="styles" @click="view()" />
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
      type: String,
      default: "",
      reuqire: true
    },
    styles: {
      type: Object,
      default: () => {
        return { width: "60px", height: "60px" };
      }
    }
  },
  methods: {
    view() {
      
    }
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
