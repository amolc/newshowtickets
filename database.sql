-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 24, 2017 at 10:24 PM
-- Server version: 5.5.40
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mango`
--

-- --------------------------------------------------------

--
-- Table structure for table `quote`
--
paymenttype: 'Credit Card',
  qty: '1',
  deliverycharge: 5,
  productprice: 30,
  totalprice: 35,
  productname: 'Alphonso Mango',
  productsku: '0001',
  ordername: 'Amol Chawathe',
  orderemail: 'ceo@80startups.com',
  orderphone: '92408380',
  orderaddress1: '8-54 Paya Lebar Road',
  orderaddress2: '60 Paya Lebar Square',
  orderpostalcode: '409051',
  stripeToken: 'tok_1AGmJV2MCnW9BxNlXOrZX558' }

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `ordername` varchar(200) CHARACTER SET latin1 NOT NULL,
  `orderemail` varchar(200) CHARACTER SET latin1 NOT NULL,
  `orderphone` varchar(200) CHARACTER SET latin1 NOT NULL,
  `orderaddress1` varchar(200) CHARACTER SET latin1 NOT NULL,
  `orderaddress2` varchar(200) CHARACTER SET latin1 NOT NULL,
  `orderpostalcode` varchar(200) CHARACTER SET latin1 NOT NULL,
  `productprice` varchar(200) CHARACTER SET latin1 NOT NULL,
  `deliverycharge` varchar(200) CHARACTER SET latin1 NOT NULL,
  `qty` varchar(200) CHARACTER SET latin1 NOT NULL,
  `totalprice` varchar(200) CHARACTER SET latin1 NOT NULL,
  `status` varchar(200) CHARACTER SET latin1 NOT NULL,
  `stripeToken` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quote`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
