const { timeout } = require('nodemon/lib/config');
const reader = require('xlsx');
const client = require('./dbConnect');
const server = client;



function find(String)
{
    for(var i=0;i<String.length;i++)
    {
        if(String[i]==',')
        {
            return 1
        }
    }
    return 0
    
}


function haha (pre){
    
    //console.log(pre)
    let process =pre;
    let ind;
    let temp1 = []
    let temp2 = []
 
    var t1=0
    var t2=0
    for( var p = 0 ; p<process.length ; p++){
        if (process[p]==',') {
            ind=p;
            break
        }
        else {
            temp1[t1++]=process[p]
            
             
        }
    }

    
    for(var k = ind+1 ; k <process.length ; k++){
        temp2[t2++]=process[k]
        
                     
    }
 

    //console.log( "course name "+"   "+temp1.join('')+"    "+temp2.join(''))

 





}




let ob = {
    preName: [],
    newPreName: [],
    preCode: []
    
}


// Reading our test file
let files = []; 
files[0]  = reader.readFile('DataSet/Computer-Engineering.xlsx');/*
files[1]  = reader.readFile('DataSet/Chemical-Engineering.xlsx');
files[2]  = reader.readFile('DataSet/Civil-Engineering.xlsx');
files[3]  = reader.readFile('DataSet/Computer-Network-and-Information-Security.xlsx');
files[4]  = reader.readFile('DataSet/Computerized-Information-Systems.xlsx');
files[5]  = reader.readFile('DataSet/Electrical-Engineering.xlsx');
files[6]  = reader.readFile('DataSet/Computer-Science.xlsx');
files[7]  = reader.readFile('DataSet/Industrial-Engineering.xlsx');
files[8]  = reader.readFile('DataSet/Energy-engineering-and-environment.xlsx');
files[9]  = reader.readFile('DataSet/Material-Engineering.xlsx');
files[10] = reader.readFile('DataSet/Management-Information-Systems.xlsx');
files[11] = reader.readFile('DataSet/Mechatronics-Engineering.xlsx');
files[12] = reader.readFile('DataSet/Mechanical-Engineering.xlsx');
files[13] = reader.readFile('DataSet/Telecommunication-Engineering.xlsx');
*/
let ProgramCode= [];
ProgramCode[0]  = 10636;/*
ProgramCode[1]  = 10626;
ProgramCode[2]  = 10601;
ProgramCode[3]  = 10686;
ProgramCode[4]  = 10681;
ProgramCode[5]  = 10641;
ProgramCode[6]  = 10671;
ProgramCode[7]  = 10631;
ProgramCode[8]  = 10656;
ProgramCode[9]  = 10661;
ProgramCode[10] = 10676;
ProgramCode[11] = 10651;
ProgramCode[12] = 10621;
ProgramCode[13] = 10646;
/*
const R = require('ramda');



server.query('SELECT * FROM public."Programs" ',(err, res)=> {

    const data = res.rows;
    console.log()


   

    

    server.end()
});

*/






for (let i = 0; i < 1; i++) {
    

let dep = [];
let code = [];
let hours = [];
let pre = [];
let cat = [];
let des = [];    

const workbookSheets = files[i].SheetNames;
const sheet = workbookSheets[0];
const dataExcel = reader.utils.sheet_to_json(files[i].Sheets[sheet]);

/*
const query = {
    text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'Calculus I';",
    rowMode: 'array'
};

server.query(query,(err,res) => {

    const data = res.rows

    console.log('all data');
    data.forEach(row => {
        console.log(`Id: ${row[0]} Name: ${row[1]} Price: ${row[2]}`);
    })

    server.end

})

*/






for(const item of dataExcel)
{
  dep.push(item['Course Name']);
  code.push(item['Course Code']);
  hours.push(item['Credit Hours']);
  pre.push(item['Prerequests']);
  cat.push(item['Course Category']);
  des.push(item['Course Description']);

}
var b=0
let v =[]
var temp=[]
for(var h=0;h<code.length;h++)
{
    
   
    if(pre[h]!=undefined)
    {

        
        //console.log(h);
        if(find(pre[h])==0)
        {
            (async()=>{

            
            //console.log(h);
            const query = {
                text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+pre[h]+"';",
                rowMode: 'array'
            };
            //console.log(h);
            //console.log(h);
            var x = h
            const hussein = await server.query(query,(err,res) => {
                
                data = res.rows
            
                
                data.forEach(row => {
                    //console.log()
                    //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                    server.query('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");",(err,res)=>{

                    })
                })
                
                
            
            server.end
            })
        })();

            

            

        }

        else if (find(pre[h])==1){

            
    
    //console.log(pre)
    let process =pre[h];
    let ind;
    let temp1 = []
    let temp2 = []
 
    var t1=0
    var t2=0
    for( var p = 0 ; p<process.length ; p++){
        if (process[p]==',') {
            ind=p;
            break
        }
        else {
            temp1[t1++]=process[p]
            
             
        }
    }

    
    for(var k = ind+1 ; k <process.length ; k++){
        temp2[t2++]=process[k]
        
                     
    }
 

    console.log( "course name "+"   "+temp1.join('')+"    "+temp2.join(''))



            
        //console.log(h);
        const query1 = {
            text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+temp1.join('')+"';",
            rowMode: 'array'
        };

        const query2 = {
            text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+temp2.join('')+"';",
            rowMode: 'array'
        };

        (async()=>{

            
            //console.log(h);
            const query3 = {
            text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+temp1.join('')+"';",
            rowMode: 'array'
            };
            //console.log(h);
            //console.log(h);
            var x = h
            const hussein = await server.query(query3,(err,res) => {
                
                data = res.rows
            
                
                data.forEach(row => {
                    console.log(row)
                    //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                    //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                    server.query('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");",(err,res)=>{

                    })
                })
                
                
            
            server.end
            })
        })();

        (async()=>{

            
            //console.log(h);
            const query4 = {
            text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+temp2.join('')+"';",
            rowMode: 'array'
            };
            //console.log(h);
            //console.log(h);
            var m = h
            const hussein = await server.query(query4,(err,res) => {
                
                data = res.rows
            
                
                data.forEach(row => {
                    //console.log(row)

                    //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[m]+");")
                    //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                    server.query('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[m]+");",(err,res)=>{

                    })
                })
                
                
            
            server.end
            })
        })();



        
    


