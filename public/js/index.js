function myFunction(event){
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById(event.id);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td") ; 
      for(j=0 ; j<td.length ; j++)
      {
        let tdata = td[j] ;
        if (tdata) {
          if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break ; 
          } else {
            tr[i].style.display = "none";
          }
        } 
      }
    }
}
    function active(even){
       even.classList.toggle('active');
    }
  
    function changeBack(element){
        element.style.borderBottom="3px solid #008088";
        if(element.id=='btn1'){
        document.getElementById('btn2').style.borderBottom="none";
        document.getElementById('complete_course').style.display="block";
        document.getElementById('semester_course').style.display="none";
        }
        else {
        document.getElementById('btn1').style.borderBottom="none";
        document.getElementById('complete_course').style.display="none";
        document.getElementById('semester_course').style.display="block";
        }
      }


      var IsSame=0;
      var myInput = document.getElementById("repeat");
      myInput.onkeyup = function() {
          let password = document.getElementById("password").value;
          let cnfrmPassword = document.getElementById("repeat").value;
          if( (password.length!=0) && (password == cnfrmPassword)){
                  document.getElementById("samePass").style.display = "block";
                  document.getElementById("NotsamePass").style.display = "none";
                  IsSame=1;
              }


              else if(cnfrmPassword.length==0){
                document.getElementById("samePass").style.display = "none";
                document.getElementById("NotsamePass").style.display = "none";
                IsSame=0;
              }
          else{
                  document.getElementById("NotsamePass").style.display = "block";
                  document.getElementById("samePass").style.display = "none";
                  IsSame=0;
              }
             
          }
          
      function checkEmpty(){
        var input = document.querySelectorAll('input');
        var count=0;
        for( var i = 0 ; i<input.length ; i++){
          if(input[i].value==""){
          input[i].style.borderLeft="3px solid red";
          input[i].style.color="red";
          count+=1;
          }
          else{
            input[i].style.borderLeft="3px solid #008088";
            input[i].style.color="#008088";
          }
        }
        if(input.length == count )
        alert('This form is empty. Please insert your information')

        else if(count!=0 && count!=input.length )
        alert('Please make sure to insert all necessary information ')

        else if(IsSame==0)
        alert('Please make sure your passward and repeat is the same')

      }
      var selected = 0;
      function Setselected(){
        selected=1;
      }
      
      function remove(){
        if(selected==1){
          document.getElementById('updateTableContent').style.display='none';
          document.getElementById('updateTableContentRemove').style.display='block';
        }
        else
        alert('please select table');
      }
      function remove2(){
        if(selected==1){
          document.getElementById('updateTableContent').style.display='block';
          document.getElementById('updateTableContentRemove').style.display='none';
        }
        else
        alert('please select table');
      }

      function view(){
        Setselected();
        document.getElementById('entryToComplete').style.display='block';
        document.getElementById('updateTableContent').style.display='block';
        document.getElementById('updateTableContentRemove').style.display='none';
        document.getElementById('tableType').innerHTML="semester course table";

      }
      function view2(){
        Setselected();
        document.getElementById('entryToComplete').style.display='none';
        document.getElementById('updateTableContent').style.display='block';
        document.getElementById('updateTableContentRemove').style.display='none';
        document.getElementById('tableType').innerHTML="complete course table";
      }
      
      
      
      
 
function hussein(){
  alert("hi")
}
    
