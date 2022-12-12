## Initial image processing to crop and improve quality before running OCR
#Imports
import numpy as np
import cv2
from matplotlib import pyplot as plt
import argparse
import imutils

# #Argument parser for command line use -- to be added later
# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--image", required = True, help = "Path to the image to be corrected")
# args = vars(ap.parse_args())

#Image upload
img = cv2.imread("receipt5.jpg")
ratio = img.shape[0] / 500.0
original = img.copy()
img = imutils.resize(img, height = 500)


norm = np.zeros((img.shape[0], img.shape[1]))
norm_img = cv2.normalize(img, norm, 0, 255, cv2.NORM_MINMAX)

##Extra processing- may cause bad results but increases contrast
thresh = 127
gray = cv2.cvtColor(norm_img, cv2.COLOR_BGR2GRAY)
median = cv2.GaussianBlur(gray, (5, 5), 0)
img_bw = cv2.threshold(median, thresh, 255, cv2.THRESH_BINARY)[1]
img_edged = cv2.Canny(gray, 75, 200)

#Laplacian and Sobel transformations
lap = cv2.Laplacian(img_bw, cv2.CV_64F, ksize = 1)
lap = np.uint8(np.absolute(lap))

sobelX = cv2.Sobel(img_bw, cv2.CV_64F, 1, 0)
sobelY = cv2.Sobel(img_bw, cv2.CV_64F, 0, 1)

sobelX = np.uint8(np.absolute(sobelX))
sobelY = np.uint8(np.absolute(sobelY))

sobelXY = cv2.bitwise_or(sobelX, sobelY)

#Print results for comparison
titles = ['image', 'Laplacian', 'sobelXY', 'edged']
images = [img_bw, lap, sobelXY, img_edged]

fig = plt.figure()

for num, img in enumerate(images):
    plt.subplot(2, 2, num+1)
    plt.title(titles[num])
    plt.axis('off')
    plt.imshow(img, 'gray')

plt.show()

#Detect the edges 
# - using assumption that receipt will be main focus of image and have 4 points
contours = cv2.findContours(img_edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)
contours = sorted(contours, key = cv2.contourArea, reverse = True)[:5]

for index, contour in enumerate(contours):
    perimeter = cv2.arcLength(contour, True)
    approximate = cv2.approxPolyDP(contour, 0.02*perimeter, True)
    
    if len(approximate) == 4:
        screenF = approximate
        break
    
def get_corners(pts):
    
    rectangle = np.zeros(())