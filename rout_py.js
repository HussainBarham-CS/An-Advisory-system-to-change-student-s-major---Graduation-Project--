const { waitForDebugger } = require('inspector');

const spawn = require('child_process').spawn;

const util = require("util")
const wait = util.promisify(setTimeout);
var data = {
    myPro: "",
    transPro: ""
}
var out = {
    num:'0',
    hour:'0',
    id:['']

}
var aha = ""
const passVal =async (myPro,transPro)=>{
    data.myPro = myPro
    data.transPro = transPro


//////////////////////////////////////
let stringifiedData = JSON.stringify(data);
const py = spawn('python', ['similarity.py', stringifiedData]);

resultString = '';
py.stdout.on('data', function (stdData) {
resultString += stdData.toString();
//console.log("Python is Running..........")
});
py.stdout.on('end', function () {
    //console.log("DataBase CONNECTED Python.......");  
let resultData = JSON.parse(resultString);
/////////////////////////////////////



var num = resultData['num']
var hours = resultData['houre']
var id = resultData['id']



console.log(num);
console.log(hours);
console.log(id);

out.hour=hours
out.num = num
out.id = id
console.log("Python is Finished......");

}); 



return out

}




module.exports = {
    passVal
}