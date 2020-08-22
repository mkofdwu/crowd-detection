<template>
  <img class="icon" :src="icon" @click="$emit('click')" />
</template>

<script>
export default {
  props: {
    name: String
  },
  computed: {
    icon() {
      return require(`@/assets/icons/${this.name}.png`);
    }
  }
};
</script>

<style scoped></style>
