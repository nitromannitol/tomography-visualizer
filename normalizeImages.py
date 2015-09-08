import Image
import glob, os

size = 60,60;
count = 1;
for infile in glob.glob("full_size_imgs/*.tif"):
	file, ext = os.path.splitext(infile)
	img = Image.open(infile)
	img2 = img.resize(size, Image.ANTIALIAS) 
	imageName = "img2/image" + str(count) + ".png"
	img2.save(imageName, "PNG")
	count+=1;
