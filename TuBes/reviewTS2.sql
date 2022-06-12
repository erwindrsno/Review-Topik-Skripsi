Drop table if EXISTS `review`;
Drop table if EXISTS `topikSkripsi`;
Drop table if EXISTS `user`;
Drop table if EXISTS `role`;
Drop table if EXISTS `periode`;

CREATE TABLE `role` (
  `idRole` int NOT NULL,
  `namaRole` varchar(50) NOT NULL,
  PRIMARY KEY(`idRole`)
);
    
INSERT INTO `role` (`idRole`, `namaRole`) VALUES
(1, 'Admin'),
(2, 'Dosen'),
(3, 'Mahasiswa');

CREATE TABLE `user` (
  `idUser` varchar(15),
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(16) NOT NULL,
  `idRole` int NOT NULL,
  PRIMARY KEY(`idUser`),
  CONSTRAINT `fk_role` FOREIGN KEY(`idRole`) REFERENCES `role`(`idRole`)
);

INSERT INTO `user` (`idUser`, `nama`, `email`, `password`, `idRole`) VALUES
(1, 'Mariskha', 'mariskha@unpar.ac.id', 'admin', 1);

CREATE TABLE `topikSkripsi` (
  `idDosen` varchar(15),
  `judul` VARCHAR(50), 
  `kodeTopik` CHAR(10), 
  `bidangPeminatan` CHAR(2), 
  `jenisSkripsi` VARCHAR(10),
  `statusFinal` VARCHAR(10),
  PRIMARY KEY(`kodeTopik`),
  CONSTRAINT `fk_idDosen` FOREIGN KEY(`idDosen`) REFERENCES `user`(`idUser`)
);

CREATE TABLE `review` (
  `idReviewer` varchar(15),
  `idTopik` CHAR(10),
  `idReview` int NOT NULL,
  `komentar` VARCHAR(250),
  `pertanyaan` VARCHAR(250),
  `jawaban` VARCHAR(250),
  `status` VARCHAR(10),
  PRIMARY KEY(`idReview`),
  CONSTRAINT `fk_idReviewer` FOREIGN KEY(`idReviewer`) REFERENCES `user`(`idUser`),
  CONSTRAINT `fk_idTopik` FOREIGN KEY(`idTopik`) REFERENCES `topikSkripsi`(`kodeTopik`)
);

CREATE TABLE `periode` (
  `idPeriode` int NOT NULL,
  `semester` VARCHAR(10), 
  `tahunAjar` VARCHAR(10), 
  PRIMARY KEY(`idPeriode`)
);