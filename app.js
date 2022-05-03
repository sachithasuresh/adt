var express=require('express');
var app=express();
var bodyParser = require("body-parser");
//var JSAlert = require("js-alert");
var mysql = require('mysql');
var bodyParser=require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('static'));

//var popup = require('popups');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'vrushab',  //your username
  password: 'aman@123',
  database : 'adt',
  multipleStatements: true        //the name of your db
});

var status;

app.get("/",function(req,res){
    
res.render('landing');
});    
app.get("/update",function(req,res){
    
res.render('update1',{status:""});
});
app.get("/delete",function(req,res){
    
res.render('delete1',{status:""});
});

app.get("/login",function(req,res){
    
res.render('login2',{status:""});
});

//app.get("/loggedin",function(req,res){
  //  res.render("loggedin",{status:""});
//});
app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/vehicle",function(req,res){
    res.render("vehicle",{status:""});
});

app.get("/fine",function(req,res){
    res.render("fine1",{status:""});
});

app.get("/registers",function(req,res){
    res.render("registered",{status:""});
});

app.get("/delete",function(req,res){
    res.render("delete1",{status:""});
});

app.get("/issuelicense",function(req,res){
   res.render("adminview1",{status:""}); 
});

app.get("/details",function(req,res){
 connection.query("select users.fname,users.lname,login.email,license.lno,users.address,users.dob,users.blood_group,users.nos,registers.regno,license.idate,vehicle.vid,fine.amount from users inner join login on users.uid = login.uid left join license on users.uid = license.uid left join vehicle on users.uid = vehicle.uid left join registers on vehicle.vid = registers.vid left join fine on vehicle.vid = fine.vid where login.is_admin = 'User';",function(err1,result){  
console.log(result)
res.render('details',{res:result});
});
});

app.get("/stat",function(req,res){
    var info=[];
    var labels=[];
    var values=[];
    var colors=["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#808000","#FFFF00"];
        connection.query("Select count(*) as cnt,year(fine_date) as yfd from fine group by year(fine_date)",function(err1,res3)
    {
         connection.query("Select count(*) as cnt2 ,year from vehicle group by year",function(err2,res4)
    {  
         connection.query("select sum(amount) as cnt3,flocation from fine group by flocation",function(err3,res5)
    {
    for(let i=0;i<res3.length;i++){
        values.push(res3[i].cnt);
        labels.push(res3[i].yfd);
    }
     info.push(JSON.stringify({
      labels:   labels,
      colors: colors.slice(0,res3.length-1),
      values:values,
      title:"Fine collected every year"
    }))
    labels=[];
    values=[];
    for(let i=0;i<res4.length;i++){
        values.push(res4[i].cnt2);
        labels.push(res4[i].year);
    }
     info.push(JSON.stringify({
      labels:   labels,
      colors: colors.slice(0,res4.length-1),
      values:values,
      title:"Vehicles registered every year"
    }))

    labels=[];
    values=[];
    for(let i=0;i<res5.length;i++){
        values.push(res5[i].cnt3);
        labels.push(res5[i].flocation);
    }
     info.push(JSON.stringify({
      labels:   labels,
      colors: colors.slice(0,res5.length-1),
      values:values,
      title:"Fine collected in every city"
    }))
    
    res.render("statistics1",{status:"",infos:info});
    
    });
    
    });
    
    });
});    

app.post('/issuelicense', function(req,res){
    
    var email=req.body.email;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var euid;
  connection.query('SELECT login.uid from login inner join users on login.uid=users.uid where login.email = ? AND fname = ? AND lname = ? ',[email,fname,lname], function (err, results)
    {  
        if(err){
           var status = 'swal("Invalid details")';
        
        res.render("adminview1",{status:status})
        }
        else if(results.length == 0)
        {
           var status = 'swal("Invalid Details","User Not Found","warning",{button:"Try Again",})';
           
        res.render("adminview1",{status:status})
        
        }
        else
        {
            console.log(results[0].uid)
            euid=results[0].uid;
            var newissue=
            {   
              uid:euid,        
              lno:req.body.lno,
              idate:req.body.idate
            };
            console.log(newissue)
            connection.query('INSERT INTO license SET ? ',newissue, function(err, res2) {
 if(err)
 {
 
        var status = 'swal("Invalid entry","Check again if the same license number already exists/the user already has a license","warning",{button:"Try Again",})' ;
        res.render("adminview1",{status:status})
        
 }
 else
 {
     
   var status = 'swal("Done","License issued successfully","success")' ;
        res.render("adminview1",{status:status})
 //console.log(results);
 
 }
 });
            
        }
    });  
});//close of license-post

