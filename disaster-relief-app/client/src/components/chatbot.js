// chatbot.js
import React, { useState } from 'react';
import './chatbot.css';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        // Add the user's message to the chat
        const userChat = { sender: 'user', text: userMessage };
        setMessages([...messages, userChat]);

        const apiKey = "AIzaSyD29hb4r2b-Ht3PEmS5WUAF7wPuGoyu0q0"; // Replace with your API key
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const payload = {
            contents: [
                {
                    parts: [{ text: userMessage }], // Dynamic user input
                },
            ],
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("API Response:", data); // Debug the API response

            // Parse the response
            if (data.candidates && data.candidates.length > 0) {
                const botResponse = data.candidates[0].content.parts
                    .map((part) => part.text || "")
                    .join(" ");
                const botChat = { sender: 'bot', text: botResponse };
                setMessages((prevMessages) => [...prevMessages, botChat]);
            } else {
                console.error("Unexpected API Response Structure:", data);
                const errorMessage = { sender: 'bot', text: 'Unexpected response from server.' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }
        } catch (error) {
            console.error("Error connecting to the API:", error);
            const errorMessage = { sender: 'bot', text: 'Error connecting to the server.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setUserMessage(""); // Clear the input field
    };

    return (
        <div className="chatbot">
            <div className="chatbot-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="How can I help you today?..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;