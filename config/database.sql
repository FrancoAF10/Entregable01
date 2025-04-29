CREATE DATABASE TIENDA;
USE TIENDA;

CREATE TABLE CATEGORIAS(
idcategoria			INT PRIMARY KEY AUTO_INCREMENT,
categoria		VARCHAR(50) NOT NULL
)ENGINE=INNODB;

CREATE TABLE SUBCATEGORIAS(
idsubcategoria					INT PRIMARY KEY AUTO_INCREMENT,
subcategoria		VARCHAR(50) NOT NULL,
idcategoria			INT,
CONSTRAINT fk_categoria FOREIGN KEY (idcategoria) REFERENCES CATEGORIAS(idcategoria)
)ENGINE=INNODB;

CREATE TABLE MARCAS(
idmarca				INT PRIMARY KEY AUTO_INCREMENT,
marca				VARCHAR(50) NOT NULL,
idsubcategoria		INT,
CONSTRAINT fk_subcategoria FOREIGN KEY (idsubcategoria) REFERENCES SUBCATEGORIAS(idsubcategoria)
)ENGINE=INNODB;

CREATE TABLE PRODUCTOS(
idproducto			INT PRIMARY KEY AUTO_INCREMENT,
precio				DECIMAL(7,2) NOT NULL,
modelo				VARCHAR(50) NOT NULL,
fechaRegistro		DATE NOT NULL,
fotografia			VARCHAR(200) NOT NULL,
idmarca				INT,
CONSTRAINT fk_marca FOREIGN KEY (idmarca) REFERENCES MARCAS(idmarca)
)ENGINE=INNODB;





INSERT INTO CATEGORIAS(categoria)VALUES("Hombre");
INSERT INTO SUBCATEGORIAS(subcategoria,idcategoria)VALUES("Camisas",1);
INSERT INTO SUBCATEGORIAS(subcategoria,idcategoria)VALUES("Pantalones",1);

INSERT INTO MARCAS(marca,idsubcategoria)VALUES("Zara",1);
INSERT INTO MARCAS(marca,idsubcategoria)VALUES("Levi’s",2);

INSERT INTO PRODUCTOS(precio,modelo,fechaRegistro,fotografia,idmarca)VALUES(125.50,"Slim Fit","2025-04-28","URL",1);
INSERT INTO PRODUCTOS(precio,modelo,fechaRegistro,fotografia,idmarca)VALUES(125.50,"Skinny","2025-04-28","URL",2);

SELECT * FROM PRODUCTOS;
DELETE FROM PRODUCTOS;