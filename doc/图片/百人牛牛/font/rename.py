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
        if ".mp3" in f:
            path = rt+s + f;
            path = path.replace("g_", "f_");
            os.rename(rt+s+f, path)
            print path;