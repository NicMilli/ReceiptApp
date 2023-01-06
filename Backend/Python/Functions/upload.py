import sys
import os

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

            print(i.original)
        elif isinstance(sys.argv[1], list):
            print('IM A LIST')

    except Exception as error:
        print(error)
        
if __name__ == '__main__':
    main()
        
    # Image('../SampleData/')
    # # Getting command line data & turning to JSON
    # req = json.loads(sys.argv[1])


    # # Preparing & sending data back to node
    # res = {'upgraded_image': 12}
    # print(req,res)