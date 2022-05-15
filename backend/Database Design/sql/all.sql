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

CREATE TABLE `doctor`(
	`doctor_id` VARCHAR(50) NOT NULL, 
    `firstname` VARCHAR(50) NOT NULL, 
    `middlename` VARCHAR(50) NOT NULL, 
    `lastname` VARCHAR(50) NOT NULL,  
    `birthday` DATE NOT NULL, 
    `email` VARCHAR(50) NOT NULL, 
    `mode_of_consultation` INT(1) NOT NULL, 
    `is_verified` TINYINT(1) NOT NULL, 
    `doctor_image` VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(`doctor_id`)
);

create table `doctor_contact_information`(
	`doctor_id` VARCHAR(50) NOT NULL,   
    `contact_type` VARCHAR(50) NOT NULL, 
    `link_or_number` VARCHAR(50) NOT NULL, 
    FOREIGN KEY(`doctor_id`) 
    	REFERENCES `doctor`(`doctor_id`)
    	ON DELETE CASCADE, 
    PRIMARY KEY(`doctor_id`, `contact_type`) 
); 

CREATE TABLE doctor_title(
	doctor_id VARCHAR(50) NOT NULL,  
    doctor_title VARCHAR(10) NOT NULL, 
    FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, doctor_title)
);

CREATE TABLE doctor_specialty(
    doctor_id VARCHAR(50) NOT NULL, 
    specialties VARCHAR(50) NOT NULL, 
    FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, specialties)
  );

CREATE TABLE doctor_education(
	doctor_id VARCHAR(50) NOT NULL,  
    school_name VARCHAR(100) NOT NULL, 
    graduation_date date NOT NULL, 
    degree VARCHAR(10) NOT NULL, 
    course VARCHAR(50) NOT NULL, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, school_name)
);

CREATE TABLE doctor_experience(
   	doctor_id VARCHAR(50) NOT NULL,
    place_of_work VARCHAR(50) NOT NULL, 
    years_of_experience INT(4) NOT NULL, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, place_of_work)
  );
  
CREATE TABLE doctor_certification(
    doctor_id VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL, 
    giver VARCHAR(50) NOT NULL, 
    date_given date, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, title)
);

CREATE TABLE doctor_clinicaddress(
    doctor_id VARCHAR(50) NOT NULL,
    address_id VARCHAR(50) NOT NULL, 
    address VARCHAR(100) NOT NULL, 
    address2 VARCHAR(100) NOT NULL,
    barangay VARCHAR(50) NOT NULL, 
    municipality VARCHAR(50) NOT NULL, 
    province VARCHAR(50) NOT NULL, 
    zip_code INT(6) NOT NULL, 
    image VARCHAR(50) NOT NULL, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, address_id)
  );
  
 CREATE TABLE doctor_clinicinfo(
    doctor_id VARCHAR(50) NOT NULL,
    address_id VARCHAR(50) NOT NULL,
    clinic_name VARCHAR(50) NOT NULL, 
    room_no VARCHAR(10) NOT NULL, 
    floor_no INT(5) NOT NULL, 
     FOREIGN KEY(doctor_id, address_id) 
    	REFERENCES doctor_clinicaddress(doctor_id, address_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, address_id)
);

CREATE TABLE doctor_availabledateclinic(
 	doctor_id VARCHAR(50) NOT NULL,
    address_id VARCHAR(50) NOT NULL, 
    day VARCHAR(15) NOT NULL, 
    time_start VARCHAR(20) NOT NULL, 
    time_end VARCHAR(20) NOT NULL, 
    FOREIGN KEY(doctor_id, address_id) 
    	REFERENCES doctor_clinicaddress(doctor_id, address_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, address_id, day)
 );

CREATE TABLE doctor_available_online(
    doctor_id VARCHAR(50) NOT NULL,
    day VARCHAR(15) NOT NULL, 
    time_start VARCHAR(20) NOT NULL, 
    time_end VARCHAR(20) NOT NULL, 
    FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, day)
 );


CREATE TABLE doctor_paymentinfo(
  doctor_id VARCHAR(50) NOT NULL,
  payment_mode VARCHAR(50) NOT NULL, 
  reference_name VARCHAR(100) NOT NULL,
  reference_number VARCHAR(100) NOT NULL, 
  PRIMARY KEY(doctor_id, reference_number),
  FOREIGN KEY (doctor_id) 
     	REFERENCES doctor(doctor_id) 
     	ON DELETE CASCADE
);
   
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