from flask import Flask, request, jsonify
import boto3
from botocore.exceptions import ClientError
import os

app = Flask(__name__)

# AWS S3 Configuration
BUCKET_NAME = "your-s3-bucket-name"  # Replace with your bucket name
s3_client = boto3.client("s3")

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file uploads and send them to AWS S3."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']  # Get the uploaded file
    file_name = file.filename  # Use the original filename

    try:
        # Upload the file to S3
        s3_client.upload_fileobj(file, BUCKET_NAME, file_name)

        # Generate the public URL for the file
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_name}"
        return jsonify({'url': url}), 200
    except ClientError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)