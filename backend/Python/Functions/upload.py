import sys
import os
import json

def main():

    pdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    import_path = os.path.join(pdir, 'Classes/')

    sys.path.append(import_path)
    os.chdir(import_path)

    req = json.loads(sys.argv[1])
    image_url = req
    # document_id = req['id']
    try:
        from image import Image
        from expense import Expense

        if isinstance(image_url, str):
            i = Image(image_url.strip('"'))
            total = Expense(i.upgraded).total
            
            print(total)

        # Ultimately we will need to be able to batch upload receipts
        elif isinstance(image_url, list):
            # [main(image) for image in image_url]
            pass

    except Exception as error:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(image_url.strip('"'), exc_type, fname, exc_tb.tb_lineno)

if __name__ == '__main__':
    main()
        
