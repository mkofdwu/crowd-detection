import firebase from 'firebase';

export default {
  async uploadFile(file, prefix) {
    const uploadTask = firebase
      .storage()
      .ref(prefix + '/' + file.name)
      .put(file);
    return (await uploadTask).downloadURL;
  }
};
