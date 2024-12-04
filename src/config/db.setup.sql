create table users(
  id serial primary key,
  name varchar(50),
  email varchar(50),
  dob date,
  location varchar(50)
);

create table activities(
  id serial primary key,
  user_id integer,
  caption varchar(200),
  location varchar(50),
  requested_on date,
  completed boolean,
  points integer
);


create table tasks (

  id serial primary key,
  activity_id integer,
  description varchar(500),
  completed boolean
);

create role dbconn with login password '<Enter Pwd Here>'
grant insert, select, update on users to dbconn
grant insert, select, update on activities to dbconn;
grant insert, select, update on tasks to dbconn;

grant usage on sequence users_id_seq TO dbconn;
grant usage on sequence activities_id_seq TO dbconn;
grant usage on sequence tasks_id_seq TO dbconn;