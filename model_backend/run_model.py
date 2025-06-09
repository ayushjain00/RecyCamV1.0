from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import pyheif

# Function to convert image to PNG if necessary
def convert_to_png(img_path):
    if img_path.lower().endswith('.heic'):
        heif_file = pyheif.read(img_path)
        img = Image.frombytes(
            heif_file.mode,
            heif_file.size,
            heif_file.data,
            "raw",
            heif_file.mode,
            heif_file.stride,
        )
        img = img.convert("RGB")
    else:
        img = Image.open(img_path)

    if not img_path.lower().endswith('.png'):
        png_path = img_path.rsplit('.', 1)[0] + '.png'
        img.save(png_path, 'PNG')
        return png_path
    return img_path

# Function to load and preprocess image
def load_and_preprocess_image(img_path):
    img = Image.open(img_path)
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale the image
    return img_array

# Function to make predictions
def predict_image_class(model, img_path):
    img_path = convert_to_png(img_path)
    img_array = load_and_preprocess_image(img_path)
    prediction = model.predict(img_array)
    return "Recyclable" if prediction[0][0] > 0.5 else "Non-Recyclable"