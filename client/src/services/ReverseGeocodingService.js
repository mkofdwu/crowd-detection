import axios from 'axios';

export default {
  async getPositionName(position) {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    );
    return data.results[0].formatted_address;
  }
};
