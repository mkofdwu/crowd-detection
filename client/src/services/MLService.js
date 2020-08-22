// this should actually be on the firebase server but there is no time so torch.js on client is a temporary option

import * as tf from '@tensorflow/tfjs';
import modelJson from '@/assets/ml/model/model.json';

export default {
  async predictCrowdCount(img) {
    console.log(modelJson);
    const model = await tf.loadGraphModel('../assets/ml/model/model.json');
    console.log(model);
    const res = model.execute(tf.browser.fromPixels(img));
    console.log(res);
  }
};
