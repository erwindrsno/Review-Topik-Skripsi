Drop table if EXISTS `role`;
Drop table if EXISTS `user`;
Drop table if EXISTS `TopikSkripsi`;
Drop table if EXISTS `Review`;

CREATE TABLE `role` (
  `IdRole` int NOT NULL,
  `NamaRole` varchar(50) NOT NULL,
  PRIMARY KEY(`IdRole`)
);
    
INSERT INTO `role` (`IdRole`, `NamaRole`) VALUES
(1, 'Admin'),
(2, 'Dosen'),
(3, 'Mahasiswa');

CREATE TABLE `user` (
  `IdUser` int NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(16) NOT NULL,
  `IdRole` int NOT NULL,
  PRIMARY KEY(`IdUser`),
  CONSTRAINT `fk_role` FOREIGN KEY(`IdRole`) REFERENCES `role`(`IdRole`)
);

INSERT INTO `user` (`IdUser`, `Nama`, `Email`, `Password`, `IdRole`) VALUES
(1, 'Mariskha', 'mariskha@unpar.ac.id', 'admin', 1);

CREATE TABLE `TopikSkripsi` (
  `judul` VARCHAR(50), 
  `namaDosen` VARCHAR(20), 
  `kodeTopik` CHAR(10), 
  `bidangPeminatan` CHAR(2), 
  `jenisSkripsi` VARCHAR(10),
  PRIMARY KEY(`kodeTopik`)
);

CREATE TABLE `Review` (
  `IdReview` int NOT NULL,
  `komentar` VARCHAR(50),
  `pertanyaan` VARCHAR(50),
  PRIMARY KEY(`IdReview`)
);

