<template>
  <div v-if="loaded" class="map-page">
    <!-- <GmapMap
      class="map"
      map-type-id="terrain"
      :center="{ lat: 1.3521, lng: 103.8198 }"
      :zoom="10"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      @idle="removeInfoWindowCloseBtn"
    >
      <GmapInfoWindow
        v-for="location in filteredLocations"
        :key="location.id"
        :position="location.position"
        :zIndex="0"
      >
        <span
          :style="{
            color: getDensityColor(location.crowdSize),
            fontWeight: 'bold'
          }"
          @click="selectedLocation = location"
        >
          {{ location.crowdSize || '?' }}
        </span>
      </GmapInfoWindow>
      <GmapInfoWindow
        v-if="selectedLocation"
        :position="selectedLocation.position"
        :zIndex="1"
        @closeclick="selectedLocation = null"
      >
        <div
          class="location-preview-container"
          @click="
            $router.push({
              name: 'location-details',
              params: { location: selectedLocation }
            })
          "
        >
          <img class="location-photo" :src="selectedLocation.photo" />
          <div class="location-photo-gradient"></div>
          <span v-if="selectedLocation.crowdSize" class="location-crowd-size">
            Around {{ selectedLocation.crowdSize }} people
          </span>
        </div>
      </GmapInfoWindow>
      <GmapMarker
        v-if="currentPosition"
        :position="currentPosition"
        :clickable="false"
        :zIndex="10"
      />
    </GmapMap> -->
    <div
      style="width: 100vw; height: 100vh; display: grid; place-items: center; background-color: #eeeeee;"
    >
      I've removed google maps billing so this no longer works
    </div>

    <category-filter-button v-model="categoryFilter" />
    <label class="file-upload-container">
      <input
        class="file-input"
        type="file"
        accept="image/*"
        capture="camera"
        @change="onSelectPhoto"
      />
      <div class="add-photo-camera icon-btn">
        <asset-icon name="camera" />
      </div>
    </label>
    <label class="file-upload-container">
      <input
        class="file-input"
        type="file"
        accept="image/*"
        @change="onSelectPhoto"
      />
      <div class="add-photo-gallery icon-btn">
        <asset-icon name="gallery" />
      </div>
    </label>
  </div>
  <loader v-else class="loader" />
</template>

<script>
import DatabaseService from '@/services/DatabaseService';

import Loader from '@/components/Loader.vue';
import AssetIcon from '@/components/AssetIcon.vue';
import CategoryFilterButton from '@/components/CategoryFilterButton.vue';

export default {
  components: { Loader, AssetIcon, CategoryFilterButton },
  data() {
    return {
      locations: [],
      loaded: false,
      selectedLocation: null,
      categoryFilter: '',
      currentPosition: null
    };
  },
  computed: {
    filteredLocations() {
      if (!this.categoryFilter) return this.locations;
      return this.locations.filter(
        location => location.category === this.categoryFilter
      );
    }
  },
  async created() {
    this.locations.push(...(await DatabaseService.getLocations()));
    this.loaded = true;

    // TODO: modal to ask for current location
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.currentPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        console.log(this.currentPosition);
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    // utils
    getDensityColor(crowdSize) {
      if (crowdSize < 10) {
        return '#FFE600';
      }
      if (crowdSize < 50) {
        return '#FF9900';
      }
      if (crowdSize < 100) {
        return '#FF6B00';
      }
      return '#FF0000';
    },

    // methods called
    onSelectPhoto(e) {
      if (e.target.files && e.target.files.length === 1) {
        const file = e.target.files[0];
        this.$router.push({
          name: 'add-location',
          params: { file, timestamp: Date.now() }
        });
      }
    },
    removeInfoWindowCloseBtn() {
      const infoWindowCloseBtns = document.querySelectorAll(
        'button[title="Close"]'
      );
      infoWindowCloseBtns.forEach(el => el.remove());
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}

.file-input {
  display: none;
}

.icon-btn.add-photo-camera {
  background-color: #ffffff;
  bottom: 100px;
}

.icon-btn.add-photo-gallery {
  background-color: #2e2e2e;
  bottom: 30px;
}

.location-preview-container {
  position: relative;
  cursor: pointer;
}

.location-photo {
  width: 200px;
}

.location-photo-gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-image: linear-gradient(#00000000, #000000aa);
}

.location-crowd-size {
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: white;
}
</style>
