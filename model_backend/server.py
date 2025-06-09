# server.py
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from run_model import predict_image_class  # Import your model function
import os
import tempfile

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    suffix = os.path.splitext(file.filename)[1] or '.png'
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        file.save(tmp.name)
        img_path = tmp.name
    try:
        result = predict_image_class(model, img_path)
    finally:
        os.remove(img_path)
    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
    model_path = os.path.join(os.path.dirname(__file__), 'recyclable_non_recyclable_classifier.keras')
    model = load_model(model_path)