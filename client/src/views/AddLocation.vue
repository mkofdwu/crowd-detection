<template>
  <div v-if="imgData" class="add-location-page">
    <img :src="imgData" class="location-photo" />
    <div class="darken-overlay"></div>
    <svg viewBox="0 0 848.5 1024" width="60%" style="display: none">
      <defs>
        <clipPath id="myClip">
          <path
            d="M848.5 0H0V1024H175.5C299.5 1024 396 827.5 383.5 718.5C371 609.5 405.786 458.926 609 408C816.5 356 824.814 149.443 848.5 0Z"
          />
        </clipPath>
      </defs>
    </svg>
    <div class="title-and-description"></div>
    <div class="location-fields">
      <h1 class="title">Add location photo</h1>
      <p class="description">
        please let us know your location, select a category and submit the photo
      </p>
      <span class="field-name">Location</span>
      <span v-if="location" class="field-value">
        Latitude: {{ location.latitude }}, Longitude: {{ location.longitude }}
      </span>
      <button v-else class="let-us-know-btn field-value" @click="askLocation">
        Let us know
      </button>
      <span class="field-name">Category</span>
      <category-select class="category-select field-value" v-model="category" />
      <span class="field-name">Timestamp</span>
      <span class="field-value">{{ formattedTimestamp }}</span>
    </div>
    <asset-icon class="submit-btn" name="next" @click="submit" />
  </div>
</template>

<script>
import { firestore } from 'firebase';

import StorageService from '@/services/StorageService';
import DatabaseService from '@/services/DatabaseService';

import AssetIcon from '@/components/AssetIcon.vue';
import CategorySelect from '@/components/CategorySelect.vue';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default {
  components: { AssetIcon, CategorySelect },
  props: {
    file: File,
    timestamp: Number
  },
  data() {
    return {
      imgData: null,
      location: null,
      category: ''
    };
  },
  computed: {
    formattedTimestamp() {
      const date = new Date(this.timestamp);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return (
        date.getDate() +
        ' ' +
        MONTHS[date.getMonth() - 1] +
        ' ' +
        date.getFullYear() +
        ', ' +
        hours +
        ':' +
        minutes +
        ' ' +
        ampm
      );
    },
    clipPathTransform() {
      return 'scale(0.5 0.5)';
      // return `scale(${window.innerWidth / 1440} ${window.innerHeight / 1024})`;
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
      // TODO: data validation
      StorageService.uploadFile(this.file, 'images', photo => {
        DatabaseService.addLocation({
          position: new firestore.GeoPoint(
            this.location.latitude,
            this.location.longitude
          ),
          photo,
          category: this.category,
          crowdSize: null,
          timestamp: new firestore.Timestamp(this.timestamp / 1000, 0) // this.timestamp is milliseconds since epoch
        }).then(() => this.$router.go(-1)); // TODO: show success modal
      });
    }
  }
};
</script>

<style scoped>
.location-photo {
  width: 40%;
  height: 100vh;
  object-fit: cover;
  /* clip-path: url(#myClip); */
}

/* .darken-overlay {
  position: absolute;
  top: 0;
  width: 40%;
  height: 100vh;
  background-color: #00000044;
} */

.title-and-description {
  position: absolute;
  left: 120px;
  top: 130px;
}

.title {
  font-size: 56px;
  font-family: 'Open Sans';
  margin-bottom: 20px;
}

.description {
  font-size: 22px;
  width: 500px;
  margin-bottom: 70px;
}

.location-fields {
  position: absolute;
  /* right: 120px; */
  /* bottom: 340px; */
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
  cursor: pointer;
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
