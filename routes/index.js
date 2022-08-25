var express = require('express');
var router = express.Router();
//var connect_py = require('../rout_py');
const client = require('../dbConnect');
const server = client;
const bodyParser = require("body-parser");
const util = require("util")
const wait = util.promisify(setTimeout);

var checkAdmin = 0
var checkAdminPass = 0
var checkStu = 0
var checkStuPass = 0


var omar = []

var HeadOfDepartment = {
  name:'',
  job:'',
  numberOfStudent:0,
  programCodeNum:[''],
  numberOfProgram:0,
  students:[''],
  studentsMajor:[''],
  studentsId:[''],
  studentsMobile:[''],
  studentsEmail:[''],
  stu:{
    name:[''],
    id:['']
  }
}
var studentData = {
  name:'',
  email:'',
  programCode:'',
  programName:'',
  id:''
  
}

var Colleg = {
  collegName:[''],
  collegNum:[''],
  collegePrograms:['']
}


var Programss = {
  programname: [''],
  programcode:['']
}





var rate = ""
  var hours = ""
async function start (res,name){
    var c = 0
    var x = 0
    var t = 0
    var b = 0
    var check = 0
    
    const getCollegeName =  {text: 'SELECT * FROM public."college" ',rowMode: 'array'};
    const getProgramsName = {text: 'SELECT * FROM public."Programs" ',rowMode: 'array'};
    

    
      var idLogIn_Head =  server.query(getCollegeName,(err,res) => {

        data = res.rows
        //console.log(data)
  
        data.forEach(n=>{
          //console.log(n)
  
          Colleg.collegName[c++] = n[1]
          Colleg.collegNum[x++] = n[0]
          
  
        })
        check++
        
      })
      

      var getPrograNams =  server.query(getProgramsName,(err,res) => {
  
        data = res.rows
  
        data.forEach(h=>{
          Programss.programname[t++] = h[1]
          Programss.programcode[b++] = h[0]
  
        })
  
        
          
        
      })
      await wait(500)
    
      

      
    

    c = 0
    x = 0
    t = 0
    b = 0
    console.log("hi stars ..............")


    res.render(name,{ob:Colleg.collegName,programs:Programss.programname,name:studentData.name,program:studentData.programName});

    
    
    
  
}



async function stuInStart(res){
  
  for (var i = 0;i<HeadOfDepartment.numberOfStudent;i++){
    res.render('studentInAdmin',{stuName:HeadOfDepartment.name[i]})

  }
  
}

async function stuInfo(s,stID){
  var pro=""
  var coll = ""
  var name = ""
  
    const getProgram = {text: 'SELECT  "programName" FROM public."Programs" INNER JOIN public."Student" on public."Programs"."programCode" = public."Student"."has_P_Code" where public."Student"."studentID"='+stID+';',rowMode: 'array'};
    const getName= {text: 'SELECT  "studentName" FROM public."Student"  where "studentID"='+stID+';',rowMode: 'array'};
    
    server.query(getProgram,(err,res)=>{
      pro = res.rows
    })

    server.query(getName,(err,res)=>{
      name = res.rows
    })

    await wait(100)
    const getCollege= {text: 'SELECT  "collegeName" FROM public."college" INNER JOIN public."Programs" on public."college"."collegeNumber" = public."Programs"."has_C_Num" where public."Programs"."programName"='+"'"+pro+"';",rowMode: 'array'};


    server.query(getCollege,(err,res)=>{
      coll = res.rows
    })

    await wait(100)


    s.render('studentInAdmin' , {name , coll, pro });

    

  


  
}


var calc 
var hours
var numb
var idd = ['']
var data
var aha
var y ='SELECT * FROM public.course where "courseCode"='
async function resTrans(res,pro){
  var connect_py = require('../rout_py');
  aha = connect_py.passVal(studentData.programName,pro)
  await wait(25000)
  aha.then(val=>{
    hours = val.hour
    numb = val.num
    idd = val.id
    
  })

  const getCalcHour =  {text: 'SELECT  num_com FROM public."Student" where "studentID" = '+studentData.id+";",rowMode: 'array'};

  server.query(getCalcHour,(err,res)=>{

    calc = res.rows

  })
  await wait(100)

  if(idd.length>0)
{
    for(var i= 0;i<idd.length;i++)
    {
        if(i==idd.length-1)
        {
            y += idd[i]
        }
        else{
            y += idd[i]
            y+= ' or "courseCode"='
    
        }
    }

    const geth =  {text: y,rowMode: 'array'};
    server.query(geth,(err,res)=>{
      data = res.rows
    })

    await wait(100)
    y ='SELECT * FROM public.course where "courseCode"='

    res.render('viewTransferResult',{name:studentData.name,program:studentData.programName,calc,hours,numb,data})












}
else{
  res.render('viewTransferResult',{name:studentData.name,program:studentData.programName,calc,hours,numb})
}

  

}

