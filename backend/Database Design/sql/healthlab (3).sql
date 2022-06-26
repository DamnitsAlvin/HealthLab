-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2022 at 10:10 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthlab`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment_request`
--

CREATE TABLE `appointment_request` (
  `Appointment_Id` varchar(30) NOT NULL,
  `Patient_id` varchar(30) NOT NULL,
  `Doctor_id` varchar(100) NOT NULL,
  `Appointment_date` varchar(10) NOT NULL,
  `Appointment_time` varchar(10) DEFAULT NULL,
  `Status` varchar(100) NOT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Mode` varchar(20) NOT NULL,
  `date_created` varchar(20) NOT NULL DEFAULT current_timestamp(),
  `Queue` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment_request`
--

INSERT INTO `appointment_request` (`Appointment_Id`, `Patient_id`, `Doctor_id`, `Appointment_date`, `Appointment_time`, `Status`, `Description`, `Mode`, `date_created`, `Queue`) VALUES
('PTR14515391', 'PTR5050', 'A.LIM50588', '2022-06-17', '09:00', '', NULL, 'Face to Face', '2022-06-14 21:40:01', 1),
('PTR21516833', 'PTR5050', 'A.LIM50588', '2022-06-23', '09:00', 'Accepted', 'painnnnn', 'Online', '2022-06-21 21:46:21', 1),
('PTR225137346', 'J.LOZANO5623', 'A.LIM50588', '2022-06-24', '09:00', 'Accepted', 'pain', 'Online', '2022-06-22 01:23:52', 1),
('PTR235142304', 'PTR5050', 'A.LIM50588', '2022-06-24', '09:30', 'Accepted', 'pain', 'Online', '2022-06-23 18:33:52', 2),
('PTR245144200', 'PTR5050', 'A.LIM50588', '2022-06-27', '09:00', 'Accepted', 'paiiiiiin', 'Face to Face', '2022-06-24 23:48:24', 1),
('PTR25516719', 'PTR5050', 'A.LIM50588', '2022-06-27', '09:30', 'Accepted', 'headache', 'Online', '2022-06-25 00:05:05', 2),
('STR265112226', 'PTR5050', 'ALVIN425721', '', NULL, '', 'XRay', '1', '2022-06-26 11:02:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `suffix` varchar(50) DEFAULT NULL,
  `birthday` varchar(50) NOT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `mode_of_consultation` int(1) NOT NULL,
  `is_verified` int(1) NOT NULL,
  `doctor_image` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `userType` varchar(20) NOT NULL DEFAULT 'doctor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`, `doctor_image`, `password`, `userType`) VALUES
('A.LIM50588', 'Roger', 'sy', 'Lim', '', '2022-06-15', '0926-593-2130', 'alvinlim794@gmail.com', 2, 1, '/uploads/A.LIM50588Image.png', 'gj', 'doctor'),
('A.LOZANO46961', 'Alvin', '', 'Lozano', '', '2022-06-09', '0924-239-7105', 'as@yhao.com', 1, 0, '/uploads/A.LOZANO46961Image.png', 'secret', 'doctor'),
('AA1', 'Arvie', '', 'Alcaraz', '', '1999-02-02', '0919-454-1234', 'arvie@gmail.com', 1, 0, '', 'arvie', 'doctor'),
('APBB1', 'Allan Patrick ', 'B', 'Balatan', '', '1999-03-07', '0914-434-9789', 'allan@gmail.com', 1, 0, '', 'allan', 'doctor'),
('C.ALVIN14948', 'Crister ', '', 'Alvin', '', '2022-06-03', '0924-239-7105', 'alvinlim22@email.com', 1, 0, '', 'secret', 'doctor'),
('C.ALVIN45417', 'Crister ', '', 'Alvin', '', '2022-06-11', '0924-239-7105', 'alvinlim22@gmail', 1, 0, '', 'secret', 'doctor'),
('C.PALUMPON18303', 'Casper', '', 'Palumpon', '', '2022-06-01', '0924-239-7105', 'cristerp@yahoo.com', 2, 0, '', 'secret', 'doctor'),
('CNP1', 'Crister ', 'N', 'Palumpon', '', '1999-12-08', '0919-191-9991', 'crister@gmail.com', 2, 0, '', 'crister', 'doctor'),
('FA1', 'Franco', '', 'Arambulo', '', '1999-04-18', '0919-451-7965', 'franco@gmail.com', 2, 0, '', 'franco', 'doctor'),
('GPC1', 'Gabriel', 'P', 'Castigador', '', '1999-01-22', '0914-134-3478', 'gabriel@gmail.com', 1, 0, '', 'gabriel', 'doctor'),
('J.LOZANO31878', 'Jonathan', '', 'Lozano', '', '2022-06-09', '0926-593-2130', 'jlozano@yahoo.com', 1, 0, '', 'secret', 'doctor'),
('J.PANAGSAGAN24210', 'Jerome', '', 'Panagsagan', '', '2022-06-03', '0924-239-7105', 'sc@example.com', 1, 0, '', 'secret', 'doctor'),
('JBP1', 'Jerome', 'Buenaventura', 'Panagsagan', '', '2000-05-08', '0919-004-1658', 'romesymaine@gmail.com', 1, 0, '', 'jerome', 'doctor'),
('JKPL1', 'Jonathan Kyle', 'P', 'Lozano', '', '1999-11-23', '0919-454-1991', 'jonathan@gmail.com', 1, 0, '', 'jonathan', 'doctor'),
('MCL1', 'Mark', 'C', 'Lagrimas', '', '1999-12-11', '0919-451-9745', 'mark@gmail.com', 2, 0, '', 'mark', 'doctor'),
('RPC1', 'Raymund', 'P', 'Cambronero', '', '2000-09-19', '0919-679-3790', 'raymund@gmail.com', 1, 0, '', 'raymund', 'doctor');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availabledateclinic`
--

CREATE TABLE `doctor_availabledateclinic` (
  `doctor_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `day` varchar(15) NOT NULL,
  `day_end` varchar(50) NOT NULL,
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_available_online`
--

CREATE TABLE `doctor_available_online` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `day` varchar(15) NOT NULL,
  `day_end` varchar(20) NOT NULL,
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_available_online`
--

INSERT INTO `doctor_available_online` (`doctor_id`, `id`, `day`, `day_end`, `time_start`, `time_end`) VALUES
('C.PALUMPON18303', 15, 'Monday', 'Monday', '11:27', '11:28'),
('A.LIM50588', 17, 'Monday', 'Monday', '14:13', '14:13');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_certification`
--

CREATE TABLE `doctor_certification` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `giver` varchar(50) NOT NULL,
  `date_given` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_certification`
--

INSERT INTO `doctor_certification` (`doctor_id`, `id`, `title`, `giver`, `date_given`) VALUES
('C.PALUMPON18303', 24, 'PSSP', 'PSSSP', '2022-06-17'),
('A.LIM50588', 26, 'PSSSSSP', 'PSSSS1', '2022-06-18');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_clinicaddress`
--

CREATE TABLE `doctor_clinicaddress` (
  `doctor_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `municipality` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip_code` int(6) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_clinicaddress`
--

INSERT INTO `doctor_clinicaddress` (`doctor_id`, `address_id`, `id`, `address`, `barangay`, `municipality`, `province`, `zip_code`, `image`) VALUES
('', 'C.PALUMPON18303', 0, 'ggggg', 'g', 'g', 'g', 0, ''),
('', 'A.LIM50588', 0, 'GGGGG', 'GG', 'GG', 'G', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_clinicinfo`
--

CREATE TABLE `doctor_clinicinfo` (
  `doctor_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `clinic_name` varchar(50) NOT NULL,
  `room_no` varchar(10) NOT NULL,
  `floor_no` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_contact_information`
--

CREATE TABLE `doctor_contact_information` (
  `doctor_id` varchar(50) NOT NULL,
  `contact_type` varchar(50) NOT NULL,
  `link_or_number` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_education`
--

CREATE TABLE `doctor_education` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `school_type` varchar(50) NOT NULL,
  `school_name` varchar(50) NOT NULL,
  `graduation_date` varchar(20) NOT NULL,
  `degree` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_education`
--

INSERT INTO `doctor_education` (`doctor_id`, `id`, `school_type`, `school_name`, `graduation_date`, `degree`, `course`) VALUES
('C.PALUMPON18303', 32, 'Medical School', 'TUP', '2022-06-03', 'Masteral', 'IT'),
('A.LOZANO46961', 35, 'Medical School', 'TUP', '2022-06-30', 'Doctorate', 'IT'),
('A.LIM50588', 36, 'Residence', 'TUP ', '2022-06-11', 'Bachelor', 'Bachelor of Science in CareComputer ');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_experience`
--

CREATE TABLE `doctor_experience` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `place_of_work` varchar(50) NOT NULL,
  `job_title` varchar(50) NOT NULL,
  `years_of_experience` int(4) NOT NULL,
  `date_ended` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_experience`
--

INSERT INTO `doctor_experience` (`doctor_id`, `id`, `place_of_work`, `job_title`, `years_of_experience`, `date_ended`) VALUES
('C.PALUMPON18303', 21, 'Makati Med', 'Nurse 5 ', 3, '2022-06-18'),
('A.LIM50588', 23, 'Makati Med', 'Nurse 2 ', 3, '2022-06-11');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_paymentinfo`
--

CREATE TABLE `doctor_paymentinfo` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `reference_name` varchar(100) NOT NULL,
  `reference_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_paymentinfo`
--

INSERT INTO `doctor_paymentinfo` (`doctor_id`, `id`, `payment_mode`, `reference_name`, `reference_number`) VALUES
('C.PALUMPON18303', 5, 'METROBANK', 'CRISTEEER', '23428971325'),
('A.LIM50588', 7, 'METROBANK', 'GGASDF', '2345346');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_specialty`
--

CREATE TABLE `doctor_specialty` (
  `doctor_id` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `specialties` varchar(50) NOT NULL,
  `sub-specialty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_specialty`
--

INSERT INTO `doctor_specialty` (`doctor_id`, `id`, `specialties`, `sub-specialty`) VALUES
('CNP1', 3, 'Neurology', 'Sakit ulo'),
('C.ALVIN14948', 8, 'Neurology', 'gg'),
('A.LIM50588', 9, 'General Medicine', 'GG'),
('A.LIM50588', 10, 'Neurology', 'Headaches');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_title`
--

CREATE TABLE `doctor_title` (
  `doctor_id` varchar(50) NOT NULL,
  `doctor_title` varchar(10) NOT NULL,
  `id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_title`
--

INSERT INTO `doctor_title` (`doctor_id`, `doctor_title`, `id`) VALUES
('C.ALVIN14948', 'FPNA', 16),
('C.ALVIN14948', 'CPA', 17),
('A.LIM50588', 'MD', 18),
('A.LIM50588', 'FPNA', 19);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `Patient_id` varchar(20) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Relationship` varchar(100) DEFAULT NULL,
  `Birthday` varchar(20) NOT NULL,
  `Gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`Patient_id`, `user_id`, `First_name`, `Last_name`, `Relationship`, `Birthday`, `Gender`) VALUES
('03425', 'PTR5050', 'xavier', 'sy', 'none', '2021-04-22', 'Male'),
('A.ALCARAZ12471', 'A.ALCARAZ12471', 'arvie', 'alcaraz', 'Self', '2021-04-22', 'Male'),
('A.LIM19844', 'A.LIM19844', 'Alvin', 'lim', 'Self', '2022-06-09', 'Male'),
('J.ALVIN46146', 'J.ALVIN46146', 'Jerome', 'Alvin', 'Self', '2022-06-10', 'Male'),
('J.LOZANO5623', 'J.LOZANO5623', 'Jonathan', 'Lozano', 'Self', '1999-11-23', 'Male'),
('J.PANAGSAGAN12116', 'J.PANAGSAGAN12116', 'Jerome', 'Panagsagan', 'Self', '2000-05-08', 'Male'),
('PTR5050', 'PTR5050', 'Alvin', 'Lim', 'Self', '2021-04-22', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `patient_previous_service`
--

CREATE TABLE `patient_previous_service` (
  `user_id` varchar(50) NOT NULL,
  `service_id` varchar(50) NOT NULL,
  `relationship_start` varchar(50) NOT NULL,
  `no_of_appointments` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `userType` varchar(20) NOT NULL DEFAULT 'service'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `name`, `is_verified`, `email`, `password`, `image`, `userType`) VALUES
('ALVIN425721', 'Alvin', 0, 'rengar@example.com', 'secret', '/uploads/ALVIN425721Image.png', 'service'),
('ALVIN431223', 'Alvin', 0, 'alvinlim22', 'secret', '/uploads/ALVIN431223Image.jpg', 'service'),
('DAV144', 'Davao-Makati Medical Center', 0, 'rengar@example.com', 'secret', '/uploads/DAV144Image.png', 'service'),
('SAM691', 'Sample Establishment ', 0, 'samp@samp.com', 'secret', '/uploads/SAM691Image.png', 'service');

-- --------------------------------------------------------

--
-- Table structure for table `service_available_time`
--

CREATE TABLE `service_available_time` (
  `service_id` varchar(50) NOT NULL,
  `id` int(20) NOT NULL,
  `open_time` varchar(20) NOT NULL,
  `closing_time` varchar(20) NOT NULL,
  `open_day` varchar(20) NOT NULL,
  `close_day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_available_time`
--

INSERT INTO `service_available_time` (`service_id`, `id`, `open_time`, `closing_time`, `open_day`, `close_day`) VALUES
('ALVIN425721', 59, '09:00', '10:00', 'Monday', 'Wednesday'),
('ALVIN425721', 60, '08:00', '12:00', 'Monday', 'Monday');

-- --------------------------------------------------------

--
-- Table structure for table `service_location`
--

CREATE TABLE `service_location` (
  `service_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `municipality` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip_code` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_location`
--

INSERT INTO `service_location` (`service_id`, `address_id`, `address`, `barangay`, `municipality`, `province`, `zip_code`) VALUES
('ALVIN425721', 'ADD1093118', 'camella', 'camella ', 'camella ', 'camella ', 5304),
('ALVIN425721', 'ADD3435755', 'cav', 'cav', 'cav', 'cav', 12432);

-- --------------------------------------------------------

--
-- Table structure for table `service_offered`
--

CREATE TABLE `service_offered` (
  `service_id` varchar(50) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_cost` int(7) NOT NULL,
  `service_waiting_time` varchar(50) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_offered`
--

INSERT INTO `service_offered` (`service_id`, `service_name`, `service_cost`, `service_waiting_time`, `Description`, `id`) VALUES
('ALVIN425721', 'X-RAY', 500, '2 days', 'adsfadsfa', 8),
('ALVIN425721', 'x-ray', 200, '5', 'inspection', 10);

-- --------------------------------------------------------

--
-- Table structure for table `service_payment_option`
--

CREATE TABLE `service_payment_option` (
  `service_id` varchar(50) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `reference_name` varchar(100) NOT NULL,
  `reference_number` varchar(100) NOT NULL,
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_payment_option`
--

INSERT INTO `service_payment_option` (`service_id`, `payment_mode`, `reference_name`, `reference_number`, `id`) VALUES
('ALVIN425721', 'GCASH', 'ALVIN', '543254236', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `First_name` varchar(30) NOT NULL,
  `Last_name` varchar(30) NOT NULL,
  `Middle_name` varchar(30) DEFAULT NULL,
  `Birthday` varchar(20) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Address_line1` varchar(50) NOT NULL,
  `Address_line2` varchar(50) NOT NULL,
  `Municipality` varchar(50) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `Civil_Status` varchar(15) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `userType` varchar(20) NOT NULL DEFAULT 'user',
  `userImage` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `First_name`, `Last_name`, `Middle_name`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_Status`, `Phone_Number`, `Email`, `Password`, `userType`, `userImage`) VALUES
('A.ALCARAZ12471', 'Arvie', 'Alcaraz', '', '1999-02-02', 'Male', 'pasay', 'pasay', 'pasay', 'manila', 'Married', '0914-434-2345', 'arvie@gmail.com', 'arvie', 'user', ''),
('A.BALATAN36637', 'Allan Patrick ', 'Balatan', 'B', '1999-03-07', 'Male', 'Camella', 'Bacoor', 'Cavite', 'Cavite', 'Married', '0914-434-9789', 'allan@gmail.com', 'allan', 'user', ''),
('A.LIM19844', 'Alvin', 'lim', '', '2022-06-09', 'Male', 'Block 6 Lot 8 Phase 1', 'Block 6 Lot 8 Phase 1', 'Block 6 Lot 8 Phase 1', 'Block 6 Lot 8 Phase 1', 'Single', '0926-593-2130', 'kcebu52@gmail.com', 'secret', 'user', ''),
('A.LIM38499', 'Alvin', 'Lim', 'Sy', '2022-05-16', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'CAVITE', 'Single', '+639265932130', 'alvinlim794@gmail.com.ph', 's', 'user', ''),
('A.LIM42223', 'Alvin', 'Lim', 'Sy', '2022-05-18', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'Single', '0926-593-2130', 'alvin378', 'secret', 'user', ''),
('A.LIM42683', 'Alvin', 'Lim', 'Sy', '2022-05-18', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'Single', '0926-593-2130', 'alvin378@gmail.com', 'secret', 'user', ''),
('A.LIM44788', 'Alvin', 'Lim', 'Sy', '2022-05-21', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'CAVITE', 'Single', '+639265932130', 'alvinlim794@gmail.com', 'secret', 'user', ''),
('C.PALUMPON31389', 'Crister ', 'Palumpon', 'N', '1999-12-08', 'Male', 'pacific woods', 'imus', 'cavite', 'cavite', 'Married', '0919-191-9991', 'crister@gmail.com', 'crister', 'user', ''),
('F.ARAMBULO1555', 'Franco', 'Arambulo', '', '1999-04-18', 'Male', 'Novaliches', 'Novaliches', 'Quezon city', 'manila', 'Married', '0914-434-9789', 'franco@gmail.com', 'franco', 'user', ''),
('G.CASTIGADOR8390', 'Gabriel', 'Castigador', 'P', '1999-01-22', 'Male', 'multinational', 'paranaque', 'paranaque', 'manila', 'Married', '0919-438-9532', 'gabriel@gmail.com', 'gabriel', 'user', ''),
('J.ALVIN46146', 'Jerome', 'Alvin', '', '2022-06-10', 'Male', 'Block 6 Lot 8 Phase 1', 'Block 6 Lot 8 Phase 1', 'Block 6 Lot 8 Phase 1', 'Lavanya Subdivision, Bacao 2', 'Single', '0926-593-2130', 'rengar@example.com', 'secret', 'user', ''),
('J.LOZANO5623', 'Jonathan', 'Lozano', 'P', '1999-11-23', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'CAVITE', 'Single', '09265932130', 'jonathan@gmail.com', 'secret', 'user', '/uploads/J.LOZANO5623Image.jpg'),
('J.PANAGSAGAN12116', 'Jerome', 'Panagsagan', 'B', '2000-05-08', 'Male', 'Lavanya subdivision', 'Lavanya subdivision', 'Lavanya subdivision', 'CAVITE', 'Single', '0924-239-7105', 'jeromep@gmail.com', 'secret', 'user', ''),
('M.LAGRIMAS34453', 'Mark Lawrence', 'Lagrimas', 'C', '1999-12-11', 'Male', 'Decena st', 'Pasay', 'Pasay', 'Manila', 'Married', '0919-451-9745', 'mark@gmail.com', 'mark', 'user', ''),
('PTR5050', 'Alvin sy', 'Lim', NULL, '2021-01-15', 'Male', 'Block 6 Lot 8', 'Greenwoods', 'General Trias', 'Cavite', 'Married', '09265932130', 'none@none.com.ph', 'secret11', 'user', '/uploads/PTR5050Image.png'),
('R.CAMBRONERO10814', 'Raymund', 'Cambronero', 'P', '2000-09-19', 'Male', 'Makati', 'Makati', 'Makati', 'Manila', 'Married', '0921-234-9723', 'raymund@gmail.com', 'raymund', 'user', '');

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `user_id` varchar(50) NOT NULL,
  `id` int(20) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `license_image` varchar(60) NOT NULL,
  `user` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment_request`
--
ALTER TABLE `appointment_request`
  ADD PRIMARY KEY (`Appointment_Id`),
  ADD KEY `Patient_id` (`Patient_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctor_availabledateclinic`
--
ALTER TABLE `doctor_availabledateclinic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_available_online`
--
ALTER TABLE `doctor_available_online`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_certification`
--
ALTER TABLE `doctor_certification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_education`
--
ALTER TABLE `doctor_education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_experience`
--
ALTER TABLE `doctor_experience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_paymentinfo`
--
ALTER TABLE `doctor_paymentinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_specialty`
--
ALTER TABLE `doctor_specialty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_title`
--
ALTER TABLE `doctor_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`Patient_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `patient_previous_service`
--
ALTER TABLE `patient_previous_service`
  ADD PRIMARY KEY (`user_id`,`service_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `service_available_time`
--
ALTER TABLE `service_available_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_location`
--
ALTER TABLE `service_location`
  ADD PRIMARY KEY (`service_id`,`address_id`);

--
-- Indexes for table `service_offered`
--
ALTER TABLE `service_offered`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_payment_option`
--
ALTER TABLE `service_payment_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor_availabledateclinic`
--
ALTER TABLE `doctor_availabledateclinic`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `doctor_available_online`
--
ALTER TABLE `doctor_available_online`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `doctor_certification`
--
ALTER TABLE `doctor_certification`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `doctor_education`
--
ALTER TABLE `doctor_education`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `doctor_experience`
--
ALTER TABLE `doctor_experience`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `doctor_paymentinfo`
--
ALTER TABLE `doctor_paymentinfo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `doctor_specialty`
--
ALTER TABLE `doctor_specialty`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctor_title`
--
ALTER TABLE `doctor_title`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `service_available_time`
--
ALTER TABLE `service_available_time`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `service_offered`
--
ALTER TABLE `service_offered`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service_payment_option`
--
ALTER TABLE `service_payment_option`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `verification`
--
ALTER TABLE `verification`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
