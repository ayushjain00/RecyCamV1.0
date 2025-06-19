# RecyCam Demo

**RecyCam** is a simple demonstration app that helps you determine whether an item can be recycled. Using your phone's camera, the app sends a snapshot to a small machine‑learning model which replies with **Recyclable** or **Non‑Recyclable**. It is built with React Native using Expo and a lightweight Python backend.

## Requirements

- **Node.js** (version 18 or newer)
- **Python** 3.8+
- **Expo Go** installed on your iOS or Android device

## Backend Setup

1. Open a terminal and navigate to the `model_backend` directory:
   ```bash
   cd model_backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate      # On Windows use venv\Scripts\activate
   ```
3. Install the backend requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask prediction server:
   ```bash
   python server.py
   ```
   The API will listen on port `5000` by default.

## Frontend Setup

1. From the project root, install the JavaScript dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm start
   ```
   A QR code will appear in the terminal.
3. Launch **Expo Go** on your phone and scan the QR code. The app will load onto your device.

### Configuring the backend URL

Edit `components/PictureView.tsx` and replace the placeholder URL so the app knows where your backend is running:

```ts
const response = await fetch("http://<your-ip>:5000/predict", {
  method: "POST",
  body: formData,
  headers: { "Content-Type": "multipart/form-data" },
});
```

## Using the App

- On first launch you will be asked for camera, microphone and media library permissions—grant them so the demo can operate.
- Press the camera button to capture a photo. After taking a picture you can upload it to the backend and view the predicted label.

Enjoy exploring this early version of **RecyCam**!
