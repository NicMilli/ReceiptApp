import numpy as np
import cv2
import imutils


class Image():
    '''
    
    '''
    def __init__(self, filepath, straighten_image=True):
        '''
        filepath (str) : filepath to the original image, such as url or location on host
        original (np.array) : np array of image RGB values, unmutated
        straighten_image (bool) : Whether or not to effect straightening and cropping functions
        upgraded (np.array) : The upgraded image, which has been processed to achieve better text recognition
        '''
        self.filepath = filepath
        self.original = cv2.imread(filepath)
        self.straighten_image = straighten_image
        self.upgraded = self.image_upgrade(show_image=False)

    def order_corners(self, points):
        '''
        Functions to organize points for cv.getPerspectiveTransform  
        '''
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

    def transform(self, image, points):
        '''
        '''
        #order and define the corners
        rectangle = self.order_corners(points)
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

    def straighten(self, show_image=True):
        '''
        '''
        # Get ratio of original image and the resized image (resized to normalize)
        resized_image = imutils.resize(self.original, width = 500)
        ratio = self.original.shape[1] / float(resized_image.shape[1])

        # Detect edges of receipt
        img_edged = cv2.Canny(resized_image, 75, 200)

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

        if show_image == True:
            output = resized_image.copy()
            cv2.drawContours(output, [outline_contour], -1, (0, 255, 0), 2)
            cv2.imshow("Receipt Outline", output)
            cv2.waitKey(0)
        
        fixed_image = self.transform(self.original, outline_contour.reshape(4, 2) * ratio)

        kernel = np.ones((1, 1), np.uint8)
        straightened_image = cv2.dilate(fixed_image, kernel, iterations=1)
        straightened_image = cv2.erode(fixed_image, kernel, iterations=1)

        return straightened_image

    def image_upgrade(self, show_image=True):
        if self.straighten_image == True:
            straightened_image = self.straighten(show_image)
        
        # Converts image np.array to grayscale
        gray = cv2.cvtColor(straightened_image, cv2.COLOR_BGR2GRAY)

        # Uses adaptive threshold to reduce noise and convert gray image to black and white
        final_upgraded_image = cv2.adaptiveThreshold(cv2.medianBlur(gray, 3), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 10)

        if show_image == True:
            cv2.imshow("Original", imutils.resize(self.original, height = 650))
            cv2.imshow("Fixed B&W", imutils.resize(final_upgraded_image, height = 650))
            cv2.waitKey(0)

        return final_upgraded_image




