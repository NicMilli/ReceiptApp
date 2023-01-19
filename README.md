# ReceiptApp

Receive images from the website and extract the text from the receipt image to identify the total.

Manipulates images of receipts in python, upgraded quality for optical text recogition capacity. Uses a python text recogition tool to identify the text in the upgraded image and extract the total value from the receipt.

Backend is controlled using Node.js. A child process runs the python function to upgrade, extract, and upload the total to the database. 
