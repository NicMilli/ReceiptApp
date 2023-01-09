import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
import os
from dotenv import load_dotenv


def connect_py_DB():
    # Getting environmental variables to access db
    load_dotenv()

    # Fetch the service account key JSON file contents
    cred = credentials.Certificate({
        "type": os.getenv('TYPE'),
        "project_id": os.getenv('PROJECT_ID'),
        "private_key_id": os.getenv('PRIVATE_KEY_ID'),
        "private_key": os.getenv('PRIVATE_KEY'),
        "client_email": os.getenv('CLIENT_EMAIL'),
        "client_id": os.getenv('CLIENT_ID'),
        "auth_uri": os.getenv('AUTH_URI'),
        "token_uri": os.getenv('TOKEN_URI'),
        "auth_provider_x509_cert_url": os.getenv('AUTH_PROVIDER_X509_CERT_URL'),
        "client_x509_cert_url": os.getenv('CLIENT_X509_CERT_URL')
    })
    firebase_admin.initialize_app(cred)

    # Connect to firebase
    db = firestore.client() 

    return db

# def get_bucket(uuid_upgraded, array):
#     firebase = firebase.FirebaseApplication(os.getenv('AUTH_DOMAIN'))
#     client = storage.Client()
#     bucket = client.get_bucket(os.getenv('STORAGE_BUCKET'))
#     im_blob = bucket.blob(f'/{uuid_upgraded}upgraded')
#     im_blob.upload_from_file(array.tobytes())

#     return(im_blob.public_url)
