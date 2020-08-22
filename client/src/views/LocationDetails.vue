<template>
  <div class="location-details-page">
    <img :src="location.photo" class="location-photo" />
    <div class="location-fields">
      <h1 class="title">{{ locationName }}</h1>
      <span class="field-name">Estimated Crowd Size</span>
      <span class="field-value">{{ location.crowdSize }}</span>
      <span class="field-name">Location</span>
      <span class="field-value">
        Latitude: {{ location.position.lat }}, Longitude:
        {{ location.position.lng }}
      </span>
      <span class="field-name">Category</span>
      <span class="field-value">{{ location.category }}</span>
      <span class="field-name">Uploaded on</span>
      <span class="field-value">{{ formattedTimestamp }}</span>
    </div>
  </div>
</template>

<script>
import ReverseGeocodingService from '@/services/ReverseGeocodingService';
import { formatTimestamp } from '@/utils';

export default {
  props: {
    location: Object
  },
  data() {
    return {
      locationName: ''
    };
  },
  async created() {
    this.locationName = await ReverseGeocodingService.getPositionName(
      this.location.position
    );
  },
  computed: {
    formattedTimestamp() {
      return formatTimestamp(this.location.timestamp);
    }
  }
};
</script>

<style scoped>
.location-photo {
  width: 40%;
  height: 100vh;
  object-fit: cover;
}

.title {
  font-size: 56px;
  font-family: 'Open Sans';
  margin-bottom: 70px;
}

.location-fields {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translateY(-50%);
  width: 400px;
  display: flex;
  flex-direction: column;
}

.field-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 14px;
}

.field-value {
  margin-bottom: 34px;
  font-size: 20px;
}

.let-us-know-btn {
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #2e2e2e;
  color: white;
  font-size: 16px;
  text-align: start;
  padding-left: 15px;
}

.category-select {
  height: 40px;
}

.submit-btn {
  position: absolute;
  right: 120px;
  bottom: 120px;
  cursor: pointer;
}
</style>
