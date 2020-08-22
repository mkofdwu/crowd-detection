<template>
  <div>
    <div
      class="filter-btn icon-btn"
      :class="{ down: expanded }"
      @click="toggleShowFilterOptions"
    >
      <asset-icon :name="expanded ? 'cancel' : 'filter'" />
    </div>
    <div v-if="expanded" class="filter-options-container">
      <h2>Filter</h2>
      <h3 class="filter-field">Category</h3>
      <category-select
        class="category-select"
        :value="value"
        @input="newValue => $emit('input', newValue)"
      />
    </div>
  </div>
</template>

<script>
import AssetIcon from './AssetIcon.vue';
import CategorySelect from './CategorySelect.vue';

export default {
  components: { AssetIcon, CategorySelect },
  props: {
    value: String
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleShowFilterOptions() {
      if (this.expanded) {
        this.$emit('input', ''); // clear the filter when closed
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }
};
</script>

<style scoped>
.filter-btn {
  top: 30px;
  background-color: white;
}

.filter-btn.down {
  transform: translateY(5px);
  border-radius: 7px 0 0 7px;
  box-shadow: none;
}

.filter-options-container {
  position: absolute;
  top: 35px;
  left: 80px;
  width: 300px;
  padding: 20px;
  padding-top: 9px;
  border-radius: 0 7px 7px 7px;
  background-color: white;

  display: flex;
  flex-direction: column;
}

.filter-options-container > h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

.filter-field {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
}
</style>
