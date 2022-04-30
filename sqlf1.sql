create table users(
uid int primary key auto_increment,
fname varchar(20),
lname varchar(20),
gender varchar(10),
address varchar(255),
dob date,
blood_group varchar(3),
nos int,
qual varchar(20)
);

create table login(
uid int,
is_admin varchar(10),
email varchar(50) unique,
password varchar(20),

foreign key(uid) references users(uid) on delete cascade on update cascade
);

create table license(

lno varchar(20) primary key,
uid int unique,
idate date not null,

foreign key(uid) references users(uid) on delete cascade on update cascade
);


create table vehicle(
vid int auto_increment primary key,
vmake_id int not null,
uid int not null,
year int,
vmodel varchar(20),
foreign key (uid) references users(uid) on delete cascade on update cascade,
foreign key (vmake_id) references vmake(vmake_id) on delete cascade on update cascade
);


create table vmake(
vmake_id int primary key,
v_make varchar(30) 
)

create table registers(
regno varchar(20) primary key,
location varchar(20),
vid int unique ,
reg_date date,
foreign key (vid) references vehicle (vid) on delete cascade on update cascade
);

create table fine(
fid int auto_increment primary key,
amount int,
location varchar(20),
fine_date date,
fine_desc varchar(255),
strike int,
vid int,
foreign key (vid) references vehicle (vid) on delete cascade on update cascade
); 



insert into vehicle values (1,1,36,2010,"A3");


  create view final1 as select users.fname,users.lname,login.email,license.lno,DATE_ADD(license.idate, INTERVAL 5 YEAR) as expdate,users.address,users.dob,users.blood_group,users.nos,registers.regno,license.idate,vehicle.vid,fine.amount
 from users 
 inner join login on users.uid = login.uid

 left join license on users.uid = license.uid
 left join vehicle on users.uid = vehicle.uid
 left join registers on vehicle.vid = registers.vid
 left join fine on vehicle.vid = fine.vid;

CREATE TRIGGER nos1
BEFORE UPDATE ON users 
FOR EACH ROW 
BEGIN 
  IF (NEW.nos >3) 
  THEN
            delete from license where NEW.uid=license.uid;
            SET NEW.nos = 0;
            
  END IF;
END; 









create view fines as
select login.email,fine.amount,fine.location,fine.fine_date,fine .fine_desc from login 
inner join users on users.uid=login.uid
inner join vehicle on users.uid = vehicle.uid
inner join fine on vehicle.vid =fine.vid;





select users.fname,users.lname,login.email,license.lno,users.address,users.dob,users.blood_group,registers.regno,license.idate,vehicle.vid,fine.amount,fine.location,fine.fine_date,fine .fine_desc
 from users 
 inner join login on users.uid = login.uid

 left join license on users.uid = license.uid
 left join vehicle on users.uid = vehicle.uid
 left join registers on vehicle.vid = registers.vid
 left join fine on vehicle.vid = fine.vid;

details[result.fname,result.lname]

1)
Select count(*),year(fine_date) from fine group by year(fine_date);

2)
Select count(*) from vehicle group by year;






select registers.regno from registers inner join vehicle on vehicle.vid = registers.vid inner join users on users.uid = vehicle.uid where registers.

















h1>JOIN US</h1>

<p class="lead">Enter your email to join <strong>518</strong> 
others on our waitlist. We are 100% not a cult. </p>

<form method="POST" action='/register'>
 <input type="text"  name="email" class="form" placeholder="Enter Your Email">
 <label>Password :</label>
    <input type="password" name="password">
 <input type="text"  name="fname" class="form" placeholder="Enter Your first name">
  <input type="text"  name="lname" class="form" placeholder="Enter Your last name">
 <label>GENDER : <select name = "gen"><option>MALE</option><option>FEMALE</option></label>

<label>Date of Birth :</label>
			<input type="date" name="dob">
				<input type="text" name="address">Address </input>
				<label>Blood Group : <select name="bgo"><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select></label><br>
		
			<button>submit</button>

</form>