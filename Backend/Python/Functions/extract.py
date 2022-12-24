from ..Classes.expenseClass import Expense

def extract(upgraded_image):
    expense_object = Expense(upgraded_image)
    return expense_object.total