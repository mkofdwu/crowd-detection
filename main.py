import os
import cv2
import json
import tqdm
import numpy as np
import tensorflow as tf

from tensorflow.keras.layers import *
from tensorflow.keras.layers.experimental.preprocessing import Normalization
from tensorflow.keras.models import Model
from tensorflow.keras.applications import Xception
from tensorflow.keras.callbacks import ModelCheckpoint

# 3 classes
# Sparse [0, 20]
# Moderately Crowded [21, 50]
# Extremely Crowded [50, infinity)
num_classes = 3

# Loading data
x_data, y_data = [[] for x in range(num_classes)], [[] for y in range(num_classes)]
for image in tqdm.tqdm(os.listdir("images")):
    img = cv2.imread(f"images/{image}")  # Convert to grayscale
    img = cv2.resize(img, (240, 135))
    img = img.astype(np.float32)
    # img = np.expand_dims(img, axis=2)

    data = json.load(open("jsons/" + image.replace(".jpg", ".json"), "r"))
    if data["human_num"] < 20:
        x_data[0].append(img)
        y_data[0].append(np.array([1, 0, 0]))
    elif 21 < data["human_num"] < 50:
        x_data[1].append(img)
        y_data[1].append(np.array([0, 1, 0]))
    else:
        x_data[2].append(img)
        y_data[2].append(np.array([0, 0, 1]))


# Prevent biases
smallest = min(len(y_data[0]), len(y_data[1]), len(y_data[2]))
print([len(y_data[0]), len(y_data[1]), len(y_data[2])])

x_data = x_data[0][:smallest] + x_data[1][:smallest] + x_data[2][:smallest]
y_data = y_data[0][:smallest] + y_data[1][:smallest] + y_data[2][:smallest]

x_data = np.array(x_data)
y_data = np.array(y_data)

np.save("x.npy", x_data)
np.save("y.npy", y_data)

x_data = np.load("x.npy")
y_data = np.load("y.npy")

base_model = Xception(
    weights='imagenet',  # Load weights pre-trained on ImageNet.
    input_shape=(135, 240, 3),
    include_top=False)  # Do not include the ImageNet classifier at the top.
base_model.trainable = False

inputs = Input(shape=(135, 240, 3))

norm_layer = Normalization()
mean = np.array([127.5] * 3)
var = mean ** 2
x = norm_layer(inputs)
norm_layer.set_weights([mean, var])

x = base_model(x, training=False)
x = GlobalAveragePooling2D()(x)
outputs = Dense(num_classes)(x)

model = Model(inputs, outputs)
model.compile(optimizer="adagrad", loss="categorical_crossentropy", metrics=["accuracy"])
model.summary()

checkpoint = ModelCheckpoint(
    filepath="models",
    save_weights_only=True,
    monitor='val_acc',
    mode='max',
    save_freq='epoch',
    save_best_only=False
)

for i in range(10):
    np.random.shuffle(x_data)
    np.random.shuffle(y_data)

    base_model.trainable = False
    model.compile(optimizer="adagrad", loss="categorical_crossentropy", metrics=["accuracy"])

    model.fit(x_data, y_data, epochs=3, validation_split=0.2, batch_size=32, callbacks=[checkpoint])

    base_model.trainable = True
    model.compile(optimizer="adagrad", loss="categorical_crossentropy", metrics=["accuracy"])

    model.fit(x_data, y_data, epochs=1, validation_split=0.2, batch_size=32, callbacks=[checkpoint])

    # Convert the model.
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    tflite_model = converter.convert()

    # Save the TF Lite model.
    with tf.io.gfile.GFile('model.tflite', 'wb') as f:
        f.write(tflite_model)