app.post('/registered', function(req,res){
    var vid;
    var email=req.body.email;
    var fname=req.body.fname;
    var lname=req.body.lname;
    
    
    var year=req.body.year;
    var euid;
 connection.query('SELECT login.uid from login inner join users on login.uid=users.uid where login.email = ? AND fname = ? AND lname = ? ',[email,fname,lname], function (err, results)
    {  
        if(err){
        var status = 'swal("Error",Incorrect details provided","error")' ;
        res.render("registered",{status:status});
            
        }
        else if(results.length == 0)
        {
        var status = 'swal("Invalid Details","User Not Found","warning",{button:"Try Again",})' ;
        res.render("registered",{status:status});
        }
        else
        {
            //console.log(results[0].uid)
            euid=results[0].uid;
            var newvehicle=
            {   
               
              vmake_id:req.body.vmake_id,
              uid:euid,
              year:req.body.year,
              vmodel:req.body.vmodel
              
            };
            
           connection.query("INSERT INTO vehicle SET ? ",newvehicle, function(err, res2) {
 if(err)
 {
   console.log(err)
    var status = 'swal("Warning","wrong vmake id","warning",{button:"Try Again",})' ;
        res.render("registered",{status:status})
 }
 else
 {
 console.log("New vehicle entered")
  
  connection.query('SELECT vid from vehicle ORDER BY vid DESC LIMIT 1',function(err,res3){

   if(err)
 {
     console.log(err);
 }
 vid=res3[0].vid;
 console.log(vid)

 var newreg={
   regno:req.body.regno,
   location:req.body.loc,
   vid:vid,
   reg_date:req.body.reg_date
 };

connection.query('INSERT INTO registers SET ?',newreg,function(err,res4){
   if(err)
   {
       var status = 'swal("wrong registration details","Check if RegNo already exists","error","{button:"Try Again",})' ;
        res.render("registered",{status:status})
   }
   else
   {
       var status = 'swal("Done","Vehicle registered successfully","success")';
        res.render("registered",{status:status})
}
});  //close of register-insertion connection

});  //close of VID selection query to extend the scope of variable
}     //close of 'else' of error-check condition in vehicle insertion.
});   //and close of its corresponding connection
}     //close of 'else' of user-existing condition
});   //close of UID selection query to have its 'else' till above

    
});  //close of post-route  


//UPDATE

app.post('/update',function(req,res){
    
    var    fname = req.body.fname;
    var     lname = req.body.lname;
    var email=req.body.email;
    var    address = req.body.address;
    var qual = req.body.qual; 
    
    connection.query('SELECT login.uid from login inner join users on login.uid=users.uid where login.email = ? AND fname = ? AND lname = ? ',[email,fname,lname], function (err, results)
    {  
        if(err){
       var status = 'swal("Check Again","Incorrect details","error",{button:"Try Again",})' ;
        res.render("update1",{status:status})}
        else if(results.length == 0)
        {
        var status = 'swal("Invalid Details","User Not Found","warning",{button:"Try Again",})' ;
        res.render("update1",{status:status})
        }
        else
        {
            var efuid;
            efuid=results[0].uid;
    
    connection.query("update users set address=?,qual=? where uid= ?",[address,qual,efuid],function(err, res2) {
        if(err)
        console.log(err);
        else
       var status = 'swal("Done","Updated sucessfully","success")' ;
        res.render("update1",{status:status})
    });
        }
    });
});
app.post('/delete',function(req,res){
    
    var    fname = req.body.fname;
    var     lname = req.body.lname;
    var email=req.body.email;
    
    connection.query('SELECT login.uid from login inner join users on login.uid=users.uid where login.email = ? AND fname = ? AND lname = ? ',[email,fname,lname], function (err, results)
    {  
        if(err){
            var status = 'swal("Check Again","Incorrect details","error",{button:"Try Again",})' ;
        res.render("delete1",{status:status})
        }
       
        else if(results.length == 0)
        {
          var status = 'swal("Invalid Details","User Not Found","warning",{button:"Try Again",})' ;
        res.render("delete1",{status:status})
        }
        else
        {
            var efuid;
            efuid=results[0].uid;
       
        connection.query("delete from users where uid= ?",[efuid],function(err, res2) {
        if(err)
        console.log(err);
        else
          var status = 'swal("Done","Deleted sucessfully","success")' ;
          res.render("delete1",{status:status})
    })
        }
});

});