async function selectTrans(res,name,coll){
  
  const getRate = {text: 'SELECT  "acceptanceRate" FROM public."Programs" where "programName" = '+"'"+name+"';",rowMode: 'array'};
  const getHours = {text: 'SELECT  "programCreditHours" FROM public."Programs" where "programName" = '+"'"+name+"';",rowMode: 'array'};
 

  server.query(getRate,(err,r)=>{
    
    rate = r.rows
    
    
  })


  server.query(getHours,(err,r)=>{
    
    hours = r.rows
    
  })
  await wait(200)

  res.render('Transfer',{rate:rate,hours:hours,namee:name,name:studentData.name,program:studentData.programName})
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Graduation Project' });
});


router.get('/main', function(req, res, next) {
  
  res.render('main');

  
});

router.get('/register', function(req, res, next) {
  
  start(res,"register")
});

router.post('/register',(req,s,next)=>{
  start(s,"register")
})


router.post('/user', (req, s, next)=>{
  //console.log(req.body)

  var logID =req.body.id;
  var logPass = req.body.pas;
  
  
  (async()=>{
    
    const getID = {text: 'SELECT  "employeeID" FROM public."Employee";',rowMode: 'array'};

    const getIDSt = {text: 'SELECT  "studentID","password" FROM public."Student";',rowMode: 'array'};

    const getPass = {text: 'SELECT  "password" FROM public."Employee" WHERE "employeeID"='+logID+";",rowMode: 'array'};

    const getName = {text: 'SELECT  * FROM public."Employee" WHERE "employeeID"='+logID+";",rowMode: 'array'};

    const getNameStu = {text: 'SELECT  * FROM public."Student" WHERE "studentID"='+logID+";",rowMode: 'array'};

    const getProgramCode = {text: 'SELECT  "programCode" FROM public."Programs" WHERE "head"='+logID+";",rowMode: 'array'};

    var t=0

    const getProgramCodeFromStudents = {text: 'SELECT  * FROM public."Student" ',rowMode: 'array'};


    

    const idLogIn_Head = await server.query(getID,(err,res) => {

        
      data = res.rows

      data.forEach(element => {
        if(element==logID){checkAdmin=1}});

      if(checkAdmin==1)
      {
        console.log("id is exist .....")

        

          const passLogIn =  server.query(getPass,(err,res) => {
        
            data = res.rows
  
            data.forEach(element => {
              if(element==logPass){checkAdminPass=1}
            });
  
            if(checkAdminPass==1)
            {
              bodyParser.urlencoded({extended:true})
              var data = ''
              var c=0
              var l =0
              let numStu = 0
              
              let programCodee = []
              const nameAdmin =  server.query(getName,(err,res) => {
                LOGIN_LOGOUT = 1
                data = res.rows
            
                data.forEach(row=>{
                  //console.log(row)
                  HeadOfDepartment.name = row[1]
                  HeadOfDepartment.job = row[5]
                  
                  s.redirect('user/'+row[1])
                  
                  
                  
                  
                  
                  
                })
                
                
                
              })

              const programID =  server.query(getProgramCode,(err,res) => {
          
                data = res.rows
                
                HeadOfDepartment.numberOfProgram = res.rowCount
            
                data.forEach(row=>{
                  
                  programCodee[c++]=row
 
                })
                HeadOfDepartment.numberOfProgram = c

                

                
                const program_student =   server.query(getProgramCodeFromStudents,(err,res) => {
          
                  data = res.rows
                  //omar = res.rows
                  

                  
                  for(let i =0;i<c;i++)
                  {
                    data.forEach(row=>{
                      
                      if(row[7]==programCodee[i])
                      {
                        omar.push(row)
                        console.log(row)
                        numStu+=1
                        HeadOfDepartment.numberOfStudent++
                        HeadOfDepartment.students[t]=row[1]
                        HeadOfDepartment.studentsMajor[t]= "cs"
                        HeadOfDepartment.studentsId[t]=row[0]
                        HeadOfDepartment.studentsMobile[t]=row[5]
                        HeadOfDepartment.studentsEmail[t]=row[2]
                        HeadOfDepartment.stu.name[t] = row[1]
                        HeadOfDepartment.stu.id[t] = row[0]
                        t++


                        //console.log(row[0]+"       "+programCodee[i])
                      }

                    })
                    
                    
                  }

                })
              })
    
                HeadOfDepartment.numberOfStudent = numStu

              c=0

            }

            else
            {

              console.log("ERROR Admin Password...")

            }
  
  
  
        
          })


        

        







      }
      else
      {
        console.log("id dose not exist .....")
      }

    })



    const idLogIn_stu = await server.query(getIDSt,(err,res) => {

        
      data = res.rows

      data.forEach(element => {
        if(element[0]==logID){checkStu=1}});

        console.log(checkStu)

      if(checkStu==1)
      {
        console.log("id is exist .....")
        
  
            data.forEach(element => {
              if(element[1]==logPass){checkStuPass=1}
            });

            console.log(checkStuPass)

            if(checkStuPass==1)
            {
              
              
              
              
              const stu =  server.query(getNameStu,(err,res) => {
          
                data = res.rows
            ////////////////////////////////////////////////////////////////////////////////
                data.forEach(row=>{
                 
                  studentData.name = row[1]
                  studentData.programCode = row[7]
                  studentData.email = row[2]
                  studentData.id = row[0]
                  
                  
                })
                const getProgramName = {
                  text: 'SELECT  "programName" FROM public."Programs" WHERE "programCode"='+studentData.programCode+";",
                  rowMode: 'array'};

                const prName = server.query(getProgramName,(err,res)=>{
                  data = res.rows
                  
                  data.forEach(row=>{
                    studentData.programName = row[0]
                    
                  })
                })
                s.redirect('user/'+studentData.name)
               


                
                
                
              })

              

            }

            else
            {

              console.log("ERROR Admin Password...")

            }
  

        

          
        
            
  
  
        

        

        







      }
      else
      {
        console.log("id dose not exist .....")
      }

    })







  })();server.end
  

})

