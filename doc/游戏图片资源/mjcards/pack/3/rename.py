import os
import os.path
import json
import sys
from ctypes import *
import os
import functools
import thread
import array
from ctypes import *
import os
import os.path 
import re
import shutil 
import time,  datetime
import fileinput;
s = os.sep
root = "./"
songs = None;
preKey = "g_stsj_";
# resFile = open("default.res.json", "r+");
# resDatas = json.loads(resFile.read());
# resFile.close();
# groups = resDatas["groups"];
# for index in range(len(groups)):
    
    # object = groups[index];
    # print index, object;
    # if("sounds" in object["name"]):
        # data = {};
        # data["keys"] = object["keys"].replace("_mp3", "_m4a");
        # data["name"] = object["name"] + "Ios";
        # groups.append(data);
# js_file = open("default.res.json", "w");
# js_file.write(json.dumps(resDatas));
# js_file.close();        


for rt, dirs, files in os.walk(root):
    for f in files:
		# js_file = open(rt+s+f, "r");
		# if len(js_file.read()) <= 100:
		# print f;
		if ".png" in f and "bei" not in f and "peng" not in f:
			strs = f.split(".")
			num = int(strs[0][8:])
			# print int(num)
			path = rt+s + f
			if num >= 1 and num <= 10:
				num = num + 16;
				npath = rt+s+"mj_right"+str(num)+".png";
				os.rename(path,npath);
			# elif num > 8 and num < 19:
				# num = num - 8;
			# elif num > 18 and num < 28 :
				# num = num + 30;
			# elif num > 27 :
				# num = num + 37
			# 
			# npath = path.replace("mjLeft", "mj_left");
			# print rt+s+"right"+str(num)+".png", path;
			# os.rename(path,npath);
            # print path;