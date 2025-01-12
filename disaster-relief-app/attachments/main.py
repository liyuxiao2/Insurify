import os
import boto3
from openai import OpenAI
import pdfplumber
from io import BytesIO
from dotenv import load_dotenv


# Load environment variables
print("Current working directory:", os.getcwd())
load_dotenv()


# Get credentials from environment variables
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


def download_pdf_from_s3(bucket_name, object_key):
    """Download PDF from S3 using boto3."""
    try:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name='ca-central-1'
        )
       
        print(f"Downloading from bucket: {bucket_name}, key: {object_key}")
        response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        return BytesIO(response['Body'].read())
       
    except Exception as e:
        print(f"S3 Download Error: {str(e)}")
        raise


def extract_text_from_pdf(pdf_file):
    """Extract text from PDF file."""
    try:
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"PDF Processing Error: {str(e)}")
        raise


def main():
    # Check if environment variables are set
    if not all([AWS_ACCESS_KEY, AWS_SECRET_KEY, OPENAI_API_KEY]):
        print("Error: Missing required environment variables. Please check your .env file.")
        return


    bucket_name = "records-images"
    object_key = "sample_insurance.pdf"
   
    try:
        print("Attempting to download PDF from S3...")
        pdf_file_like = download_pdf_from_s3(bucket_name, object_key)
        print("Successfully downloaded file")
       
        print("Extracting text from PDF...")
        pdf_text = extract_text_from_pdf(pdf_file_like)
        print("Successfully extracted text")
       
        # Initialize OpenAI client
        client = OpenAI(api_key=OPENAI_API_KEY)
       
        # Initialize messages list with extracted PDF text as context
        messages = [
            {"role": "system", "content": """as an advanced insurance claims assistant designed for act of god instances. Your goal is to help users understand their insurance policies, identify coverage details, and streamline the claims process. Specifically, you will:
Act
Analyze Uploaded Insurance Policies:




Extract and interpret coverage details (e.g., dwelling, personal property, additional living expenses).
Identify exclusions (e.g., negligence, specific property types) and claim filing deadlines.
Provide Simplified Coverage Insights:




Translate complex legal terms into plain language.
Explain what is covered based on the wildfire damage reported by the user.
Offer Automated Recommendations:




Suggest documentation users need to support their claims (e.g., photos, receipts).
Alert users to potential issues like exclusions, coverage limits, or missing information.
Compare Multiple Policies (if applicable):




Analyze and highlight overlaps or conflicts between policies (e.g., a home insurance policy and a fire-specific rider).
Integrate Claims Filing:




Generate pre-filled claim forms using the user's reported damage and analyzed policy details.
Keep your responses clear, concise, and user-friendly. Ensure your advice is actionable and supports the user in navigating their insurance coverage and claims process efficiently. Do not make up any information if asked. only respond if you have already been given access to the info.
             analyse the following document and use the information to help file the insurance claim. keep in mind the interface you are on has a feature to assist the user with determining the valuation of their valuables, please do not name the feature, so kindly direct them there, in the home section if that is the next step they need to do
"""
},
            {"role": "system", "content": pdf_text}
        ]
       
        print("\nChat session started. Type 'exit' or 'quit' to end the session.")
       
        # Chat loop
        while True:
            message = input("\nUser: ").strip()
           
            if message.lower() in ["exit", "quit"]:
                print("Exiting chatbot. Goodbye!")
                break
           
            if message:
                messages.append({"role": "user", "content": message})
               
                try:
                    chat = client.chat.completions.create(
                        model="gpt-4",
                        messages=messages
                    )
                   
                    reply = chat.choices[0].message.content
                    print(f"\nAssistant: {reply}")
                    messages.append({"role": "assistant", "content": reply})
                   
                except Exception as e:
                    print(f"\nError in API call: {e}")


    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
