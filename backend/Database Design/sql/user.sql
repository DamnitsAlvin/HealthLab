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

