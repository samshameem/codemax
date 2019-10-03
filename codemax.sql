-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2019 at 12:43 PM
-- Server version: 5.7.26
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codemax`
--

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
CREATE TABLE IF NOT EXISTS `manufacturer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`id`, `name`) VALUES
(1, 'Tata'),
(2, 'Ford'),
(24, 'Maruti'),
(25, 'Honda');

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model_name` varchar(255) NOT NULL,
  `color` varchar(100) NOT NULL,
  `year` year(4) NOT NULL COMMENT 'manufacturing year',
  `reg_number` varchar(100) NOT NULL,
  `note` text NOT NULL,
  `pic_1` text,
  `pic_2` text NOT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `sold` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `manufacturer_id` (`manufacturer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`id`, `model_name`, `color`, `year`, `reg_number`, `note`, `pic_1`, `pic_2`, `manufacturer_id`, `sold`) VALUES
(1, 'ada', 'aasd', 2013, 'asdsa', 'asds', 'C:\\fakepath\\screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18.png', 'C:\\fakepath\\screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23.png', 24, 0),
(2, 'asda', 'asd', 2014, 'asd', 'asd', '../src/assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23-20190930125904.png', '../src/assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18-20190930125904.png', 2, 0),
(3, 'asdasd', 'asdd', 2014, 'asd', 'dasd', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23-20190930011049.png', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18-20190930011049.png', 24, 0),
(4, '800', 'red', 2014, 'ssssss', 'aaa', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18-20190930013620.png', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23-20190930013620.png', 24, 0),
(5, '800', 'white', 2016, 'gggg', 'asds', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18-20190930013652.png', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23-20190930013652.png', 24, 0),
(6, 'Mustang', 'red', 2017, 'ka05ec2000', 'Nothing', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_24_18-20191001114601.png', 'assets/uploads/screenshot-www.deadlinkchecker.com-2019.09.09-10_36_23-20191001114601.png', 2, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `model_ibfk_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
