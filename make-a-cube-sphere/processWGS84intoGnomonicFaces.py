# requres gdal cli installed
# run like this:
# python processWGS84intoGnomonicFaces.py input-geotiff.tif

import subprocess
import sys
inputFile = sys.argv[-1]
outputPath = "/path/to/faces/"

cmd = 	"""\
			gdalwarp -wo SOURCE_EXTRA=500 -wo SAMPLE_GRID=YES -te -6378137 -6378137 6378137 6378137 \
				-t_srs "+proj=gnom  +lon_0={lon} 	+lat_0={lat}   +datum=WGS84" \
				-tr 5000 5000 -overwrite {inputFile} /tmp/tmp.tif && \
			convert /tmp/tmp.tif -resize 512x512 {outputPath}{filename} && \
			rm /tmp/tmp.tif \
		"""

cmd1 = cmd.format(lon=0, lat=0, inputFile=inputFile, outputPath=outputPath, filename="01.jpg")     
subprocess.call(cmd1, shell=True)  

cmd2 = cmd.format(lon=180, lat=0, inputFile=inputFile, outputPath=outputPath, filename="02.jpg")     
subprocess.call(cmd2, shell=True) 

cmd3 = cmd.format(lon=90 ,lat=0, inputFile=inputFile, outputPath=outputPath, filename="03.jpg")     
subprocess.call(cmd3, shell=True) 

cmd4 = cmd.format(lon=-90, lat=0, inputFile=inputFile, outputPath=outputPath, filename="04.jpg")     
subprocess.call(cmd4, shell=True) 

cmd5 = cmd.format(lon=0, lat=90, inputFile=inputFile, outputPath=outputPath, filename="05.jpg")     
subprocess.call(cmd5, shell=True) 

cmd6 = cmd.format(lon=0, lat=-90, inputFile=inputFile, outputPath=outputPath, filename="06.jpg")     
subprocess.call(cmd6, shell=True) 