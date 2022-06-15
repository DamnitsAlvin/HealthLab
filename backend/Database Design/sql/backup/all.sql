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


CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `First_name` varchar(30) NOT NULL,
  `Last_name` varchar(30) NOT NULL,
  `Middle_name` varchar(30) DEFAULT NULL,
  `Suffix` varchar(30) DEFAULT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Address_line1` varchar(50) NOT NULL,
  `Address_line2` varchar(50) NOT NULL,
  `Municipality` varchar(50) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `Civil_Status` varchar(15) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL UNIQUE,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `patient` (
  `Patient_id` varchar(10) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Middle_name` varchar(100) DEFAULT NULL,
  `Suffix` varchar(100) DEFAULT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  PRIMARY KEY (`Patient_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `appointment_request` (
  `Appointment_Id` varchar(20) NOT NULL,
  `Patient_id` varchar(10) NOT NULL,
  `Doctor_id` varchar(100) NOT NULL,
  `Appointment_date` varchar(10) NOT NULL,
  `Appointment_time` varchar(10) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Specialty` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Appointment_Id`),
  FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `dentistappointmentrequest` (
  `appointment_request` varchar(20) NOT NULL,
  `hasMouthSore` tinyint(1) NOT NULL,
  `hasJawPain` tinyint(1) NOT NULL,
  `hasSwollenFace` tinyint(1) NOT NULL,
  `hasSensitiveTeeth` tinyint(1) NOT NULL,
  `hasBrokenTeeth` tinyint(1) NOT NULL,
  `hasDryMouth` tinyint(1) NOT NULL,
  `hasBleedingGums` tinyint(1) NOT NULL,
  `hasBadTaste` tinyint(1) NOT NULL,
  `isSmoker` tinyint(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`appointment_request`),
  FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `obappointmentrequest` (
  `appointment_request` varchar(20) NOT NULL,
  `hasPainfulPeriods` tinyint(1) DEFAULT NULL,
  `hasVaginalOdor` tinyint(1) DEFAULT NULL,
  `hasSwollenBumps` tinyint(1) DEFAULT NULL,
  `hasVaginalDryness` tinyint(1) DEFAULT NULL,
  `hasPain` tinyint(1) DEFAULT NULL,
  `hasUrinaryLeak` tinyint(1) DEFAULT NULL,
  `hasLowLibido` tinyint(1) DEFAULT NULL,
  `isASmoker` tinyint(1) DEFAULT NULL,
  `hasSTD` tinyint(1) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`appointment_request`),
  FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `optalappointmentrequest` (
  `appointment_request` varchar(20) NOT NULL,
  `hasEyeStrain` tinyint(1) DEFAULT NULL,
  `hasDryEyes` tinyint(1) DEFAULT NULL,
  `hasIrritatedEyes` tinyint(1) DEFAULT NULL,
  `hasItchyEyes` tinyint(1) DEFAULT NULL,
  `hasFluctuatingVision` tinyint(1) DEFAULT NULL,
  `hasFrequentHeadache` tinyint(1) DEFAULT NULL,
  `hasRedEyes` tinyint(1) DEFAULT NULL,
  `hasTrouble` tinyint(1) DEFAULT NULL,
  `usingGadget` tinyint(1) DEFAULT NULL,
  `seeingGlare` tinyint(1) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`appointment_request`),
  FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ghappointmentrequest` (
  `appointment_request` varchar(20) NOT NULL,
  `patientInCur` tinyint(1) DEFAULT NULL,
  `frequentHeadaches` tinyint(1) DEFAULT NULL,
  `fatigue` tinyint(1) DEFAULT NULL,
  `shortnessOfBreath` tinyint(1) DEFAULT NULL,
  `sleeplessNight` tinyint(1) DEFAULT NULL,
  `urinaryLeakage` tinyint(1) DEFAULT NULL,
  `isSmoker` tinyint(1) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`appointment_request`),
  FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `medical_history` (
  `Medical_History_id` int(100) NOT NULL,
  `Patient_id` varchar(50) NOT NULL,
  `Has_severedHeadache` tinyint(1) NOT NULL,
  `Has_heartattact_hypertension` tinyint(1) NOT NULL,
  `Has_nontraumatichematurria` tinyint(1) NOT NULL,
  `Has_formercancer_malignantcancer` tinyint(1) NOT NULL,
  `Has_chestpain` tinyint(1) NOT NULL,
  `Has_coughfor14days` tinyint(1) NOT NULL,
  `Has_unexplainedVaginalbleeding` tinyint(1) NOT NULL,
  `Is_a_smoker` tinyint(1) NOT NULL,
  PRIMARY KEY (`Medical_History_id`),
  FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `is_verified` tinyint(1) NOT NULL,
  `doctor_image` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `userType` varchar(20) NOT NULL DEFAULT 'doctor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`, `doctor_image`, `password`, `userType`) VALUES
('A.LIM50588', 'Roger', 'Sy', 'Lim', '', '2022-06-15', '0926-593-2130', 'alvinlim794@gmail.com', 2, 0, '/uploads/A.LIM50588Image.png', 'gj', 'doctor');

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

--
-- Dumping data for table `doctor_availabledateclinic`
--

INSERT INTO `doctor_availabledateclinic` (`doctor_id`, `address_id`, `id`, `day`, `day_end`, `time_start`, `time_end`) VALUES
('A.LIM50588', 'A.LIM50588ADD', 1, 'Monday', 'Friday', '08:00', '12:00'),
('A.LIM50588', 'A.LIM50588ADD', 2, 'Saturday', 'Saturday', '08:00', '11:00');

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
('A.LIM50588', 1, 'Wednesday', 'Friday', '08:00', '12:00'),
('A.LIM50588', 2, 'Saturday', 'Saturday', '08:00', '11:00');

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
('A.LIM50588', 1, 'PSSP1', 'Child Neurology Society of the Philippines (CNSP)', '2022-06-17');

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
('A.LIM50588', 'A.LIM50588ADD', 1, 'Block 6 Lot 8 Phase 1 Lavanya Subdivision', 'Bacao 2 ', 'General Trias ', 'Cavite', 4107, '');

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
('A.LIM50588', 1, 'Residence', 'Philippine Normal University', '2022-06-04', 'Bachelor', 'Master of Science in Caregiving'),
('A.LIM50588', 2, 'Medical School', 'University of the Philippines', '2022-06-10', 'Bachelor', 'Bachelor of Science in Information Technology ');

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
('A.LIM50588', 1, 'Makati Medical', 'Nurse 11', 3, '03-22-00'),
('A.LIM50588', 2, 'Makati Medical', 'Nurse 2', 3, '03-22-01');

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
('A.LIM50588', 1, 'GCASH1', 'Alvin Lim', '09265932130');

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
('A.LIM50588', 1, 'Neurology', 'Vascular Neurology (Stroke)'),
('A.LIM50588', 2, 'Pediatrics ', 'Neuromuscular diseases in children');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_title`
--

CREATE TABLE `doctor_title` (
  `doctor_id` varchar(50) NOT NULL,
  `doctor_title` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_title`
--

INSERT INTO `doctor_title` (`doctor_id`, `doctor_title`) VALUES
('A.LIM50588', 'FPNA'),
('A.LIM50588', 'MD');

   
CREATE TABLE service(
    service_id VARCHAR(50) NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    is_verified TINYINT(1) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL, 
  	PRIMARY KEY(service_id)
);

CREATE TABLE service_location(
    service_id VARCHAR(50) NOT NULL,
    address_id VARCHAR(50) NOT NULL, 
    address VARCHAR(100) NOT NULL, 
    address2 VARCHAR(100) NOT NULL,
    barangay VARCHAR(50) NOT NULL, 
    municipality VARCHAR(50) NOT NULL, 
    province VARCHAR(50) NOT NULL, 
    zip_code INT(6) NOT NULL, 
    image VARCHAR(50) NOT NULL, 
      FOREIGN KEY(service_id) 
    	REFERENCES service(service_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(service_id, address_id)
);

CREATE TABLE service_available_time(
    service_id VARCHAR(50) NOT NULL, 
    open_time VARCHAR(20) NOT NULL, 
    closing_time VARCHAR(20) NOT NULL, 
    open_day VARCHAR(20) NOT NULL, 
    close_day VARCHAR(20) NOT NULL, 
    PRIMARY KEY(service_id, open_day),
    FOREIGN KEY(service_id) 
    	REFERENCES service(service_id)
    	ON DELETE CASCADE
   );
   
CREATE TABLE service_offered(
    service_id VARCHAR(50) NOT NULL, 
    service_name VARCHAR(100) NOT NULL, 
    service_cost INT(7) NOT NULL, 
    service_waiting_time VARCHAR(50) NOT NULL, 
    PRIMARY KEY(service_id, service_name),
    FOREIGN KEY(service_id)
    	REFERENCES service(service_id)
    	ON DELETE CASCADE
 );
 
 CREATE TABLE service_payment_option(
     service_id VARCHAR(50) NOT NULL, 
     payment_mode VARCHAR(50) NOT NULL, 
     reference_name VARCHAR(100) NOT NULL,
     reference_number VARCHAR(100) NOT NULL, 
     PRIMARY KEY(service_id, reference_number),
     FOREIGN KEY (service_id) 
     	REFERENCES service(service_id) 
     	ON DELETE CASCADE
 );

 CREATE TABLE patient_previous_service(
    user_id VARCHAR(50) NOT NULL,
    service_id VARCHAR(50) NOT NULL, 
    relationship_start VARCHAR(50) NOT NULL, 
    no_of_appointments VARCHAR(50) NOT NULL, 
 	PRIMARY KEY(user_id, service_id), 
    FOREIGN KEY (user_id)
    	REFERENCES user(User_id)
    	ON DELETE CASCADE, 
    FOREIGN KEY (service_id)
    	REFERENCES service(service_id)
    	ON DELETE CASCADE
   );


CREATE TABLE `medical_diagnosis` (
  `Medical_Diagnosis_id` int(100) NOT NULL,
  `Patient_id` varchar(50) NOT NULL,
  `doctor_id` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Date_Diagnose` date NOT NULL,
  PRIMARY KEY (`Medical_Diagnosis_id`),
  FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`),
  FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `medicine` (
  `Medicine_id` int(100) NOT NULL,
  `Patient_id` varchar(50) NOT NULL,
  `Doctor_id` varchar(50) NOT NULL,
  `Scientific_Medicine_name` varchar(100) NOT NULL,
  `Generic_Medicine_name` varchar(100) NOT NULL,
  `Medicine_size` varchar(100) NOT NULL,
  `Quantity_per_day` varchar(100) NOT NULL,
  `Duration` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Date_Issued` date NOT NULL,
  PRIMARY KEY (`Medicine_id`),
  FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`),
  FOREIGN KEY (`Doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE patient_previous_doctor(
    user_id VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(50) NOT NULL, 
    relationship_start VARCHAR(50) NOT NULL, 
    no_of_appointments VARCHAR(50) NOT NULL, 
 	PRIMARY KEY(user_id, doctor_id), 
    FOREIGN KEY (user_id)
    	REFERENCES user(User_id)
    	ON DELETE CASCADE, 
    FOREIGN KEY (doctor_id)
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE
   );

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
-- Indexes for table `doctor_clinicaddress`
--
ALTER TABLE `doctor_clinicaddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_education`
--
ALTER TABLE `doctor_education`
  ADD PRIMARY KEY (`id`,`doctor_id`);

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
