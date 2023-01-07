import sys
import os
import json

def main():

    pdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    import_path = os.path.join(pdir, 'Classes/')
    sys.path.append(import_path)
    os.chdir(import_path)

    data = json.loads(sys.argv[1])

    try:
        from image import Image
        if isinstance(data, str):
            i = Image(data.strip('"'))
            print(i.upgraded)
        elif isinstance(data, list):
            pass

    except Exception as error:
        print(error)

if __name__ == '__main__':
    main()
        
