import React, { useEffect } from "react";
import { openDB } from "idb";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const clearAllIndexedDB = async () => {
            const db = await openDB('uploaded-files-db', 1); // Ensure this matches your DB name
            const tx = db.transaction('files', 'readwrite'); // Access the 'files' store
            await tx.objectStore('files').clear(); // Clear all records in the store
        };

        // Perform logout cleanup
        const performLogout = async () => {
            localStorage.clear(); // Clears all data in localStorage
            sessionStorage.clear(); // Clears all data in sessionStorage
            await clearAllIndexedDB(); // Clears IndexedDB data
            navigate('/'); // Redirect to the login page
        };

        performLogout();
    }, [navigate]);

    return null; // No UI is necessary for logout, but you could add a message if desired
};

export default Logout;