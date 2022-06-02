use healthlab;
CREATE TABLE doctor(
	doctor_id VARCHAR(50) NOT NULL, 
    firstname VARCHAR(50) NOT NULL, 
    middlename VARCHAR(50) NOT NULL, 
    lastname VARCHAR(50) NOT NULL,  
    birthday DATE NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    mode_of_consultation INT(1) NOT NULL, 
    is_verified TINYINT(1) NOT NULL, 
    doctor_image VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(doctor_id)
);

create table doctor_contact_information(
	doctor_id VARCHAR(50) NOT NULL,   
    contact_type VARCHAR(50) NOT NULL, 
    link_or_number VARCHAR(50) NOT NULL, 
    FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, contact_type) 
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
  school_type VARCHAR(50) NOT NULL, 
  school_name VARCHAR(100) NOT NULL, 
  graduation_date date NOT NULL, 
  degree VARCHAR(50) NOT NULL, 
  course VARCHAR(100) NOT NULL, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, graduation_date)
);

CREATE TABLE doctor_experience(
   	doctor_id VARCHAR(50) NOT NULL,
    place_of_work VARCHAR(50) NOT NULL, 
    job_title VARCHAR(50) NOT NULL, 
    years_of_experience INT(4) NOT NULL, 
    date_ended VARCHAR(50) NOT NULL, 
      FOREIGN KEY(doctor_id) 
    	REFERENCES doctor(doctor_id)
    	ON DELETE CASCADE, 
    PRIMARY KEY(doctor_id, date_ended)
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
 )


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
   
 