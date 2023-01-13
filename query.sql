CREATE DATABASE membuat_api;

CREATE TABLE categorys(
    id INT PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE products(
    id INT PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    color VARCHAR NOT NULL,
    size VARCHAR NOT NULL,
    stock INT NOT NULL,
    rating VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    id_category INT REFERENCES categorys ON DELETE CASCADE,
    foreign key (id_category) REFERENCES categorys(id_category)
);

CREATE TABLE customers(
    id INT PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone INT NOT NULL,
    tgl_lahir DATE NOT NULL,
    email VARCHAR NOT NULL,
    pw VARCHAR NOT NULL
);
insert into customers(id,name,phone,tgl_lahir,email,pw) 
values(1,'rizal',08123,'1997-06-30','rizalyuniar123@gmail.com','rahasia123');


-- create
insert into products(id,name,price,color,size,stock,rating,description) 
values(1,'baju muslim pria',60000,'white','m',4,'sangat bagus','ini adalah baju muslim pria'),
(2,'baju batik pria',100000,'black','l',7,'bagus','ini adalah baju batik pria');
insert into categorys(id,name) values(1,'baju');

ALTER TABLE categorys ADD CONSTRAINT fk_categorys_products FOREIGN KEY (id_category) REFERENCES categorys (id_category);
-- ALTER TABLE products ADD fk_categorys FOREIGN KEY id_category REFERENCES categorys(INT) AFTER description;
-- get detail by id
select * from products where id=1;
-- update
update products
set price=70000,
stock=7
where id=1;
-- delete
delete from products where id=4;