router.post('/courses', (req, s, next)=>{
  s.redirect("user/courses")
})

var barham
var abd
var deema
async function cor__(res){

  const or= {text: 'SELECT public."course"."courseCode","courseName", "courseDescription" , "courseCreditHours" ,"courseType" ,"courseOutline" FROM public."course" INNER JOIN public."Completed Cource" ON public."Completed Cource"."C_ID" =  public."course"."courseCode" WHERE public."Completed Cource"."S_ID" ='+ studentData.id+';',rowMode: 'array'};

  server.query(or,(err,res)=>{
    barham = res.rows
  })
  await wait(100)

  const orr= {text: 'SELECT  num_com FROM public."Student" where "studentID" ='+studentData.id+';',rowMode: 'array'};

  server.query(orr,(err,res)=>{
    abd = res.rows

  })
  await wait(100)

  const orrr = {text: 'SELECT  "programCreditHours" FROM public."Programs" where "programName" ='+"'"+studentData.programName+"';",rowMode: 'array'};

  server.query(orrr,(err,res)=>{
    deema = res.rows
  })
  await wait(100)




  


  res.render('Course',{name:studentData.name,program:studentData.programName,email:studentData.email,barham,abd,deema});
  
}

router.get('/user/courses', function(req, res, next) { 
  cor__(res)
})




router.get('/alternCourse', function(req, res, next) {
  
  res.render('alternCourse');
  
});

router.get('/Transfer', function(req, res, next) {
  
 start(res,"Transfer")
  
});

router.post('/Transfer',  function (req, res, next)  {
  var name = req.body.maj;
  var coll = req.body.coll;

  selectTrans(res,name,coll)

});








var dataaa
async function order_admin(res){
  const or= {text: 'SELECT * FROM public."order";',rowMode: 'array'};
  server.query(or,(err,res)=>{
    dataaa = res.rows
  })
  await wait(200)

  res.render('AdminDhash',{name:HeadOfDepartment.name,job:HeadOfDepartment.job,numStudent:HeadOfDepartment.numberOfStudent,xx:dataaa});
}




router.get('/user/:ob', function(req, res, next) { 

  if(checkAdmin==1){
    order_admin(res)
  }
  else if(checkStu==1)
  {
    res.render('userDhash',{name:studentData.name,program:studentData.programName,email:studentData.email});
    
  }
  else{

  }

  
});





