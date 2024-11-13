create table users(
  id serial primary key,
  name varchar(20),
  email varchar(20),
  dob date,
  location varchar(20)
);

create table activities(
  id serial primary key,
  user_id integer,
  caption varchar(20),
  location varchar(20),
  requested_on date,
  completed boolean,
  points integer
);


create table tasks (

  id serial primary key,
  activity_id integer,
  description varchar(50),
  completed boolean
);

create role dbconn with login password '<Enter Pwd Here>'
grant insert, select, update on users to dbconn
grant insert, select, update on activities to dbconn;
grant insert, select, update on tasks to dbconn;

grant usage on sequence users_id_seq TO dbconn;
grant usage on sequence activities_id_seq TO dbconn;
grant usage on sequence tasks_id_seq TO dbconn;