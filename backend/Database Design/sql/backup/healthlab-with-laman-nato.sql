-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2022 at 12:46 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

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
  `Appointment_Id` varchar(20) NOT NULL,
  `Patient_id` varchar(10) NOT NULL,
  `Doctor_id` varchar(100) NOT NULL,
  `Appointment_date` varchar(10) NOT NULL,
  `Appointment_time` varchar(10) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Specialty` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dentistappointmentrequest`
--

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
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `mode_of_consultation` int(1) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `doctor_image` varchar(200) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `birthday`, `email`, `mode_of_consultation`, `is_verified`, `doctor_image`, `password`) VALUES
('1', 'Doctor 1', 'Middle 1', 'Last 1', '1989-12-30', 'doctor1@gmail.com', 1, 1, 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/go-big-or-go-home-harper-avery-arrives-at-grey-sloan-news-photo-1569432105.jpg?crop=0.8xw:1xh;center,top&resize=480:*', 'doctor1password'),
('2', 'Doctor 2', 'Middle 2', 'Last 2', '1989-12-31', 'doctor2@gmail.com', 1, 1, 'https://i.pinimg.com/originals/03/61/88/0361883970cbd3b8c3bbc9f2e73180f4.jpg', 'doctor2password'),
('3', 'Doctor 3', 'Middle 3', 'Last 3', '1990-12-30', 'doctor3@gmail.com', 1, 1, 'https://www.itl.cat/pngfile/big/97-971406_patrick-dempsey-wallpaper-dr-handsome-greys-anatomy.jpg', 'doctor3passwrod'),
('4', 'Doctor 4', 'Middle 4', 'Last 4', '1990-12-12', 'doctor4@gmail.com', 1, 1, 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/12/1521768676-oh1.jpg?crop=1.00xw:0.658xh;0,0.0731xh&resize=480:*', 'doctor4password'),
('5', 'Doctor 5', 'Middle 5 ', 'Last 5', '1989-11-30', 'doctor5@gmail.com', 1, 1, 'https://s2.r29static.com/bin/entry/506/x,80/2031793/image.jpg', 'doctor5passwrod');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availabledateclinic`
--

CREATE TABLE `doctor_availabledateclinic` (
  `doctor_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `day` varchar(15) NOT NULL,
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_availabledateclinic`
--

INSERT INTO `doctor_availabledateclinic` (`doctor_id`, `address_id`, `day`, `time_start`, `time_end`) VALUES
('1', '1', 'Mon- Fri', '8:00 am', '5:00 pm'),
('2', '2', 'Mon- Fri', '7:00 am', '5:00 pm'),
('3', '3', 'Mon- Fri', '7:00 am', '5:00 pm'),
('4', '4', 'Mon- Fri', '9:00 am', '5:00 pm'),
('5', '5', 'Mon- Fri', '8:00 am', '3:00 pm');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_available_online`
--

CREATE TABLE `doctor_available_online` (
  `doctor_id` varchar(50) NOT NULL,
  `day` varchar(15) NOT NULL,
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_available_online`
--

INSERT INTO `doctor_available_online` (`doctor_id`, `day`, `time_start`, `time_end`) VALUES
('1', 'Mon- Fri', '8:00 am', '5:00 pm'),
('2', 'Mon- Fri', '8:00 am', '5:00 pm'),
('3', 'Mon- Fri', '8:00 am', '5:00 pm'),
('4', 'Mon- Fri', '8:00 am', '5:00 pm'),
('5', 'Mon- Fri', '8:00 am', '5:00 pm');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_certification`
--

CREATE TABLE `doctor_certification` (
  `doctor_id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `giver` varchar(50) NOT NULL,
  `date_given` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_certification`
--

INSERT INTO `doctor_certification` (`doctor_id`, `title`, `giver`, `date_given`) VALUES
('1', 'MD.', 'University Of Sto. Thomas', '2015-03-25'),
('2', 'PHD.', 'University Of Sto. Thomas', '2016-03-24'),
('3', 'MD.', 'Pamantasan ng Lungsod ng Maynilad', '2014-03-25'),
('4', 'PHD.', 'Pamantasan ng Lungsod ng Maynilad', '2016-03-22'),
('5', 'RN, PHD', 'University of The Philippines', '2015-03-19');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_clinicaddress`
--

CREATE TABLE `doctor_clinicaddress` (
  `doctor_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `municipality` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip_code` int(6) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_clinicaddress`
--

INSERT INTO `doctor_clinicaddress` (`doctor_id`, `address_id`, `address`, `address2`, `barangay`, `municipality`, `province`, `zip_code`, `image`) VALUES
('1', '1', 'Address of Clinic of Doctor 1', 'Address of Clinic of Doctor 1', 'Barangay of Doctor 1', 'Municipality of Doctor 1', 'Province of Doctor 1', 4215, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fA%3D%3D&w=1000&q=80'),
('2', '2', 'Address of Clinic of Doctor 2', 'Address of Clinic of Doctor 2', 'Barangay of Doctor 2', 'Municipality of Doctor 2', 'Province of Doctor 2', 4125, 'https://www.commonwealthfund.org/sites/default/files/styles/hero_image_desktop/public/empty%20clinic%20room_3x2_hires_3x2_hires.jpg?h=84071268&itok=I9F59yU6'),
('3', '3', 'Address of Clinic of Doctor 3', 'Address of Clinic of Doctor 3', 'Barangay of Doctor 3', 'Municipality of Doctor 3', 'Province of Doctor 2', 4152, 'https://www.rentonreporter.com/wp-content/uploads/2018/04/11368174_web1_180413-REN-healthclinic-TSR.jpg'),
('4', '4', 'Address of Clinic of Doctor 4', 'Address of Clinic of Doctor 4', 'Barangay of Doctor 4', 'Municipality of Doctor 4', 'Province of Doctor 4', 4012, 'https://img.freepik.com/free-photo/room-hospital-check-ins-doctor-s-office-doctor-s-room-close-up_133138-467.jpg?size=626&ext=jpg'),
('5', '5', 'Address of Clinic of Doctor 5', 'Address of Clinic of Doctor 5', 'Barangay of Doctor 5', 'Municipality of Doctor 5', 'pProvince of Doctor 5', 4102, 'https://media.istockphoto.com/photos/doctor-doctors-office-desk-picture-id653036922');

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

--
-- Dumping data for table `doctor_clinicinfo`
--

INSERT INTO `doctor_clinicinfo` (`doctor_id`, `address_id`, `clinic_name`, `room_no`, `floor_no`) VALUES
('1', '1', 'Clinic of Doctor 1', '1', 1),
('2', '2', 'Clinic of Doctor 2', '2', 2),
('3', '3', 'Clinic of Doctor 3', '3', 3),
('4', '4', 'Clinic of Doctor 4', '4', 4),
('5', '5', 'Clinic of Doctor 5', '5', 5);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_contact_information`
--

CREATE TABLE `doctor_contact_information` (
  `doctor_id` varchar(50) NOT NULL,
  `contact_type` varchar(50) NOT NULL,
  `link_or_number` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_contact_information`
--

INSERT INTO `doctor_contact_information` (`doctor_id`, `contact_type`, `link_or_number`) VALUES
('1', 'Cellphone', '09458761348'),
('2', 'Cellphone', '09461846785'),
('3', 'Cellphone', '09587648135'),
('4', 'Cellphone', '09468524615'),
('5', 'Cellphone', '09658745613');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_education`
--

CREATE TABLE `doctor_education` (
  `doctor_id` varchar(50) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `graduation_date` date NOT NULL,
  `degree` varchar(10) NOT NULL,
  `course` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_education`
--

INSERT INTO `doctor_education` (`doctor_id`, `school_name`, `graduation_date`, `degree`, `course`) VALUES
('1', 'University Of Sto. Thomas', '2015-03-25', 'MD.', 'Medicine'),
('2', 'University Of Sto. Thomas', '2016-03-24', 'PHD.', 'Medicine'),
('3', 'Pamantasan ng Lungsod ng Maynilad', '2014-03-25', 'MD.', 'Medicine'),
('4', 'Pamantasan ng Lungsod ng Maynilad', '2016-03-22', 'PHD.', 'Medicine'),
('5', 'University of The Philippines', '2015-03-19', 'RN, PHD', 'Medicine');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_experience`
--

CREATE TABLE `doctor_experience` (
  `doctor_id` varchar(50) NOT NULL,
  `place_of_work` varchar(50) NOT NULL,
  `years_of_experience` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_experience`
--

INSERT INTO `doctor_experience` (`doctor_id`, `place_of_work`, `years_of_experience`) VALUES
('1', 'Clinic of Doctor 1', 4),
('2', 'Clinic of Doctor 2', 5),
('3', 'Clinic of Doctor 3', 6),
('4', 'Clinic of Doctor 4', 5),
('5', 'Clinic of Doctor 5', 4);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_paymentinfo`
--

CREATE TABLE `doctor_paymentinfo` (
  `doctor_id` varchar(50) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `reference_name` varchar(100) NOT NULL,
  `reference_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_paymentinfo`
--

INSERT INTO `doctor_paymentinfo` (`doctor_id`, `payment_mode`, `reference_name`, `reference_number`) VALUES
('1', 'Gcash , Bank Transfer', 'Doctor 1', '987-654-321'),
('2', 'Gcash , Bank Transfer', 'Doctor 2', '987-654-322'),
('3', 'Gcash , Bank Transfer', 'Doctor 3', '987-654-323'),
('4', 'Gcash , Bank Transfer', 'Doctor 4', '987-654-324'),
('5', 'Gcash , Bank Transfer', 'Doctor 5', '987-654-325');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_specialty`
--

CREATE TABLE `doctor_specialty` (
  `doctor_id` varchar(50) NOT NULL,
  `specialties` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_specialty`
--

INSERT INTO `doctor_specialty` (`doctor_id`, `specialties`) VALUES
('1', 'General Medicine'),
('2', 'General Physician'),
('3', 'General Medicine, General Physician'),
('4', 'General Physician, General Paediatrics'),
('5', 'General Medicine,  General Practitioner');

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
('1', 'MD.'),
('2', 'PHD.'),
('3', 'MD.'),
('4', 'PHD.'),
('5', 'RN ,PHD');

-- --------------------------------------------------------

--
-- Table structure for table `ghappointmentrequest`
--

CREATE TABLE `ghappointmentrequest` (
  `appointment_request` varchar(20) NOT NULL,
  `patientInCur` tinyint(1) DEFAULT NULL,
  `frequentHeadaches` tinyint(1) DEFAULT NULL,
  `fatigue` tinyint(1) DEFAULT NULL,
  `shortnessOfBreath` tinyint(1) DEFAULT NULL,
  `sleeplessNight` tinyint(1) DEFAULT NULL,
  `urinaryLeakage` tinyint(1) DEFAULT NULL,
  `isSmoker` tinyint(1) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_diagnosis`
--

CREATE TABLE `medical_diagnosis` (
  `Medical_Diagnosis_id` int(100) NOT NULL,
  `Patient_id` varchar(50) NOT NULL,
  `doctor_id` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Date_Diagnose` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_history`
--

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
  `Is_a_smoker` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

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
  `Date_Issued` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obappointmentrequest`
--

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
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `optalappointmentrequest`
--

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
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `Patient_id` varchar(10) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Middle_name` varchar(100) DEFAULT NULL,
  `Suffix` varchar(100) DEFAULT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patient_previous_doctor`
--

CREATE TABLE `patient_previous_doctor` (
  `user_id` varchar(50) NOT NULL,
  `doctor_id` varchar(50) NOT NULL,
  `relationship_start` varchar(50) NOT NULL,
  `no_of_appointments` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `name`, `is_verified`, `email`, `password`) VALUES
('1', 'Service 1', 1, 'service1@gmail.com', 'service1password'),
('2', 'Service 2', 1, 'service2@gmail.com', 'service2password'),
('3', 'Service 3', 1, 'service3@gmail.com', 'service3password'),
('4', 'Service 4', 1, 'service4@gmail.com', 'service4password'),
('5', 'Service 5', 1, 'service5@gmail.com', 'service5password');

-- --------------------------------------------------------

--
-- Table structure for table `service_available_time`
--

CREATE TABLE `service_available_time` (
  `service_id` varchar(50) NOT NULL,
  `open_time` varchar(20) NOT NULL,
  `closing_time` varchar(20) NOT NULL,
  `open_day` varchar(20) NOT NULL,
  `close_day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_available_time`
--

INSERT INTO `service_available_time` (`service_id`, `open_time`, `closing_time`, `open_day`, `close_day`) VALUES
('1', '8:00 am', '5:00 pm', 'Monday - Saturday', 'Sunday'),
('2', '8:00 am', '5:00 pm', 'Monday - Saturday', 'Sunday'),
('3', '8:00 am', '5:00 pm', 'Monday - Saturday', 'Sunday'),
('4', '8:00 am', '5:00 pm', 'Monday - Saturday', 'Sunday'),
('5', '8:00 am', '5:00 pm', 'Monday - Saturday', 'Sunday');

-- --------------------------------------------------------

--
-- Table structure for table `service_location`
--

CREATE TABLE `service_location` (
  `service_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `municipality` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip_code` int(6) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_location`
--

INSERT INTO `service_location` (`service_id`, `address_id`, `address`, `address2`, `barangay`, `municipality`, `province`, `zip_code`, `image`) VALUES
('1', '1', 'Address of Service 1', 'Address of Service 1', 'Barangay of Service 1', 'Municipality of Service 1', 'Province of Service 1', 4215, 'https://i.pinimg.com/originals/2c/58/c6/2c58c61c52e2de34f8c8c6d2f3d6310a.jpg'),
('2', '2', 'Address of Service 2', 'Address of Service 2', 'Barangay of Service 2', 'Municipality of Service 2', 'Province of Service 2', 4152, 'https://www.commonwealthfund.org/sites/default/files/styles/hero_image_desktop/public/empty%20clinic%20room_3x2_hires_3x2_hires.jpg?h=84071268&itok=I9F59yU6'),
('3', '3', 'Address of Service 3', 'Address of Service 3', 'Barangay of Service 3', 'Municipality of Service 3', 'Province of Service 3', 4125, 'https://impeccabuild.b-cdn.net/wp-content/uploads/2020/07/Medical-Clinic-Interior-Design-Ideas-Medical-Fitouts-ImpeccaBuild-3-scaled.jpg'),
('4', '4', 'Address of Service 4', 'Address of Service 4', 'Barangay of Service 4', 'Municipality of Service 4', 'Province of Service 4', 4103, 'https://static.bookinghealth.com/uploads/clinics/gallery/m/4498-1408-otr_Depositphotos_316360964_xl-2015-1.jpg'),
('5', '5', 'Address of Service 5', 'Address of Service 5', 'Barangay of Service 5', 'Municipality of Service 5', 'Province of Service 5', 4103, 'https://images1-fabric.practo.com/bever-medical-clinic-diagnostic-laboratory-cebu-city-1469587613-5798209d1bdf9.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `service_offered`
--

CREATE TABLE `service_offered` (
  `service_id` varchar(50) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_cost` int(7) NOT NULL,
  `service_waiting_time` varchar(50) NOT NULL,
   `description` varchar(300) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_offered`
--

INSERT INTO `service_offered` (`service_id`, `service_name`, `service_cost`, `service_waiting_time`) VALUES
('1', 'X-RAY', 300, '1 - 3 Hours'),
('2', 'General Check Up', 600, '1 - 5 Hours'),
('3', 'General Check Up', 600, '1 - 5 Hours'),
('4', 'X-RAY', 300, '1 - 3 Hours'),
('5', 'Urinalysis, ECG', 500, '1 - 4 Hours');

-- --------------------------------------------------------

--
-- Table structure for table `service_payment_option`
--

CREATE TABLE `service_payment_option` (
  `service_id` varchar(50) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `reference_name` varchar(100) NOT NULL,
  `reference_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_payment_option`
--

INSERT INTO `service_payment_option` (`service_id`, `payment_mode`, `reference_name`, `reference_number`) VALUES
('1', 'Gcash , Bank Transfer', 'Service 1', '123-456-781'),
('2', 'Gcash , Bank Transfer', 'Service 2', '123-456-782'),
('3', 'Gcash , Bank Transfer', 'Service 3', '123-456-783'),
('4', 'Gcash , Bank Transfer', 'Service 4', '123-456-784'),
('5', 'Gcash , Bank Transfer', 'Service 5', '123-456-785');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

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
  `Email` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `First_name`, `Last_name`, `Middle_name`, `Suffix`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_Status`, `Phone_Number`, `Email`, `Password`) VALUES
('U.LAST USER 13555', 'User 1', 'Last User 1', 'Middle User 1', '', '1991-11-01', 'Male', 'HS User 1', 'Subdivision User 1', 'Municipality User 1', 'Province User 1', 'Single', '09485794651', 'User1@gmail.com', 'user1password'),
('U.LAST USER 236496', 'User 2', 'Last User 2', 'Middle User 2', '', '1992-11-02', 'Male', 'HS User 2', 'Subdivision User 2', 'Municipality User 2', 'Province User 2', 'Single', '09648579132', 'User2@gmail.com', 'user2password'),
('U.LAST USER 337369', 'User 3', 'Last User 3', 'Middle User 3', 'Jr.', '1992-11-03', 'Male', 'HS User 3', 'Subdivision User 3', 'Municipality User 3', 'Province User 3', 'Single', '09648951643', 'User3@gmail.com', 'user3password'),
('U.LAST USER 438800', 'User 4', 'Last User 4', 'Middle User 4', 'III', '1992-11-03', 'Female', 'HS User 4', 'Subdivision User 4', 'Municipality User 4', 'Province User 4', 'Single', '09594786134', 'User4@gmail.com', 'user4password'),
('U.LAST USER 539399', 'User 5', 'Last User 5', 'Middle User 5', '', '1994-12-04', 'Male', 'HS User 5', 'Subdivision User 5', 'Municipality User 5', 'Province User 5', 'Single', '09648975135', 'User5@gmail.com', 'user5password');

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
-- Indexes for table `dentistappointmentrequest`
--
ALTER TABLE `dentistappointmentrequest`
  ADD PRIMARY KEY (`appointment_request`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctor_availabledateclinic`
--
ALTER TABLE `doctor_availabledateclinic`
  ADD PRIMARY KEY (`doctor_id`,`address_id`,`day`);

--
-- Indexes for table `doctor_available_online`
--
ALTER TABLE `doctor_available_online`
  ADD PRIMARY KEY (`doctor_id`,`day`);

--
-- Indexes for table `doctor_certification`
--
ALTER TABLE `doctor_certification`
  ADD PRIMARY KEY (`doctor_id`,`title`);

--
-- Indexes for table `doctor_clinicaddress`
--
ALTER TABLE `doctor_clinicaddress`
  ADD PRIMARY KEY (`doctor_id`,`address_id`);

--
-- Indexes for table `doctor_clinicinfo`
--
ALTER TABLE `doctor_clinicinfo`
  ADD PRIMARY KEY (`doctor_id`,`address_id`);

--
-- Indexes for table `doctor_contact_information`
--
ALTER TABLE `doctor_contact_information`
  ADD PRIMARY KEY (`doctor_id`,`contact_type`);

--
-- Indexes for table `doctor_education`
--
ALTER TABLE `doctor_education`
  ADD PRIMARY KEY (`doctor_id`,`school_name`);

--
-- Indexes for table `doctor_experience`
--
ALTER TABLE `doctor_experience`
  ADD PRIMARY KEY (`doctor_id`,`place_of_work`);

--
-- Indexes for table `doctor_paymentinfo`
--
ALTER TABLE `doctor_paymentinfo`
  ADD PRIMARY KEY (`doctor_id`,`reference_number`);

--
-- Indexes for table `doctor_specialty`
--
ALTER TABLE `doctor_specialty`
  ADD PRIMARY KEY (`doctor_id`,`specialties`);

--
-- Indexes for table `doctor_title`
--
ALTER TABLE `doctor_title`
  ADD PRIMARY KEY (`doctor_id`,`doctor_title`);

--
-- Indexes for table `ghappointmentrequest`
--
ALTER TABLE `ghappointmentrequest`
  ADD PRIMARY KEY (`appointment_request`);

--
-- Indexes for table `medical_diagnosis`
--
ALTER TABLE `medical_diagnosis`
  ADD PRIMARY KEY (`Medical_Diagnosis_id`),
  ADD KEY `Patient_id` (`Patient_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`Medical_History_id`),
  ADD KEY `Patient_id` (`Patient_id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`Medicine_id`),
  ADD KEY `Patient_id` (`Patient_id`),
  ADD KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `obappointmentrequest`
--
ALTER TABLE `obappointmentrequest`
  ADD PRIMARY KEY (`appointment_request`);

--
-- Indexes for table `optalappointmentrequest`
--
ALTER TABLE `optalappointmentrequest`
  ADD PRIMARY KEY (`appointment_request`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`Patient_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `patient_previous_doctor`
--
ALTER TABLE `patient_previous_doctor`
  ADD PRIMARY KEY (`user_id`,`doctor_id`),
  ADD KEY `doctor_id` (`doctor_id`);

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
  ADD PRIMARY KEY (`service_id`,`open_day`);

--
-- Indexes for table `service_location`
--
ALTER TABLE `service_location`
  ADD PRIMARY KEY (`service_id`,`address_id`);

--
-- Indexes for table `service_offered`
--
ALTER TABLE `service_offered`
  ADD PRIMARY KEY (`service_id`,`service_name`);

--
-- Indexes for table `service_payment_option`
--
ALTER TABLE `service_payment_option`
  ADD PRIMARY KEY (`service_id`,`reference_number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment_request`
--
ALTER TABLE `appointment_request`
  ADD CONSTRAINT `appointment_request_ibfk_1` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE;

--
-- Constraints for table `dentistappointmentrequest`
--
ALTER TABLE `dentistappointmentrequest`
  ADD CONSTRAINT `dentistappointmentrequest_ibfk_1` FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_availabledateclinic`
--
ALTER TABLE `doctor_availabledateclinic`
  ADD CONSTRAINT `doctor_availabledateclinic_ibfk_1` FOREIGN KEY (`doctor_id`,`address_id`) REFERENCES `doctor_clinicaddress` (`doctor_id`, `address_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_available_online`
--
ALTER TABLE `doctor_available_online`
  ADD CONSTRAINT `doctor_available_online_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_certification`
--
ALTER TABLE `doctor_certification`
  ADD CONSTRAINT `doctor_certification_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_clinicaddress`
--
ALTER TABLE `doctor_clinicaddress`
  ADD CONSTRAINT `doctor_clinicaddress_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_clinicinfo`
--
ALTER TABLE `doctor_clinicinfo`
  ADD CONSTRAINT `doctor_clinicinfo_ibfk_1` FOREIGN KEY (`doctor_id`,`address_id`) REFERENCES `doctor_clinicaddress` (`doctor_id`, `address_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_contact_information`
--
ALTER TABLE `doctor_contact_information`
  ADD CONSTRAINT `doctor_contact_information_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_education`
--
ALTER TABLE `doctor_education`
  ADD CONSTRAINT `doctor_education_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_experience`
--
ALTER TABLE `doctor_experience`
  ADD CONSTRAINT `doctor_experience_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_paymentinfo`
--
ALTER TABLE `doctor_paymentinfo`
  ADD CONSTRAINT `doctor_paymentinfo_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_specialty`
--
ALTER TABLE `doctor_specialty`
  ADD CONSTRAINT `doctor_specialty_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_title`
--
ALTER TABLE `doctor_title`
  ADD CONSTRAINT `doctor_title_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `ghappointmentrequest`
--
ALTER TABLE `ghappointmentrequest`
  ADD CONSTRAINT `ghappointmentrequest_ibfk_1` FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE;

--
-- Constraints for table `medical_diagnosis`
--
ALTER TABLE `medical_diagnosis`
  ADD CONSTRAINT `medical_diagnosis_ibfk_1` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`),
  ADD CONSTRAINT `medical_diagnosis_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);

--
-- Constraints for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`);

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`),
  ADD CONSTRAINT `medicine_ibfk_2` FOREIGN KEY (`Doctor_id`) REFERENCES `doctor` (`doctor_id`);

--
-- Constraints for table `obappointmentrequest`
--
ALTER TABLE `obappointmentrequest`
  ADD CONSTRAINT `obappointmentrequest_ibfk_1` FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE;

--
-- Constraints for table `optalappointmentrequest`
--
ALTER TABLE `optalappointmentrequest`
  ADD CONSTRAINT `optalappointmentrequest_ibfk_1` FOREIGN KEY (`appointment_request`) REFERENCES `appointment_request` (`Appointment_Id`) ON DELETE CASCADE;

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `patient_previous_doctor`
--
ALTER TABLE `patient_previous_doctor`
  ADD CONSTRAINT `patient_previous_doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `patient_previous_doctor_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `patient_previous_service`
--
ALTER TABLE `patient_previous_service`
  ADD CONSTRAINT `patient_previous_service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `patient_previous_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `service_available_time`
--
ALTER TABLE `service_available_time`
  ADD CONSTRAINT `service_available_time_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `service_location`
--
ALTER TABLE `service_location`
  ADD CONSTRAINT `service_location_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `service_offered`
--
ALTER TABLE `service_offered`
  ADD CONSTRAINT `service_offered_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `service_payment_option`
--
ALTER TABLE `service_payment_option`
  ADD CONSTRAINT `service_payment_option_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
