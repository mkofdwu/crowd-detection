import firebase from 'firebase';

export default {
  uploadFile(file, prefix, callback) {
    firebase
      .storage()
      .ref()
      .child(prefix + '/' + file.name)
      .put(file)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(downloadURL => callback(downloadURL));
      });
  }
};