app.post('/fine', function(req,res){

   var newfine={
   amount : req.body.famt,
   flocation : req.body.locn,
   fine_date : req.body.fdate,
   fine_desc : req.body.fdesc,
   strike : req.body.strike,
    vid :req.body.vid
   };
   var vehid=req.body.vid;
   
     connection.query('INSERT INTO fine SET ? ',newfine,function(err,result){
   if(err)
   { console.log(err)
    var status = 'swal("Error","vehicle not recognized","error",{button:"Try Again",})' ;
          res.render("fine1",{status:status})   
   }
   else
   {  
          var status = 'swal("Done","Fine issued successfully","success")' ;
          res.render("fine1",{status:status})  
   
        connection.query("Select uid from vehicle where vid = ?",[vehid],function(err1,res1)
        {
            
        connection.query('UPDATE users set nos=nos+1 where uid = ?',res1[0].uid ,function(err2,res2){
           console.log("Incremented") 
            res.render("fine1",{status:""}) 
        });
        });
   }
     }); 
});

//USER AUTHENTICATION

app.post("/loggedin",function(req,res){

var email= req.body.email;
  var password = req.body.password;
  var is_admin=req.body.is_admin;
  connection.query('SELECT * FROM login WHERE email =?',[email], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
  }else if(results.length >0){
      if(results[0].password == password)
    {    console.log("Login Successful");
        if(is_admin==results[0].is_admin)
        {
            if(results[0].is_admin=="User")
            
          connection.query('SELECT * FROM  final1 where email =?',[email], function (error, res4) 
          { 
            connection.query('select login.email,fine.amount,fine.flocation,fine.fine_date,fine .fine_desc from login inner join users on users.uid=login.uid inner join vehicle on users.uid = vehicle.uid inner join fine on vehicle.vid =fine.vid where email = ?',[email],function(error,res5)
            {
            console.log(res5)
             
             var fines=[]
             for(var i=0;i<res5.length;i++)
             {
                 fines.push(JSON.stringify({
                     "amount":res5[i].amount,
                     "flocation":res5[i].flocation,
                     "date":(""+res5[i].fine_date).substr(4,11),
                     "desc":res5[i].fine_desc
                     
             }))
             }
             
             console.log(fines);
                var status='swal("Welcome","You are now logged in!","success")' 
             res.render("userview",{res:res4,status:status,fines:fines,datetrim:(""+res4[0].dob).substr(4,12),nos:"/strike-"+res4[0].nos+".png",issuedatetrim:(""+res4[0].idate).substr(4,12),expdate:(""+res4[0].expdate).substr(4,12),fcap:(""+res4[0].fname).toUpperCase(),lcap:(""+res4[0].lname).toUpperCase()});
             // res.render("loggedin1",{fname:res4[0].fname,lname:res4[0].lname,email:res4[0].email,lno:res4[0].lno,address:res4[0].address,dob:res4[0].dob,blood_group:res4[0].blood_group,result:res4})
            });            
          });
         
            
        else if(results[0].is_admin=="Admin")
            //res.redirect("/loggedin")
            {
                var status='swal("Welcome","Admin Login successful","success",{button:"Proceed",})';
            res.render("adminview1",{status:status})
            } 
        }
        else
        {
        var status='swal("Invalid Login details","Wrong user or admin type selected","error",{button:"Try Again",})';
         res.render("login2",{status:status})
        }
            
        }
      else{
          var status = 'swal("Check Again", "The Email/password you have entered is incorrect","error",{button:"Try Again",})' ;
        res.render("login2",{status:status})
          }
    }
    else{
        var status='swal("Sorry!","User not found","error",{button:"Try Again",})';
    res.render("login2",{status : status})
   
           
    }
  
  });

});


app.post('/register', function(req,res){

 var userid;
 var person = {
     
     fname: req.body.fname,
     lname: req.body.lname,
     dob : req.body.dob,
     blood_group : req.body.bgo,
     address:req.body.address,
     gender : req.body.gen,
     qual : req.body.qual,
  };
 
 connection.query('INSERT INTO users SET ?', person, function(err, results) {
 if(err)
 {
     console.log(err);
 }
 console.log(results);
 
 });
 
 connection.query('SELECT uid from users ORDER BY uid DESC LIMIT 1',function(err,res2){

   if(err)
 {
     console.log(err);
 }
 userid=res2[0].uid;

 var logger={
   uid:userid,
   is_admin:"User",
   email:req.body.email,
   password:req.body.password
 };

connection.query('INSERT INTO login SET ?',logger,function(err,result5){
   if(err)
   {
       console.log(err);
   }
   else
   {     var status='swal("Done","Thank you for signing up","success")';
        console.log(status);
        res.render("login2",{status : status})    
       
   }
});
});
});
//closing of outer select query to not lose scope of userid
app.post("/fined",function(req, res) {
})
app.listen(process.env.PORT,function()
{
  console.log(`Server running on :${process.env.PORT}!`);
});