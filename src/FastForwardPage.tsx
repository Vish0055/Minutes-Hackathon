import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FastForwardPage: React.FC = () => {
  const navigate = useNavigate(); // Use navigate hook to handle routing
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleUpload = async (type: string, data: string | File | null) => {
    if (!data) {
      alert("Please provide input data.");
      return;
    }
  
    const formData = new FormData();
  
    if (data instanceof File) {
      // Directly add the file (already a File object)
      formData.append("data", data); // Ensure the backend expects 'data'
    } else if (typeof data === 'string') {
      try {
        // Convert Base64 string to Blob (if it's a valid Base64 string)
        const blob = await (await fetch(data)).blob();
        formData.append("data", blob, "image.png"); // Use 'data' for file field
      } catch (error) {
        console.error('Error converting Base64 to Blob:', error);
        alert('Invalid Base64 data');
        return;
      }
    }
  
    // Add the search type as a regular field
    formData.append("searchType", type);
  
    // Send the request
    fetch("/api/search", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage(data.message || "Search completed");
        navigate("/shopping-cart");
      })
      .catch((err) => {
        console.error("Error during upload:", err);
        alert("An error occurred during the upload process.");
      });
  };
  
  


  // Function to start the video feed or capture an image
  const captureImageNow = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // Set the video stream to videoRef
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        // Store the stream in state for later use (to stop the video stream)
        setVideoStream(stream);
        setCameraActive(true); // Camera is now active
        console.log("Video stream started");
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    } else {
      captureSnapshot(); // Capture the image if camera is already active
    }
  };

  // Function to take a snapshot from the video feed
  const captureSnapshot = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set canvas size to match video feed dimensions
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageUrl); // Store captured image in state
        stopVideoStream(); // Stop video stream after capturing the image
        handleUpload("mealPlanner", imageUrl); // Send image to backend immediately
        console.log("Snapshot captured and uploaded");
      }
    }
  };

  // Function to stop video stream after capturing the image
  const stopVideoStream = () => {
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all video tracks
      setVideoStream(null);
      setCameraActive(false); // Set camera to inactive
      console.log("Video stream stopped");
    }
  };

  const carouselItems = [
    {
      title: "Fast Shopping Experience",
      description: "Get what you need quickly with Fast Forward.",
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Exclusive Deals",
      description: "Don't miss out on the best deals of the season!",
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
    {
      title: "Shop Smart, Shop Fast",
      description: "Fast Forward your way to convenience.",
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate("/")}>
            <ArrowLeft />
            <span className="text-blue-600 font-bold">Go Back to Home</span>
          </Button>
          <h1 className="text-2xl font-bold text-blue-600">Fast Forward</h1>
        </div>
      </header>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto mt-6 overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`min-w-full ${item.bgColor} ${item.textColor} p-12 rounded-lg flex items-center justify-between`}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl">{item.description}</p>
              </div>
              <div className="text-6xl">🚀</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Forward Options */}
      <section className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Shop Faster with These Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Meal Planner Upload */}
          <Card
            className="p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:text-white rounded-lg shadow-md"
            onClick={() => setSelectedOption("mealPlanner")}
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-bold text-lg">Meal Planner</h3>
            <p className="text-gray-600 mb-4">Plan your meals and shop accordingly.</p>
            {selectedOption === "mealPlanner" && (
              <div>
                <Button
                  className="mb-4"
                  onClick={captureImageNow}
                >
                  Capture Meal Plan Now
                </Button>
                <div className="my-4">OR</div>
                <input
                  type="file"
                  accept="image/*"
                  className="mb-4 w-full border rounded-md py-2 px-3"
                  onChange={(e) => handleUpload("mealPlanner", e.target.files?.[0] || null)}
                />
                {/* Display Captured Image */}
                {capturedImage && (
                  <div className="my-4">
                    <img src={capturedImage} alt="Captured Meal Plan" className="w-full rounded-lg" />
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Shop by List Upload */}
          <Card
            className="p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:bg-green-600 hover:text-white rounded-lg shadow-md"
            onClick={() => setSelectedOption("shopByList")}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-bold text-lg">Shop by List</h3>
            <p className="text-gray-600 mb-4">Upload your shopping list to shop quickly.</p>
            {selectedOption === "shopByList" && (
              <div>
                <Button
                  className="mb-4"
                  onClick={captureImageNow}
                >
                  Capture List Now
                </Button>
                <div className="my-4">OR</div>
                <input
                  type="file"
                  accept="text/*"
                  className="mb-4 w-full border rounded-md py-2 px-3"
                  onChange={(e) => handleUpload("shopByList", e.target.files?.[0] || null)}
                />
              </div>
            )}
          </Card>

          {/* Record Audio */}
          <Card
            className="p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:bg-red-600 hover:text-white rounded-lg shadow-md"
            onClick={() => setSelectedOption("audio")}
          >
            <div className="text-6xl mb-4">🎤</div>
            <h3 className="font-bold text-lg">Record Audio</h3>
            <p className="text-gray-600 mb-4">Record your voice for fast processing.</p>
            {selectedOption === "audio" && (
              <div>
                <input
                  type="file"
                  accept="audio/*"
                  className="mb-4 w-full border rounded-md py-2 px-3"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                />
                {audioFile && (
                  <div className="my-4 text-gray-600">
                    <p>{audioFile.name}</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Record Video */}
          <Card
            className="p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:bg-purple-600 hover:text-white rounded-lg shadow-md"
            onClick={() => setSelectedOption("video")}
          >
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="font-bold text-lg">Record Video</h3>
            <p className="text-gray-600 mb-4">Record a quick video for personalized results.</p>
            {selectedOption === "video" && (
              <div>
                <Button
                  className="mb-4"
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (videoFile) handleUpload("video", videoFile);
                  }}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                {videoFile && (
                  <div className="my-4">
                    <p>{videoFile.name}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </section>

      <video ref={videoRef} style={{ display: cameraActive ? 'block' : 'none' }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default FastForwardPage;