router.get('/logout',  function (req, res, next)  {
  omar = []
  
  checkAdmin = 0
  checkAdminPass = 0
  checkStu = 0
  checkStuPass = 0
  req.logout
  delete req.session;  
  res.render('main')
  
});
router.get('/Request',  function (req, res, next)  {
  
  
  res.render('showRequest',{name:HeadOfDepartment.name,job:HeadOfDepartment.job});
  
});

router.get('/Stu',  function (req, res, next)  {
  
  
  res.render('Students',{name:HeadOfDepartment.name,job:HeadOfDepartment.job,stuName:HeadOfDepartment.students,stuMobile:HeadOfDepartment.studentsMobile,st:HeadOfDepartment.stu,omar:omar})
  
});


router.post('/stuInfo',  function (req, res, next)  {
  var id = req.body.id
 
  stuInfo(res,id)
 
  
  
  
});


router.post('/courses/:name', function(req, res, next) {
  
  res.redirect('Course')
  
});
router.get('/userDhash',  function (req, res, next)  {
  
  
  res.render('userDhash',{name:studentData.name,program:studentData.programName,email:studentData.email});
  
});


router.get('/order',  function (req, res, next)  {
  
  
  res.render('order');
  
});
var proTrans  = ""
router.get('/TransResult/:proName',  function (req, res, next)  {
   proTrans= req.params.proName
 
  resTrans(res,proTrans)
  
  
});

var student_id 
var student_Name = ""

var student_gba 
var student_email 
var student_phone 
var student_pass 
var student_coll 
var student_maj 
var student_aca 
var student_compleat 
var student_maj_num 

async function reg(res,ok){
  var check = 0
  if(ok==0)
  {
    const getMajNum= {text: 'SELECT  "programCode" FROM public."Programs"  where "programName"='+"'"+student_maj+"';",rowMode: 'array'};
    server.query(getMajNum,(err,r)=>{
      student_maj_num = r.rows
      console.log(student_maj_num)
      console.log(getMajNum)
    })
    await wait(100)
    var data
    const getcourcses= {text: 'SELECT public."course"."courseCode","courseName", "courseDescription" , "courseCreditHours" ,"courseType" ,"courseOutline" FROM public."course" INNER JOIN public."courses" ON public."courses"."course_c_code" =  public."course"."courseCode" WHERE public."courses"."course_p_code" = '+student_maj_num+";",rowMode: 'array'};
    console.log(getcourcses)
    server.query(getcourcses,(err,r)=>{
      if(!err)
      {
        data = r.rows
      }else{
        console.log(err)
        console.log(getcourcses)
        res.redirect('Register')
      }
       
    })
    await wait(200)
    
  }
  else if(ok==1)
  {
    
    const insertStu= {text: 'INSERT INTO public."Student"("studentID", "studentName", "studentEmail", "highSchoolRate", "studentMobile", "has_P_Code", password ) VALUES ('+student_id+",'"+ student_Name+"','"+ student_email+"',"+ student_gba+","+ student_phone+","+ student_maj_num+","+ student_pass+");",rowMode: 'array'};
    server.query(insertStu,(err,r)=>{
      if(!err)
      {
        check = 1
      }else{
        console.log(err)
        console.log(insertStu)
        res.redirect('Register')
      }
    })
    await wait(100)
    student_Name = ""

  
    res.render('semister',{student_compleat,student_maj,student_coll,data})




  }
  await wait(1000)
  
  if(check != 1)
  {
    check = 0
    res.render('Register2',{student_compleat,student_maj,student_coll,data})
  }
  
  
  
}
router.post('/register2',  function (req, res, next)  {
  student_id = req.body.idS
  student_Name += req.body.fname
  student_Name += " "
  student_Name += req.body.lname
  student_gba = req.body.gba
  student_email = req.body.emailS
  student_phone = req.body.phone
  student_pass = req.body.pass
  student_coll = req.body.coll
  student_maj = req.body.maj
  student_aca = req.body.acaY
  student_compleat = req.body.comH
  reg(res,0)
});


