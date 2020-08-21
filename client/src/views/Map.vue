<template>
  <div v-if="loaded" class="map-page">
    <GmapMap
      class="map"
      map-type-id="terrain"
      :center="{ lat: 0, lng: 0 }"
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
    >
      <GmapInfoWindow
        v-for="location in locations"
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
          {{ location.crowdSize }}
        </span>
      </GmapInfoWindow>
      <GmapInfoWindow
        v-if="selectedLocation"
        :position="selectedLocation.position"
        :zIndex="1"
        @closeclick="selectedLocation = null"
      >
        <img class="location-photo" :src="selectedLocation.photo" />
      </GmapInfoWindow>
    </GmapMap>

    <label class="file-upload-container">
      <input
        class="file-input"
        type="file"
        accept="image/*"
        capture="camera"
        @change="onSelectPhoto"
      />
      <div class="add-photo-camera btn" @click="addPhotoCamera">
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
      <div class="add-photo-gallery btn">
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

export default {
  components: { Loader, AssetIcon },
  data() {
    return {
      locations: [],
      loaded: false,
      selectedLocation: null
    };
  },
  async mounted() {
    this.locations.push(...(await DatabaseService.getLocations()));
    console.log(this.locations[0]);
    this.loaded = true;
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
        // TODO: show modal describing / asking for permission
        this.$router.push({
          name: 'add-location',
          params: { file, timestamp: Date.now() }
        });
      }
    },
    addPhotoCamera() {}
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}

.location-photo {
  width: 200px;
}

.file-input {
  display: none;
}

.btn {
  position: absolute;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 0 20px 20px #00000099;
  transition: box-shadow 200ms, transform 200ms;

  display: grid;
  place-items: center;
}

.btn.add-photo-camera {
  background-color: #ffffff;
  bottom: 100px;
}

.btn.add-photo-gallery {
  background-color: #2e2e2e;
  bottom: 30px;
}

.btn:active {
  transform: translateY(5px);
  box-shadow: 0 10px 20px #00000099;
}
</style>
