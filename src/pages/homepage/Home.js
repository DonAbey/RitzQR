import React, { useState, useRef } from "react";
import jsQR from "jsqr";
import "./Home.css";

const Home = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [editableCode, setEditableCode] = useState("");
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: { exact: "environment" }, // Use back camera by default
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check your permissions.");
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      const parts = code.data.split("|");
      if (parts.length > 1) {
        setEditableCode(parts[1]);
      } else {
        alert("Invalid QR Code format");
      }
    } else {
      alert("No QR Code detected");
    }

    setImagePreview(canvas.toDataURL());
  };

  const uploadQR = async () => {
    if (!imagePreview || !editableCode) {
      alert("Please take a photo and ensure the code is extracted.");
      return;
    }

    try {
      const response = await fetch(
        "https://australia-southeast2-ritzqr.cloudfunctions.net/uploadQR",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_data: imagePreview.split(",")[1], // Base64 without the prefix
            file_name: `${editableCode}.jpg`,
          }),
        }
      );

      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="container text-center">
      <h2 className="QR">QR Code Scanner</h2>
      <div className="button-container mb-3">
        <button onClick={startCamera} className="btn btn-primary">
          Start Camera
        </button>
      </div>

      <div className="video-section mb-3">
        <video ref={videoRef} style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }} />
      </div>

      <div className="button-container mb-3">
        <button onClick={takePhoto} className="btn btn-secondary">
          Take Photo
        </button>
      </div>

      {imagePreview && (
        <div className="image-preview-section text-center">
          <img
            src={imagePreview}
            alt="Captured"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
          />
          <div className="code-container mt-3">
            <label htmlFor="code-input" className="form-label">
              Code:
            </label>
            <input
              id="code-input"
              type="text"
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              className="form-control d-inline-block"
              style={{ width: "300px" }}
            />
          </div>
          <div className="button-container mt-3">
            <button onClick={uploadQR} className="btn btn-success">
              Upload QR
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default Home;
