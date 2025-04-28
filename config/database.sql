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
precio				VARCHAR(50) NOT NULL,
modelo				VARCHAR(50) NOT NULL,
fechaRegistro		DATE NOT NULL,
fotografia			VARCHAR(200) NOT NULL,
idmarca				INT,
CONSTRAINT fk_marca FOREIGN KEY (idmarca) REFERENCES MARCAS(idmarca)
)ENGINE=INNODB;

CREATE VIEW vista_productos AS
SELECT
		PD.idproducto,
        CT.categoria,
        SC.subcategoria,
        MC.marca,
        PD.precio,
        PD.modelo,
        PD.fechaRegistro,
        PD.fotografia
FROM PRODUCTOS PD
INNER JOIN MARCAS MC ON PD.idmarca=MC.idmarca
INNER JOIN SUBCATEGORIAS SC ON PD.idsubcategoria=SC.idsubcategoria
INNER JOIN CATEGORIAS CT ON PD.idcategoria=CT.idcategoria;

INSERT INTO CATEGORIAS(categoria)VALUES("vestimenta");
INSERT INTO SUBCATEGORIAS(subcategoria,idcategoria)VALUES("pantalones",1);
INSERT INTO MARCAS(marca,idsubcategoria)VALUES("LEVI'S",1);
INSERT INTO PRODUCTOS(precio,modelo,fechaRegistro,fotografia,idmarca)VALUES(125.50,"jeans","2025-04-28","URL",1);