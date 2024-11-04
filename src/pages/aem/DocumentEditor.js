import React, { useState } from "react";
import "./DocumentEditor.css";
import { FaDownload, FaUpload } from 'react-icons/fa';

function DocumentEditor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const downloadDocument = async (fileName, fileType) => {
    try {
      const response = await fetch(`https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/download-document?file_name=${fileName}`);
      if (!response.ok) throw new Error("Failed to download file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${fileType}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const uploadDocument = async (fileName) => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/upload-document?file_name=${fileName}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");
      alert("File uploaded successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="document-editor-container">
      <h2>Download and Upload Documents</h2>

      {/* Wallet Document */}
      <div className="document-action">
        <span>Wallet Document</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('wallet', 'docx')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('wallet')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {/* Company Profile */}
      <div className="document-action">
        <span>Company Profile</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('company_profile', 'docx')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('company_profile')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {/* Email Queries */}
      <div className="document-action">
        <span>Email Queries</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('email_queries', 'pdf')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('email_queries')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {/* Exporting Document */}
      <div className="document-action">
        <span>Exporting Document</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('exporting', 'docx')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('exporting')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {/* Help and Support */}
      <div className="document-action">
        <span>Help and Support</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('help_and_support', 'docx')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('help_and_support')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {/* Integrations */}
      <div className="document-action">
        <span>Integrations</span>
        <div className="buttons">
          <button onClick={() => downloadDocument('integrations', 'docx')}>
            <FaDownload className="icon" /> Download
          </button>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={() => uploadDocument('integrations')}>
            <FaUpload className="icon" /> Upload
          </button>
        </div>
      </div>

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default DocumentEditor;
