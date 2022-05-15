use healthlab; 

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