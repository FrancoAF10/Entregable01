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





INSERT INTO CATEGORIAS(categoria) VALUES 
  ("Hombre"),
  ("Mujer"),
  ("Niños"),
  ("Deportivo"),
  ("Formal");



INSERT INTO SUBCATEGORIAS(subcategoria, idcategoria) VALUES 
  ("Camisas", 1),
  ("Pantalones", 1),
  ("Casacas", 1),
  ("Polos", 1),
  ("Faldas", 2),
  ("Short", 2),
  ("Blusas", 2),
  ("Leggins", 2),
  ("Pijamas", 3),
  ("Chalecos", 3),
  ("Chompas", 3),
  ("Buzos", 4),
  ("Ropa Térmica", 4),
  ("Zapatillas", 4),
  ("Sudaderas", 4),
  ("Ternos", 5),
  ("Blazers", 5),
  ("Zapatos de vestir", 5),
  ("Camisas Formales", 5),
  ("Pantalones de vestir", 5);



INSERT INTO MARCAS(marca, idsubcategoria) VALUES 
  ("Zara", 1), ("Tommy Hilfiger", 1), ("GAP", 1), ("Uniqlo", 1),
  ("Levi’s", 2), ("Dockers", 2), ("Wrangler", 2), ("Lee", 2),
  ("H&M", 3), ("Forever 21", 3), ("Bershka", 3), ("Stradivarius", 3),
  ("LACOSTE", 4), ("Pull&Bear", 4), ("Old Navy", 4), ("Topshop", 4),
  ("Nike", 5), ("Abercrombie", 5), ("The North Face", 5), ("Columbia", 5),
  ("Adidas", 6), ("Reebok", 6), ("New Balance", 6), ("Converse", 6),
  ("Puma", 7), ("Under Armour", 7), ("Fila", 7), ("Everlast", 7),
  ("Hugo Boss", 8), ("Armani", 8), ("Gucci", 8), ("Valentino", 8),
  ("Calvin Klein", 9), ("Van Heusen", 9), ("Brooks Brothers", 9), ("Arrow", 9),
  ("Massimo Dutti", 10), ("Perry Ellis", 10), ("Banana Republic", 10), ("Express", 10);


