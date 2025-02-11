# Import necessary libraries for the web service, image processing, and machine learning
from flask import Flask, json, request
from tensorflow.keras.models import model_from_json
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
import cv2
import pickle
import base64
from io import BytesIO
from PIL import Image
from typing import List
from pydantic import BaseModel
import tensorflow as tf

# Initialize Flask app and enable CORS for cross-origin requests
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# model = pickle.load(open("brain_tumor_model.pkl", "rb"))
# Load the pre-trained model from a JSON file and its associated weights
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

# Load weights into new model
loaded_model.load_weights("model.h5")

# Function to decode a base64 encoded image string and convert it into an OpenCV image
def decode_base64_to_cv2_image(b64str):
    encoded_data = b64str.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

# Function to decode a base64 encoded image string and convert it into a Pillow Image object
def decode_base64_to_pil_image(b64str):
    encoded_data = b64str.split(',')[1]
    image_data = BytesIO(base64.b64decode(encoded_data))
    img = Image.open(image_data)
    return img

@app.route('/home',methods=['GET'])
def home():
    return "Hello World"

# Route to handle image processing and prediction using the trained model
@app.route("/", methods=['POST'])
def read_root():
    data = json.loads(request.data)
    predict_img = []
    for item in data['image']:
        image = decode_base64_to_cv2_image(item)
        image = cv2.resize(image,(224,224))
        predict_img.append(image)
        
    prediction = loaded_model.predict(np.array(predict_img))

    prediction_results = prediction[:, 1].tolist()

    print(f"Processed {len(data['image'])} images. Predictions: {prediction_results}")

    return {"result": prediction[:, 1].tolist()}


if __name__ == '__main__':
    app.run(port=5000)