var complete = {
  courseNum : ['']
}
async function insert_complete(res,data){
 
  reg(res,1)
  await wait(500)
    var i =0
    data.forEach(s =>{
      complete.courseNum[i] = s
      i++
    })

    await wait(100)
  
  
    for(var i = 0; i<complete.courseNum.length;i++)
    {
      const insertComplete= {text: 'INSERT INTO public."Completed Cource"("C_ID", "S_ID")VALUES ('+complete.courseNum[i]+","+ student_id+");",rowMode: 'array'};
      console.log('INSERT INTO public."Completed Cource"("C_ID", "S_ID")VALUES ('+complete.courseNum[i]+","+ student_id+");")
      server.query(insertComplete,(err,res)=>{
      })
      
      await wait(100)
    }
  
  await wait(100)
  res.render('semister')
  
}


router.post('/simester',  function (req, res, next)  {
  var data = req.body.check
  insert_complete(res,data)
  
  

  
});


async function ok_trans(res){

  const order= {text: 'INSERT INTO public."order"( my_pro, trans_pro, stu_id, stu_name, status) VALUES ('+"'"+studentData.programName+"','"+ proTrans+"',"+ studentData.id+",'"+ studentData.name+"','Tranfer Major');",rowMode: 'array'};
  server.query(order,(err,s)=>{
    if(err)
    {
      console.log(order)
    }
  })
  await wait(100)

  res.render('userDhash',{name:studentData.name,program:studentData.programName,email:studentData.email});
  
}
router.get('/trans',  function (req, res, next)  {
  ok_trans(res)
  
});














var xx
async function infoo(res,x){
  const get_info= {text: 'SELECT * FROM public."order" where stu_id ='+x,rowMode: 'array'};

  server.query(get_info,(err,res)=>{
    xx = res.rows
  })
  await wait(100)

  res.render('requestAdmin',{xx})

}

router.post('/reqAdmin/:x',  function (req, res, next)  {
  var data = req.params.x
  infoo(res,data)
});




var trans_num
var date
async function accept(f){
  const pro_num= {text: 'SELECT "programCode" FROM public."Programs" where "programName" = '+"'"+proTrans+"';",rowMode: 'array'};

  server.query(pro_num,(err,res)=>{
    trans_num = res.rows
  })
  await wait(100)
  const ubdate_stu= {text: 'UPDATE public."Student" SET  "has_P_Code"='+trans_num+",num_com="+hours+' WHERE "studentID"='+studentData.id+";",rowMode: 'array'};
  server.query(ubdate_stu,(err,res)=>{

  })
  await wait(100)

  const delete_com= {text: 'DELETE FROM public."Completed Cource";',rowMode: 'array'};
  server.query(delete_com,(err,res)=>{

  })
  await wait(100)
  var insert_com
  for(var i = 0;i<idd.length;i++)
  {
    insert_com= {text: 'INSERT INTO public."Completed Cource"( "C_ID", "S_ID") VALUES ('+idd[i]+"," +studentData.id+");",rowMode: 'array'};

    server.query(insert_com,(err,res)=>{

    })
    
  }
  await wait(200)
  const delete_order= {text: 'DELETE FROM public."order" WHERE stu_id ='+studentData.id+";" ,rowMode: 'array'};

  server.query(delete_order,(err,res)=>{

  })
  await wait(100)



  const or= {text: 'SELECT * FROM public."order";',rowMode: 'array'};
  server.query(or,(err,res)=>{
    date = res.rows
  })
  await wait(200)

  f.render('AdminDhash',{name:HeadOfDepartment.name,job:HeadOfDepartment.job,numStudent:HeadOfDepartment.numberOfStudent,xx:date});

}

router.get('/accept/:x',  function (req, res, next)  {
  
  accept(res)
  
});








var dat
async function zz(res){
  const delete_order= {text: 'DELETE FROM public."order" WHERE stu_id ='+studentData.id+";" ,rowMode: 'array'};

  server.query(delete_order,(err,res)=>{

  })
  await wait(100)

  const or= {text: 'SELECT * FROM public."order";',rowMode: 'array'};
  server.query(or,(err,res)=>{
    dat = res.rows
  })
  await wait(200)

  res.render('AdminDhash',{name:HeadOfDepartment.name,job:HeadOfDepartment.job,numStudent:HeadOfDepartment.numberOfStudent,xx:dat});

}

router.get('/decline/:x',  function (req, res, next)  {
  zz(res)
});


router.get('/cansle/:x',  function (req, res, next)  {
  res.render('AdminDhash',{name:HeadOfDepartment.name,job:HeadOfDepartment.job,numStudent:HeadOfDepartment.numberOfStudent,xx:dataaa});
  
});

module.exports = router