<template>
  <div class="modal">
    <!-- just use in error validation in adding location & success dialog -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
}
</style>
