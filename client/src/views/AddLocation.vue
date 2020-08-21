<template>
  <div v-if="imgData" class="add-location-page">
    <img :src="imgData" class="location-photo" />
    <svg width="0" height="0">
      <defs>
        <clipPath id="myClip" viewBox="0 0 991 780" width="60vh" height="100vh">
          <path
            d="M991 0H0V780C0 780 208.406 748.5 252.757 649.5C297.109 550.5 454.677 399.1 661.461 373.5C868.246 347.9 967.314 113.833 991 0Z"
          />
        </clipPath>
      </defs>
    </svg>
    <div class="title-and-description">
      <h1 class="title">Add location photo</h1>
      <p class="description">
        please let us know your location, select a category and submit the photo
      </p>
    </div>
    <div class="location-fields">
      <span class="field-name">Location</span>
      <span v-if="location" class="field-value">
        Latitude: {{ location.latitude }}, Longitude: {{ location.longitude }}
      </span>
      <button v-else class="let-us-know-btn" @click="askLocation">
        Let us know
      </button>
      <span class="field-name">Category</span>
      <select type="text" class="category-input" v-model="category">
        <option
          v-for="category in CATEGORIES"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <span class="field-name">Timestamp</span>
      <span class="field-value">{{ formattedTimestamp }}</span>
    </div>
  </div>
</template>

<script>
import StorageService from '@/services/StorageService';
import { CATEGORIES } from '@/constants';

export default {
  props: {
    file: File,
    timestamp: Number
  },
  data() {
    return {
      imgData: null,
      location: null,
      category: '',
      CATEGORIES
    };
  },
  computed: {
    formattedTimestamp() {
      return this.timestamp;
    }
  },
  created() {
    const reader = new FileReader();
    reader.onload = e => {
      this.imgData = e.target.result;
    };
    reader.readAsDataURL(this.file);
  },
  methods: {
    askLocation() {
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          this.location = pos.coords;
        },
        err => {
          console.log(err);
        }
      );
    },
    submit() {
      StorageService.uploadFile(this.file, 'images');
    }
  }
};
</script>

<style scoped>
#myClip {
  width: 60vw;
  height: 70vh;
}

.location-photo {
  width: 991px;
  height: 780px;
  object-fit: cover;
  clip-path: url(#myClip);
}

.title-and-description {
  position: absolute;
  left: 120px;
  top: 130px;
}

.title {
  font-size: 64px;
  font-family: 'Open Sans';
  margin-bottom: 20px;
}

.description {
  font-size: 24px;
  width: 500px;
}

.location-fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.field-name {
}
</style>
