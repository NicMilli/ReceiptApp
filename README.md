# ReceiptApp

This project is currently for academic purposes.

This receipt app, which we are calling "InvoiceMe," is designed to offer small businesses a solutions for tracking their employees' receipts and invoices for reimbursement and tax purposes. The project overview and tech overview can be found below.

***Project Overview***

Users can sign in to the app and upload their receipts, and a total amount will be extracted from the image. The image will be stored in the cloud under that user's folder. After submitting the receipt image, the user will then fill out relevant information such as date of purchase, category of expense, currency, and country of purchase. This information will be submitted to the database via an API call to the backend. 

Users can also query the database to view invoices. There are two levels of users, employees and admins. Admins can select which employees invoices they want to view and the date range they want to view for. Admins are also able to mark invoices as compensated. Employees can select what date range they want to view invoices from, but they can only view their own and cannot change compensation status. Both types of users can extract the invoice query to an excel document.

Admins can create new users and choose what position (employee or admin) the new user will be. An added user is linked to their unique five digit code that is valid for two hours. Using their email and the five digit code, they can submit this information on the sign-in page to access the register form. They will then supply their name and password to officially create their new account. 

There is a profile page that shows employees their basic information, including when they joined, how many invoices they've submitted in total, and how many of their invoices are currently outstanding. They can also update their information from this page, and submit a question to the InvoiceMe team.

***Tech Overview***

The backend utilizes Node.js and Python. Node.js uses express for routes, and the controller functions relevant for image text extraction use a child process to run the Python script from a call to the relevant express route. Upon user upload of a receipt, the image is sent to the backend route which has two controller functions. The first parses the image using busboy. Once the write stream has finished, the temporary filename of the result of the data parsed from the stream is sent to the next function to upload to Firestore. The response from the second function sends the url of the images location in Firestore. The image is then upgraded by manipulating its shape and colors using CV2. A python text recognition tool, pytesseract, is used to then analyze the photo and identify the total amount from the receipt. If no total amount can be recognized, a value of zero is returned. Users can manually enter from the Frontend. Python code is written in object-oriented with two main classes, expense and image. From the child process, a Python script is called that imports our classes and creates a new instance of image from the image url. The image class takes in a url and has an attribute 'upgraded' which is the CV2 object of the image after it has been transformed to reduce background noise (using an adaptiveThreshold) and reshaped to appear flat. An expense object is then created from the image object. The expense object has an attribute total which employs tesseract to read the image and stores the amount that it identifies. The total attribute is printed and collected by the child process, and subsequently returned in the response from the API.

Firebase, Firestore, and Firebase Auth are used to store all company data. User's passwords and emails are securely kept in Firebase Auth. User information including name, email, date joined are stored in Firebase in a collection. In each user document exists a subcollection, invoices, where invoice information entered by the user, as well as a link to the relevant Firestore image of receipt, are stored. When admins query invoices for multiple employees, a collectiongroup query is employed. Receipt images are stored in Firestore, under a folder named by the ID of the user in Firebase (which is recognized by the getAuth instance of the currently signed-in user when the image is uploaded).

In the frontend, React is used as the base framework. React-redux is used for state management and to make calls to the API. Redux-persist is used to persist state upon re-renders.

Select CSS classes are taken from Brad Traversy's React Front to Back 2022 course on Udemy.

***Future Upgrades***
- Add delete functionality for invoices
- Enhance the image upgrading to identify total with higher accuracy
- Identify currency from receipt image automatically (no user input required in currency box if accurate, as with total)
- Upload batch of receipts rather than one receipt/invoice at a time


