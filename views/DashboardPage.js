import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { FaHistory } from "react-icons/fa";
import { jsPDF } from "jspdf";
import placeholderImage from "../assets/img/spectogram.jpeg";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const fileInputRef = useRef(null); // Ref for the file input
  const audioRef = useRef(null); // Ref for the audio element

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "audio/wav" || uploadedFile.type === "audio/mpeg")
    ) {
      setFile(uploadedFile);
      setResult(null);
    } else {
      alert("Please upload a valid .wav or .mp3 file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "audio/wav" || droppedFile.type === "audio/mpeg")
    ) {
      setFile(droppedFile);
      setResult(null);
    } else {
      alert("Please upload a valid .wav or .mp3 file.");
    }
  };

  const handleDetect = () => {
    if (file) {
      setTimeout(() => {
        const detectionResult = {
          label: Math.random() > 0.5 ? "SceneFake" : "Real",
          explanation:
            "The audio contains inconsistent ambient background noise and irregular frequency bands, which are common artifacts in synthetic audio.",
          spectrogram: placeholderImage,
        };
        setResult(detectionResult);
        setHistoryList((prev) => [
          { name: file.name, label: detectionResult.label },
          ...prev,
        ]);
      }, 2000);
    } else {
      alert("Please upload an audio file first.");
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SceneFake Audio Detection Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`File: ${file.name}`, 20, 35);
    doc.text(`Detection Result: ${result.label}`, 20, 45);
    doc.text("Explanation:", 20, 60);
    doc.text(result.explanation, 20, 70, { maxWidth: 170 });
    doc.save("SceneFake_Detection_Report.pdf");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Trigger file input when Browse Files button is clicked
  const handleBrowseFilesClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="dashboard-page">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h5 className="sidebar-title">History</h5>
        <ul className="sidebar-menu">
          {historyList.length === 0 ? (
            <li className="text-muted">No history yet</li>
          ) : (
            historyList.map((item, index) => (
              <li key={index}>
                {item.name} - {item.label}
              </li>
            ))
          )}
        </ul>
      </div>

      <Button
        color="primary"
        onClick={toggleSidebar}
        className={`history-button ${isSidebarOpen ? "shifted" : ""}`}
      >
        <FaHistory size={20} />
      </Button>

      <Container className={`main-content-with-sidebar ${isSidebarOpen ? "shifted" : ""}`}>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <Card className="upload-section shadow-lg border-0">
              <CardBody>
                <CardTitle className="text-center text-light mb-3">
                  Upload Audio File
                </CardTitle>
                <div
                  className="drop-zone"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <p className="text-muted">Drag & Drop a .wav or .mp3 file here</p>
                  <input
                    type="file"
                    accept=".wav,.mp3"
                    onChange={handleFileUpload}
                    className="file-input"
                    ref={fileInputRef} // Attach ref to the file input
                    style={{ display: "none" }} // Hide the file input
                  />
                  <Button
                    color="secondary"
                    className="browse-button mt-2"
                    onClick={handleBrowseFilesClick} // Trigger file input on click
                  >
                    Browse Files
                  </Button>
                </div>
                {file && (
                  <p className="file-name mt-3 text-success">Uploaded: {file.name}</p>
                )}
              </CardBody>
            </Card>

            <div className="text-center mt-4">
              <Button color="primary" onClick={handleDetect} className="detect-button px-4 py-2">
                Detect
              </Button>
            </div>

            {result && (
              <Card className="result-section shadow-sm border-0 mt-4">
                <CardBody className="text-center">
                  <CardTitle className="mb-2 text-light">Detection Result</CardTitle>
                  <CardText className={`result-text ${result.label.toLowerCase()}`}>
                    The audio is <strong>{result.label}</strong>.
                  </CardText>
                  <CardText className="text-dark"> {/* Updated text color to black */}
                    <em>{result.explanation}</em>
                  </CardText>

                  {/* Playable Audio Component */}
                  <div className="audio-player mt-4">
                    <h6 className="text-light mb-3">Listen to the Uploaded Audio</h6>
                    <audio controls ref={audioRef}>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  <img
                    src={result.spectrogram}
                    alt="Spectrogram Explanation"
                    className="img-fluid my-3 rounded"
                    style={{ maxHeight: "300px" }}
                  />
                  <Button color="success" onClick={generatePDFReport} className="mt-3">
                    Download PDF Report
                  </Button>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;