# server.py
from flask import Flask, request, jsonify
from run_model import predict_image_class  # Import your model function

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img_path = '/Users/rohanchawla/Desktop/temp_images/image.png'  # Save the uploaded image temporarily
    file.save(img_path)
    result = predict_image_class(img_path)
    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
