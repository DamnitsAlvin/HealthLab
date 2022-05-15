-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2021 at 04:33 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

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
drop database if exists healthlab ;
create database healthlab; 
use healthlab;

CREATE TABLE `appointment_request` (
  `Appointment_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Doctor_id` int(100) NOT NULL,
  `Appointment_date` date NOT NULL,
  `Appointment_time` time(6) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Mode` varchar(100) NOT NULL,
  `Link` varchar(100) NOT NULL,
  `Notes` varchar(100) NOT NULL,
  `Room_no` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `Doctor_Employee_ID` varchar(255) NOT NULL,
  `Specialization` varchar(100) NOT NULL,
  `Sub_Specialization` varchar(100) NOT NULL,
  `Room_no` int(100) NOT NULL,
  `Licence_no` int(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `PRT_no` int(100) NOT NULL,
  `doctor_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`Doctor_Employee_ID`, `Specialization`, `Sub_Specialization`, `Room_no`, `Licence_no`, `Status`, `PRT_no`, `doctor_image`) VALUES
('1', 'Pediatrician ', 'Pediatric Hematology/Oncology', 994, 239485, 'available', 23423, 'img/team/1.jpg'),
('2', 'Dentistry', 'Oral and Maxillofacial Pathology', 443, 462, 'available', 234, 'img/team/2.jpg'),
('3', 'General Health', 'Family Medicine', 2004, 23946755, 'Available', 4345112, './img/doctor/d1.jpg'),
('4', 'OB-GYNE', 'Maternal Health', 442, 6547477, 'Available', 234672, './img/doctor/d1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_fee`
--

CREATE TABLE `doctors_fee` (
  `Appointment_Request_ID` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Doctor_id` int(100) NOT NULL,
  `Date_issued` date NOT NULL,
  `Amount` varchar(100) NOT NULL,
  `Mode_of_Payment` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Employee_Id` varchar(100) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Birthday` varchar(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Civil_Status` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone_number` varchar(100) NOT NULL,
  `Role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Employee_Id`, `First_name`, `Last_name`, `Birthday`, `Gender`, `Address`, `Civil_Status`, `Email`, `Phone_number`, `Role`) VALUES
('1', 'Alvin ', 'Lim ', '03-22-2000', 'Male', 'this is an address ', 'Single ', '@email', '09265932130', 'Doctor '),
('2', 'Crister ', 'Palumpon', '03-22-2000', 'Male', 'this is another address ', 'Single', '@email.com', '09265932130', 'Doctor'),
('3', 'Jerome', 'Panagsagan', '03/22/00', 'Male', 'Sample Address', 'Single', 'sampleemail@email.com', '09265932130', 'Doctor'),
('4', 'Jonathan', 'Lozano', '03/22/2000', 'Male', 'sample address', 'Single', 'sampleemail@email.com', '09345842935', 'Doctor');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `Facility_Number` int(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Facility_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `facilities_desc`
--

CREATE TABLE `facilities_desc` (
  `Facility_number` int(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Room_No` int(100) NOT NULL,
  `Is_occupied` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `family_history`
--

CREATE TABLE `family_history` (
  `Fam_history_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Fam_history_data` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `Lab_id` int(100) NOT NULL,
  `Lab_request_id` int(100) NOT NULL,
  `Date_occupied` date NOT NULL,
  `Time_occupied` time(6) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab_bill`
--

CREATE TABLE `lab_bill` (
  `Lab_Request_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Date_issued` date NOT NULL,
  `Amount` int(100) NOT NULL,
  `Mode_of_payment` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab_request`
--

CREATE TABLE `lab_request` (
  `Lab_Request_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Doctor_id` int(100) NOT NULL,
  `Is_CBC` tinyint(1) NOT NULL,
  `Is_PlateletCount` tinyint(1) NOT NULL,
  `Hematology_other_desc` varchar(100) NOT NULL,
  `Is_Urinalysis` tinyint(1) NOT NULL,
  `Is_urine_culture` tinyint(1) NOT NULL,
  `Is_fecalysis` tinyint(1) NOT NULL,
  `Microbiology_other_desc` varchar(100) NOT NULL,
  `Is_FBS` tinyint(1) NOT NULL,
  `Is_BUN` tinyint(1) NOT NULL,
  `Is_creatinine` tinyint(1) NOT NULL,
  `Is_electrolytes` tinyint(1) NOT NULL,
  `Is_ECG` tinyint(1) NOT NULL,
  `Is_BUA` tinyint(1) NOT NULL,
  `Is_LipidProfile` tinyint(1) NOT NULL,
  `Is_SGPT/SGOT` tinyint(1) NOT NULL,
  `Is_Ultrasound` tinyint(1) NOT NULL,
  `Ultrasound_Type` varchar(100) NOT NULL,
  `Is_Xray` tinyint(1) NOT NULL,
  `XRAY_Type` varchar(100) NOT NULL,
  `Blood_Chem_other_Type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab_results`
--

CREATE TABLE `lab_results` (
  `Lab_Request_id` int(100) NOT NULL,
  `Lab_Room` varchar(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Doctors_id` int(100) NOT NULL,
  `Lab_Tech_id` int(100) NOT NULL,
  `Results` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab_technician`
--

CREATE TABLE `lab_technician` (
  `Lab_tech_id` int(100) NOT NULL,
  `Specialization` varchar(100) NOT NULL,
  `Sub_Specialization` varchar(100) NOT NULL,
  `Lab_room_no` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_diagnosis`
--

CREATE TABLE `medical_diagnosis` (
  `Medical_Diagnosis_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Doctor` varchar(100) NOT NULL,
  `Date_Diagnose` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_history`
--

CREATE TABLE `medical_history` (
  `Medical_History_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Has_severedHeadache` tinyint(1) NOT NULL,
  `Has_heartattact_hypertension` tinyint(1) NOT NULL,
  `Has_nontraumatichematurria` tinyint(1) NOT NULL,
  `Has_formercancer_malignantcancer` tinyint(1) NOT NULL,
  `Has_chestpain` tinyint(1) NOT NULL,
  `Has_coughfor14days` tinyint(1) NOT NULL,
  `Has_unexplainedVaginalbleeding` tinyint(1) NOT NULL,
  `Is_a_smoker` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `Medicine_id` int(100) NOT NULL,
  `Patient_id` int(100) NOT NULL,
  `Doctor_id` int(100) NOT NULL,
  `Scientific_Medicine_name` varchar(100) NOT NULL,
  `Generic_Medicine_name` varchar(100) NOT NULL,
  `Medicine_size` varchar(100) NOT NULL,
  `Quantity_per_day` varchar(100) NOT NULL,
  `Duration` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Date_Issued` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `Patient_id` varchar(10) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Middle_name` varchar(100) DEFAULT NULL,
  `Suffix` varchar(100) DEFAULT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Address_line1` varchar(20) NOT NULL,
  `Address_line2` varchar(20) NOT NULL,
  `Municipality` varchar(20) NOT NULL,
  `Province` varchar(20) NOT NULL,
  `Civil_Status` varchar(100) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_id` varchar(10) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Middle_name` varchar(100) DEFAULT NULL,
  `Suffix` varchar(100) DEFAULT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Address_line1` varchar(20) NOT NULL,
  `Address_line2` varchar(20) NOT NULL,
  `Municipality` varchar(20) NOT NULL,
  `Province` varchar(20) NOT NULL,
  `Civil_Status` varchar(100) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`User_id`, `First_name`, `Last_name`, `Middle_name`, `Suffix`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_Status`, `Phone_Number`, `Email`, `Password`) VALUES
('', '', 'Last name', '', '', '0000-00-00', 'Gender', '', '', '', '', 'Status', 'Contact Number', 'Email', ''),
('00203', 'Louis', 'Vitton', 'Madrigal', 'Jr', '2000-03-22', 'Male', 'Block 6 Lot 8 Phase ', 'Lavanya Subdivision ', 'General Trias', 'Cavite', 'Single', '09209668394', 'thisis@email', 'sikreto'),
('A.ALVIN503', 'Alvin', 'Alvin', 'Middle name', 'Suffix', '2021-05-03', 'Male', 'Block 6 Lot 8 Phase ', 'Block 6 Lot 8 Phase ', 'Block 6 Lot 8 Phase ', 'Block 6 Lot 8 Phase ', 'Single', '09265932130', 'sc@example.com', 'secret');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `Service_id` int(10) NOT NULL,
  `Service_name` varchar(100) NOT NULL,
  `Service_Desc` text NOT NULL,
  `Service_Image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment_request`
--
ALTER TABLE `appointment_request`
  ADD PRIMARY KEY (`Appointment_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctor_id` (`Doctor_id`),
  ADD UNIQUE KEY `Room_no` (`Room_no`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`Doctor_Employee_ID`),
  ADD UNIQUE KEY `Doctor_Employee_ID` (`Doctor_Employee_ID`),
  ADD UNIQUE KEY `Specialization` (`Specialization`),
  ADD UNIQUE KEY `Sub_Specialization` (`Sub_Specialization`);

--
-- Indexes for table `doctors_fee`
--
ALTER TABLE `doctors_fee`
  ADD PRIMARY KEY (`Appointment_Request_ID`),
  ADD UNIQUE KEY `Appointment_Request_ID` (`Appointment_Request_ID`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Employee_Id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`Facility_Number`);

--
-- Indexes for table `facilities_desc`
--
ALTER TABLE `facilities_desc`
  ADD PRIMARY KEY (`Facility_number`,`Floor`,`Room_No`),
  ADD UNIQUE KEY `Facility_number` (`Facility_number`);

--
-- Indexes for table `family_history`
--
ALTER TABLE `family_history`
  ADD PRIMARY KEY (`Fam_history_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`Lab_id`),
  ADD UNIQUE KEY `Lab_request_id` (`Lab_request_id`);

--
-- Indexes for table `lab_request`
--
ALTER TABLE `lab_request`
  ADD PRIMARY KEY (`Lab_Request_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `lab_results`
--
ALTER TABLE `lab_results`
  ADD PRIMARY KEY (`Lab_Request_id`),
  ADD UNIQUE KEY `Lab_Request_id` (`Lab_Request_id`),
  ADD UNIQUE KEY `Lab_Room` (`Lab_Room`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctors_id` (`Doctors_id`),
  ADD UNIQUE KEY `Lab_Tech_id` (`Lab_Tech_id`);

--
-- Indexes for table `lab_technician`
--
ALTER TABLE `lab_technician`
  ADD PRIMARY KEY (`Lab_tech_id`),
  ADD UNIQUE KEY `Lab_tech_id` (`Lab_tech_id`);

--
-- Indexes for table `medical_diagnosis`
--
ALTER TABLE `medical_diagnosis`
  ADD PRIMARY KEY (`Medical_Diagnosis_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctor` (`Doctor`);

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`Medical_History_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`Medicine_id`),
  ADD UNIQUE KEY `Patient_id` (`Patient_id`),
  ADD UNIQUE KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`Patient_id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`User_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`Service_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