/*
            for(var w=0;w<final.length;w++)
            {
                    //console.log(final.length)
                    const queryy = {
                        text: 'SELECT "courseCode" FROM public.course WHERE "courseName" ='+"'"+final[w]+"';",
                        rowMode: 'array'
                    };
                    //console.log(h);
                    //console.log(h);
                    var x = h
                   server.query(queryy,(err,res) => {
                        
                        data = res.rows
                       // console.log(err.message)
                        
                    
                        
                        data.forEach(row => {
                            //console.log(x)
                            console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                            //console.log('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");")
                            /*server.query('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");",(err,res)=>{
        
                            })
                        })
                        
                        
                    
                    server.end
                    })
                
            }
*/



            /*server.query('INSERT INTO public.prerequests("prerequests_C_Code", "course_ID")VALUES ('+`${row[0]}`+","+ code[x]+");",(err,res)=>{

            })*/



          
            



        }




        



        

    }











}
















/*
let x=0;
let courseCodeNew=[]
for (let z = 0; z < code.length; z++) {
    if()
    
}

var v=0
var b=0
var check=0
for(var q=0;q<ob.preName.length;q++)
{
    let temp = ob.preName[q]
    let temp2=[]
    
    for(var j=0;j<temp.length;j++)
    {
        if(temp[j]!=',')
        {
            temp2[v++] = temp[j]
        }
        else if(temp[j]==','){
            ob.newPreName[b++]=temp2.join('');
            temp2=""
            v=0
            check=1
        }
    }
    if(check!=1)
    {
        ob.newPreName[b++]=temp2.join('');
        temp2=""
        v=0
    }
    else{
        check=0
    }
    
    
}

console.log("------------------------------")
console.log(ob.newPreName)
console.log(ob.preName)*/















var c=0
for (let j = 0; j < code.length; j++) {
 
if(des[j]==undefined)
        {
            des[j]=""

        }

    if(hours[j]==undefined||hours[j]==" ")
    {
        hours[j]=0;
    }

}
    for( let l =0 ; l<des.length ; l++)
    {
        let temp =[];   
        let tempp = des[l]
        
        for(let m =0;m<tempp.length;m++)
        {
            if(tempp[m]!="'")
            {
                temp[c++]=tempp[m]
            }

        }
        des[l]=temp.join('')
        temp=""
        c=0
    }

for (let index = 0; index < code.length; index++) {
    
    
   /* var temp = []
    temp=code[0]
    var num = temp.toString()*/


    //console.log(num[0])

   // console.log(code.length)

        //console.log('INSERT INTO public.course("courseCode", "courseName", "courseDescription", "courseCreditHours", "courseType", "courseOutline")VALUES ('+code[index]+','+"'"+dep[index]+"'"+",'"+ des[index]+",'" +hours[index]+",'"+ cat[index]+ "',''"+');');

         //console.log('INSERT INTO public.courses("course_p_code", "course_c_code")VALUES ('+ProgramCode[i]+", "+code[index]+");");
         
        /*server.query('INSERT INTO public.course("courseCode", "courseName", "courseDescription", "courseCreditHours", "courseType", "courseOutline")VALUES ('+code[index]+','+"'"+dep[index]+"'"+",'"+ des[index]+"'," +hours[index]+",'"+ cat[index]+ "',''"+');',(err,res)=>{
            if(err){
                if(err.message=='duplicate key value violates unique constraint "course_pkey"')
                {

                }
                else{
                    console.log(err.message);
                console.log(ProgramCode[i]);
                console.log(code[index]);
                console.log(i);

                }
                
                
            }
        server.end;
        
        })*/
    
        
    
    
}
    
}


