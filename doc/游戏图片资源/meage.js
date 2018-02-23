var fs = require('fs')
var Path = require('path');
var exec = require('child_process').exec,
	child;
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
var targetPath = "F:/BoardGames/branch/BoardGamesBN/resource/assets/";
var workPath = process.cwd();

function packImgs(path, file, _tailName) {
	// console.log(path,file)
	var tailName = _tailName || "Pack.json";
	var pathStr = path + " ";
	var files = fs.readdirSync(path); //需要用到同步读取
	let len = files.length;
	for (let i = 0; i < len; i++) {
		var states = fs.statSync(path + '/' + files[i] );
		if (states.isDirectory()) {
			
			pathStr += (path + '/' + files[i] + " ");
			console.log(path + '/' + files[i] + " ");
		}
	}
	var cmd = "TextureMerger -p " + pathStr + " -o " + targetPath + file + "/" + file + tailName;
	// console.log(cmd)
	return cmd;
	// child = exec(cmd, function(err, out, code) {
	// 	if (err !== null) {
	// 		console.log('error!!!!!!!!!!!!!!!!')
	// 	}
	// });
}
var cmdList = [];
if(process.argv[2]){
	cmdList.push(packImgs(workPath + "/pack" ,process.argv[2]));
	cmdList.push(packImgs(workPath + "/pack1" ,process.argv[2], "Pack1.json"));
}else{
	for (let i = 0; i < len; i++) {
		// walk(files[i]);
		var states = fs.statSync(workPath + '/' + files[i]);
		if (states.isDirectory()) {
			cmdList.push(packImgs(workPath + '/' + files[i] + "/pack" ,files[i]));
		}
	}
}
var files = fs.readdirSync(workPath); //需要用到同步读取
let len = files.length;

console.log(cmdList.toString())

function execCmd(list){
	if(list.length){
		let cmdStr = list.pop();
		child = exec(cmdStr, function(err, out, code) {
			execCmd(list);
			if (err !== null) {
				console.log('error!!!!!!!!!!!!!!!!')
			}
		});
	}
}
execCmd(cmdList);

