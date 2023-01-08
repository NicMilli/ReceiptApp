import sys
import os
import json

def main():

    pdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    import_path = os.path.join(pdir, 'Classes/')
    print(pdir)
    sys.path.append(import_path)
    os.chdir(import_path)

    # req = json.loads(sys.argv[1])
    # data = req['data']
    # try:
    #     from image import Image
    #     if isinstance(data, str):
    #         i = Image(data.strip('"'))
    #         # print(json.dumps({'upgraded':i.upgraded.tolist()}))
    #         # connect to firebase
    #         # upload i.upgraded to firebase
    #         # return the uuid of the location 
    #     elif isinstance(data, list):
    #         pass

    # except Exception as error:
    #     print(error)

if __name__ == '__main__':
    main()
        
