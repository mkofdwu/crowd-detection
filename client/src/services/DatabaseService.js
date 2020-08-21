import firebase from 'firebase';

export default {
  async getLocations() {
    const snapshot = await firebase
      .firestore()
      .collection('locations')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        position: {
          lat: data.position.latitude,
          lng: data.position.longitude
        },
        photo: data.photo,
        crowdSize: data.crowdSize,
        timestamp: data.timestamp
      };
    });
  }
};
