import pytesseract
from pytesseract import Output
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\Tesseract.exe'
import re
import cv2
import matplotlib.pyplot as plt
import sys
import os

class Expense():
    '''
    '''
    def __init__(self, image, tesseract_option="--psm 11"):
        '''
        image (np.array) : processed for image upgrade in np array
        tesseract_option (str) : command sent to pytesseract for configuring model
        total (float) : total amount extracted from the image of receipt
        '''
        self.image = image
        self.tesseract_option = tesseract_option
        self.total = self.extract_total()

    def extract_total(self, show_textbox=False):
        text = pytesseract.image_to_string(self.image, config=self.tesseract_option)
        try: 
            if show_textbox == True:
                data = pytesseract.image_to_data(self.image, output_type=Output.DICT, config=self.tesseract_option)
                n_boxes = len(data['level'])
                boxes = cv2.cvtColor(self.image.copy(), cv2.COLOR_BGR2RGB)
                for i in range(n_boxes):
                    (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])    
                    boxes = cv2.rectangle(boxes, (x, y), (x + w, y + h), (0, 255, 0), 2)
                plt.figure(figsize=(16,10))
                plt.imshow(cv2.cvtColor(self.image, cv2.COLOR_BGR2RGB))

            amounts = re.findall(r'\d+\.\d{2}\b', text)
            
            floats = [float(amount) for amount in amounts]
            if floats == [] :
                return 0
            unique = list(dict.fromkeys(floats))
        except Exception as error:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
        return max(unique)