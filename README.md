 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disaster Relief Chatbot - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f4f4f9;
            color: #333;
        }

h1, h2, h3 {
            color: #2c3e50;
        }

  code {
            background: #e8e8e8;
            padding: 2px 4px;
            border-radius: 4px;
        }

  pre {
            background: #e8e8e8;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }

  a {
            color: #007bff;
            text-decoration: none;
        }

  a:hover {
            text-decoration: underline;
        }

  ul {
            margin: 10px 0;
            padding-left: 20px;
        }

  li {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Disaster Relief Chatbot</h1>
    <p>An AI-powered chatbot designed to provide assistance during disaster scenarios. This project leverages <strong>Google Gemini's Generative Language API</strong> to respond dynamically to user queries.</p>

  <h2>Features</h2>
    <ul>
        <li><strong>Interactive Chatbot</strong>: Provides real-time responses to user inputs.</li>
        <li><strong>Standalone HTML File</strong>: No dependencies required; just open the file in your browser.</li>
        <li><strong>API Integration</strong>: Powered by Google Gemini for natural language processing.</li>
        <li><strong>Responsive Design</strong>: Optimized for desktop and mobile devices.</li>
    </ul>

  <h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>A <strong>Google Cloud API Key</strong> with access to the <em>Generative Language API</em>.</li>
    </ul>

  <h3>Steps to Use</h3>
    <ol>
        <li><strong>Clone or Download the Project</strong>:
            <pre>git clone https://github.com/yourusername/disaster-relief-chatbot.git</pre>
            Alternatively, download the single HTML file.
        </li>
        <li><strong>Set Up API Key</strong>:
            <p>Open the <code>index.html</code> file in any text editor. Locate the following line:</p>
            <pre>const apiKey = "YOUR_API_KEY";</pre>
            <p>Replace <code>YOUR_API_KEY</code> with your actual Google Cloud API key.</p>
        </li>
        <li><strong>Open the File in a Browser</strong>:
            <p>Simply double-click the <code>index.html</code> file or open it using your preferred browser.</p>
        </li>
        <li><strong>Start Interacting</strong>:
            <p>Type your queries in the chatbot input field and click <strong>Send</strong> or press <strong>Enter</strong> to receive a response.</p>
        </li>
    </ol>

  <h2>File Structure</h2>
    <pre>
index.html  # The main HTML file containing the chatbot
    </pre>

  <h2>Technologies Used</h2>
    <ul>
        <li><strong>Frontend</strong>: HTML, CSS, Vanilla JavaScript</li>
        <li><strong>API</strong>: Google Gemini Generative Language API</li>
    </ul>

  <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>

  <h2>Contact</h2>
    <p>For support or further inquiries, feel free to reach out to the developer.</p>
</body>
</html>
