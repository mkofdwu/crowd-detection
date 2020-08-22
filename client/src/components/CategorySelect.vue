<template>
  <select type="text" class="category-select" v-model="selectedCategory">
    <option
      class="category-option"
      v-for="category in CATEGORIES"
      :key="category"
      :value="category"
    >
      {{ category }}
    </option>
  </select>
</template>

<script>
import { CATEGORIES } from '@/constants';

export default {
  props: {
    value: String
  },
  data() {
    return {
      CATEGORIES
    };
  },
  computed: {
    selectedCategory: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
};
</script>

<style scoped>
.category-select {
  height: 30px;
  border: none;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.category-select:focus {
  outline: none;
  background-color: #e0e0e0;
}

.category-option {
  background-color: white;
}

.category-option:checked,
.category-option:hover {
  box-shadow: 0 0 10px 100px red inset;
}
</style>
