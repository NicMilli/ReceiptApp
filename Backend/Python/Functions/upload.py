import sys
import os
import requests

def main():
    print('hi from python')
    pdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    import_path = os.path.join(pdir, 'Classes/')
    sys.path.append(import_path)
    os.chdir(import_path)

    try:
        from image import Image
        if isinstance(sys.argv[1], str):
            i = Image(sys.argv[1].strip('"'))
            request = requests.post()
        elif isinstance(sys.argv[1], list):
            pass

    except Exception as error:
        print(error)

if __name__ == '__main__':
    main()
        
