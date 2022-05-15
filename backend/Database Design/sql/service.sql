use healthlab;
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
    address2 VARCHAR(100) NOT NULL
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