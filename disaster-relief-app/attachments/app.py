import boto3
import os
from botocore.exceptions import ClientError

# AWS S3 Configuration
bucket_name = 'records-images'
file_path = r"C:\Users\omnat\OneDrive - University of Waterloo\sample_insurance.pdf"

# Initialize S3 client with credentials
# Option 1: Using environment variables
s3_client = boto3.client('s3')

# Option 2: Explicit credentials (replace with your credentials if needed)
# s3_client = boto3.client(
#     's3',
#     aws_access_key_id='YOUR_ACCESS_KEY',
#     aws_secret_access_key='YOUR_SECRET_KEY',
#     region_name='your-region'  # e.g., 'us-east-1'
# )

def check_bucket_exists(bucket_name):
    """Check if the specified bucket exists and is accessible."""
    try:
        s3_client.head_bucket(Bucket=bucket_name)
        return True
    except ClientError as e:
        error_code = int(e.response['Error']['Code'])
        if error_code == 403:
            print(f"Bucket {bucket_name} exists but you don't have permission to access it")
        elif error_code == 404:
            print(f"Bucket {bucket_name} does not exist")
        return False

def upload_file(file_path, object_name=None):
    """Upload a file to S3 bucket

    Parameters:
    file_path (str): Path to the file to upload
    object_name (str): S3 object name. If not specified, file_path's basename is used

    Returns:
    str: URL of the uploaded file if successful, None otherwise
    """
    # Validate file exists
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return None

    # If S3 object_name not specified, use file_path's basename
    if object_name is None:
        object_name = os.path.basename(file_path)

    # Check if bucket exists and is accessible
    if not check_bucket_exists(bucket_name):
        return None

    try:
        # Upload the file
        s3_client.upload_file(file_path, bucket_name, object_name)
        print(f"File {object_name} uploaded successfully to {bucket_name}")
        
        # Generate the URL for the uploaded file
        url = f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
        return url

    except ClientError as e:
        print(f"Error uploading file: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

# Example usage
if __name__ == "__main__":
    result = upload_file(file_path)
    if result:
        print(f"File uploaded successfully. URL: {result}")
    else:
        print("File upload failed")
