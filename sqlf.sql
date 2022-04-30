create table user(
emaild varchar(30) primary key,
fname varchar(20),
lname varchar(20),
gender varchar(10),
address varchar(255),
dob date,
blood_group varchar(3),
is_admin int,
qual varchar(20),
password varchar(20),

);

create table phone(
uid int primary key,
phone1 varchar(15),
phone2 varchar(15),
foreign key(uid) references user(uid) on delete cascade on update cascade
);

create table license(
lid int auto_increment primary key,
lno varchar(20) not null unique,
uid int ,
idate date not null,
edate date not null,
foreign key(uid) references users(uid) on delete cascade on update cascade
);


create table has_vehicle(
uid int not null,
vid int not null unique,
foreign key(uid) references user(uid) on delete cascade on update cascade ,
foreign key(vid) references vehicle(vid) on delete cascade on update cascade ,
primary key(uid,vid)
);

create table vehicle(
vid int auto_increment primary key,
vmodel varchar(25),
vmake varchar(25), 
vyear date 

);

create table register(
regno int primary key,
reg_date date not null,
foreign key(regno) references vehicle(vid) on delete cascade on update cascade

);




create table fine(
fineid int primary key,
fine_amt int ,
fine_desc varchar(100),
fine_date timestamp,
location varchar(30)
foreign key(fineid) references vehicle(vid) on delete cascade on update cascade
);

create table login(
uid int primary key, 
email varchar(20) primary key,
password varchar(20) not null,
foreign key(uid) references user(uid) on delete cascade on update cascade
);

insert into vehicle values (1,1,1,2010,"BENZ");

insert into vmake values (1,"AUDI");
