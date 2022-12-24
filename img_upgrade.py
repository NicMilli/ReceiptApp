## Initial image processing to crop and improve quality before running OCR
#Imports
import numpy as np
import cv2
from matplotlib import pyplot as plt
import argparse
import json
import imutils
from PIL import Image
from skimage.filters import threshold_local
import datetime
import re
import pytesseract
from pytesseract import Output
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\Tesseract.exe'

# #Argument parser for command line use -- to be added later
# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--image", required = True, help = "Path to the image to be corrected")
# args = vars(ap.parse_args())

#Image upload
img = cv2.imread("receipt5.jpg")
original = img.copy()
img = imutils.resize(img, width = 500)
ratio = original.shape[1] / float(img.shape[1])

##Extra processing- may cause bad results but increases contrast
# thresh = 127
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#img_bw = cv2.threshold(median, thresh, 255, cv2.THRESH_BINARY)[1]
img_edged = cv2.Canny(gray, 75, 200)

#Detect the edges 
# - using assumption that receipt will be main focus of image and have 4 points
contours = cv2.findContours(img_edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)
contours = sorted(contours, key = cv2.contourArea, reverse = True)

outline_contour = None

for index, contour in enumerate(contours):
    perimeter = cv2.arcLength(contour, True)
    approximate = cv2.approxPolyDP(contour, 0.02*perimeter, True)
    
    if len(approximate) == 4:
        outline_contour = approximate
        break

if outline_contour is None:
    raise Exception(("Unable to identify receipt outline." 
                     "Examine edge detection and contouring"))
    
output = img.copy()
cv2.drawContours(output, [outline_contour], -1, (0, 255, 0), 2)
cv2.imshow("Receipt Outline", output)
cv2.waitKey(0)
 
##Functions to organize points for cv.getPerspectiveTransform  
def order_corners(points):
    #Order = top left, top right, bottom left, bottom right#
    rectangle = np.zeros((4, 2), dtype = "float32")
    
    ##Require receipt photo input long ways 
    #top left = smallest sum, bottom right = largest
    xy_sum = points.sum(axis = 1)
    rectangle[2] = points[np.argmax(xy_sum)]
    rectangle[0] = points[np.argmin(xy_sum)]
    
    #top right = smallest diff; bottom left = largest diff
    xy_diff = np.diff(points, axis = 1)
    rectangle[1] = points[np.argmin(xy_diff)]
    rectangle[3] = points[np.argmax(xy_diff)]
    
    return rectangle

def transform(image, points):
    #order and define the corners
    rectangle = order_corners(points)
    (top_left, top_right, bottom_right, bottom_left) = rectangle
    
    #to find the width of the corrected image
    #find maximum width between top points or bottom points
    width_bottom = np.sqrt(((bottom_right[0] - bottom_left[0]) ** 2) + ((bottom_right[1] - bottom_left[1]) ** 2))
    width_top = np.sqrt(((top_right[0] - top_left[0]) ** 2) + ((top_right[1] - top_left[1]) ** 2))
    fixed_width = max(int(width_bottom), int(width_top))
    
    #Similaryl find height from max of left points height and right points height
    height_left = np.sqrt(((top_left[0] - bottom_left[0]) ** 2) + ((top_left[1] - bottom_left[1]) ** 2))
    height_right = np.sqrt(((top_right[0] - bottom_right[0]) ** 2) + ((top_right[1] - bottom_right[1]) ** 2))
    fixed_height = max(int(height_left), int(height_right))
    
    destination_points = np.array([[0, 0], [fixed_width - 1, 0],
                                   [fixed_width - 1, fixed_height - 1], [0, fixed_height - 1]],
                                  dtype = "float32")
    transformation_matrix = cv2.getPerspectiveTransform(rectangle, destination_points)
    fixed_image = cv2.warpPerspective(image, transformation_matrix, (fixed_width, fixed_height))
    
    return fixed_image


fixed_image = transform(original, outline_contour.reshape(4, 2) * ratio)

kernel = np.ones((1, 1), np.uint8)
fixed_image = cv2.dilate(fixed_image, kernel, iterations=1)
fixed_image = cv2.erode(fixed_image, kernel, iterations=1)

start1 = datetime.datetime.now()
gray = cv2.cvtColor(fixed_image, cv2.COLOR_BGR2GRAY)

img_bw = cv2.adaptiveThreshold(cv2.medianBlur(gray, 3), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 10)
end1 = datetime.datetime.now() 

rt1 = end1 - start1
# rt2 = end2 - start2
print(rt1)
# print(rt2)
# show the original and scanned images
print("STEP 3: Apply perspective transform")
cv2.imshow("Original", imutils.resize(original, height = 650))
cv2.imshow("Scanned1", imutils.resize(img_bw, height = 650))
cv2.imshow("Scanned2", imutils.resize(fixed_image, height = 650))
cv2.waitKey(0)

tesseract_option = "--psm 11"
all_text = pytesseract.image_to_string(img_bw, config=tesseract_option)
data = pytesseract.image_to_data(img_bw, output_type=Output.DICT, config=tesseract_option)

n_boxes = len(data['level'])
boxes = cv2.cvtColor(img_bw.copy(), cv2.COLOR_BGR2RGB)
for i in range(n_boxes):
    (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])    
    boxes = cv2.rectangle(boxes, (x, y), (x + w, y + h), (0, 255, 0), 2)

def plot_rgb(image):
    plt.figure(figsize=(16,10))
    return plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

plot_rgb(boxes)
plt.show()

print("img_bw\n", all_text)


def find_amounts(text): 
    amounts = re.findall(r'\d+\.\d{2}\b', text)
    floats = [float(amount) for amount in amounts]
    unique = list(dict.fromkeys(floats))
    return unique

amounts = find_amounts(all_text)
print(max(amounts))

with open('data.txt', 'w') as data_file:
    data_file.write(json.dumps(data))