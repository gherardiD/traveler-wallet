SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `account` (
  `ID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cognome` varchar(25) NOT NULL,
  `nome` varchar(25) NOT NULL,
  `data_nascita` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(260) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `account` (`cognome`, `nome`, `data_nascita`, `telefono`, `email`, `password`) VALUES
('Gherardi', 'Daniele', '2005-04-26', '3207256463', 'dani.ghera05@gmail.com', '679ab793796da4cbd0dda3d0daf74ec1');

CREATE TABLE IF NOT EXISTS `movement` (
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

CREATE TABLE IF NOT EXISTS `valuta` (
  `COD` varchar(10) PRIMARY KEY NOT NULL,
  `NOME` varchar(25) NOT NULL,
  `SIMBOLO` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE movement 
ADD FOREIGN KEY (VALUTA_COD)
REFERENCES valuta(COD);

INSERT INTO `valuta` (`COD`, `NOME`, `SIMBOLO`) VALUES
('CHF', 'franco svizzero', 'CHF'),
('DKK', 'corona danese', 'DKK'),
('EUR', 'euro', '€'),
('GBP', 'sterlina britannica', '£'),
('NOK', 'Corona norvegese', 'kr'),
('RUB', 'rublo russo', '₽'),
('SEK', 'Corona svedese', 'kr'),
('USD', 'dollaro', '$');

-- INSERT INTO `movement` (`ID`, `ACCOUNT_ID`, `VALUTA_COD`, `TIPO`, `AMMONTARE`, `DATA`) VALUES
-- (1, 5, 'eur', 'salary', 5000, '2023-11-01'),
-- (2, 5, 'eur', 'technology', -1000, '2023-11-02'),
-- (3, 5, 'eur', 'extra', 100, '2023-11-03'),
-- (4, 1, 'eur', 'food', -500, '2023-11-04'),
-- (5, 5, 'CHF', 'extra', 200, '2023-11-06'),
-- (6, 5, 'DKK', 'tip', 300, '2023-11-06');

-- DROP TABLE movement;
-- DROP TABLE account;
-- DROP TABLE valuta;
