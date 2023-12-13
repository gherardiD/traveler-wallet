SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `account` (
  `ID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cognome` varchar(25) NOT NULL,
  `nome` varchar(25) NOT NULL,
  `data_nascita` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `account` (`ID`, `cognome`, `nome`, `data_nascita`, `telefono`, `email`, `password`) VALUES
(1, 'Oberti', 'Boris', '1977-10-26', '081/140336', 'boris.ardengo@teletu.it', 'BS27rozdD52D'),
(3, 'Pirandelli', 'Barnaba', '1963-07-17', '011/597834', 'barnaba.pirandelli@aruba.it', 'ZG15kctkR56A'),
(4, 'Asinari', 'Piera', '2001-06-15', '045/510012', 'piera.asinari@teletu.it', 'GW23jqttU72P'),
(5, 'Zanco', 'Guglielmo', '1952-02-20', '0131/527077', 'guglielmo.zanco@katamail.it', 'IN37nqbzF54I'),
(6, 'Ardovini', 'Valeria', '1994-09-05', '010/409715', 'valeria.ardovini@gmail.it', 'FT00mmxaI51F'),
(7, 'Danova', 'Goffredo', '2020-04-27', '070/343016', '', 'NL30lefzP74I'),
(8, 'Aiana', 'Ildebrando', '1959-11-29', '031/186551', 'ildebrando.aiana@hotmail.com', 'RD89bjhyX80D'),
(9, 'Tarantino', 'Mattia', '1985-07-28', '0761/150121', 'mattia.tarantino@tele2.it', 'XY06bzplC95J'),
(10, 'Rosellini', 'Rosa', '1962-12-19', '0422/940930', 'rosa.rosellini@virgilio.it', 'BN20doosW02B'),
(11, 'Gherardi', 'Daniele', '2005-04-26', '3207256463', 'dani.ghera05@gmail.com', 'daniele');

CREATE TABLE `movement` (
  `ID` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL,
  `VALUTA_COD` varchar(10) NOT NULL,
  `TIPO` varchar(20) NOT NULL,
  `AMMONTARE` int(11) NOT NULL,
  `DATA` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE movement 
ADD FOREIGN KEY (ACCOUNT_ID)
REFERENCES account(ID);

CREATE TABLE `valuta` (
  `COD` varchar(10) PRIMARY KEY NOT NULL,
  `NOME` varchar(25) NOT NULL,
  `SIMBLO` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE movement 
ADD FOREIGN KEY (VALUTA_COD)
REFERENCES valuta(COD);

INSERT INTO `valuta` (`COD`, `NOME`, `SIMBLO`) VALUES
('CHF', 'franco svizzero', 'CHF'),
('DKK', 'corona danese', 'DKK'),
('EUR', 'euro', '€'),
('GBP', 'sterlina britannica', '£'),
('NOK', 'Corona norvegese', 'kr'),
('RUB', 'rublo russo', '₽'),
('SEK', 'Corona svedese', 'kr'),
('USD', 'dollaro', '$');

INSERT INTO `movement` (`ID`, `ACCOUNT_ID`, `VALUTA_COD`, `TIPO`, `AMMONTARE`, `DATA`) VALUES
(1, 5, 'eur', 'salary', 5000, '2023-11-01'),
(2, 5, 'eur', 'technology', -1000, '2023-11-02'),
(3, 5, 'eur', 'extra', 100, '2023-11-03'),
(4, 1, 'eur', 'food', -500, '2023-11-04'),
(5, 5, 'CHF', 'extra', 200, '2023-11-06'),
(6, 5, 'DKK', 'tip', 300, '2023-11-06');

-- try CREATE TABLE IF NOT EXISTS `abuses`

-- DROP TABLE movement;
-- DROP TABLE account;
-- DROP TABLE valuta;