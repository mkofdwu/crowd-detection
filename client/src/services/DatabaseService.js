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
        category: data.category,
        crowdSize: data.crowdSize,
        timestamp: data.timestamp.seconds * 1000
      };
    });
  },
  addLocation(location) {
    return firebase
      .firestore()
      .collection('locations')
      .add(location);
  }
};
