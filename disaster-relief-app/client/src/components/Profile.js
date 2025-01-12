import React, { useState, useEffect } from 'react';
import { openDB } from 'idb'; // Import idb library

import './Profile.css';

// Open IndexedDB and create a store for files
const dbPromise = openDB('uploaded-files-db', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('files')) {
            db.createObjectStore('files', { keyPath: 'name' });
        }
    },
});

const Profile = () => {
    const [files, setFiles] = useState([]);

    // Handle file selection via the input element
    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
    };

    // Handle file drop
    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = async (fileList) => {
        for (const file of fileList) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    content: event.target.result,
                };

                // Save file to IndexedDB
                const db = await dbPromise;
                await db.put('files', fileData);

                // Update the file list state
                const allFiles = await db.getAll('files');
                setFiles(allFiles);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Clear all files from IndexedDB
    const handleClearStorage = async () => {
        const db = await dbPromise;
        const tx = db.transaction('files', 'readwrite');
        await tx.objectStore('files').clear();
        setFiles([]);
    };

    // Load files from IndexedDB when the component mounts
    useEffect(() => {
        const loadFiles = async () => {
            const db = await dbPromise;
            const allFiles = await db.getAll('files');
            setFiles(allFiles);
        };
        loadFiles();
    }, []);

    return (
        <div className="Profile">
            <div className="document-sidebar">
                <h2>Suggested Documents</h2>
                <ul>
                    <li>Homeowner's Insurance Policy</li>
                    <li>HO3 Form (standard homeowner insurance policy)</li>
                    <li>Policy Declarations Page</li>
                    <li>Fire-Specific Insurance Riders (if applicable)</li>
                    <li>Full Insurance Policy Document (if needed for confirmation)</li>
                    <li>Proof of Loss Form</li>
                    <li>Completed and signed form provided by your insurance company</li>
                    <li>Photos of damaged or lost property</li>
                    <li>Receipts or purchase records for high-value items</li>
                    <li>Inventory of lost or damaged items</li>
                    <li>Additional supporting evidence (e.g., repair estimates, appraisals)</li>
                </ul>
            </div>
            <div className="main-content">
                <h1>File Uploader Page</h1>
                <div
                    className="drop-zone"
                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input on click
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <p>Click or Drag & Drop files, photos, or folders here</p>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        style={{ display: 'none' }} // Hide the input element
                        onChange={handleFileSelect}
                    />
                </div>
                <button className="clear-button" onClick={handleClearStorage}>
                    Clear All Stored Files
                </button>
                <div className="file-list">
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <div className="file-list-item" key={index}>
                                {file.type.startsWith('image/') ? (
                                    <img src={file.content} alt={file.name} />
                                ) : (
                                    <p>[File]</p>
                                )}
                                <p>{file.name}</p>
                                <p>{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                        ))
                    ) : (
                        <p>No files uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;