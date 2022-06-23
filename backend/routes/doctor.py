from app import create_app
from flask import Blueprint, Flask, jsonify, request, url_for
from flask_jwt_extended import create_access_token


app,mysql = create_app()
doc_api=Blueprint('doc_api', __name__)

@doc_api.route("/doctorbasicreg", methods=["POST"])
def registerBasicInformationDoctor():
    if request.method == "POST":
        if "file" not in request.files:
            print("no file")
        cur = mysql.connection.cursor()
        doctor_id = request.json.get("doctor_id")
        firstname = request.json.get("first_name")
        middlename = request.json.get("middle_name")
        lastname = request.json.get("last_name") 
        suffix = request.json.get("suffix") 
        birthday = request.json.get("birthday")
        phone = request.json.get("phone")
        email = request.json.get("email") 
        consultation = request.json.get("mode_of_consultation")

        if consultation == "Virtual": 
            consultation = 0 
        elif consultation == "Face to Face":
            consulation = 1 
        else:
            consulation = 2 

        image = request.json.get("doctor_image")
        password = request.json.get("password") 
        data = [
            doctor_id, 
            firstname, 
            middlename, 
            lastname, 
            birthday, 
            phone, 
            email, 
            consultation
        ]
        try:
            response = cur.execute("INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`, `password`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (doctor_id, firstname, middlename, lastname, suffix, birthday, phone, email, consultation, "false", password))
            cur.connection.commit()
            cur.close()
            access_token = create_access_token(identity = doctor_id)
            return jsonify({"access_token": access_token, "data": data}), 200

        except Exception as e:
            print("Something went wrong: ", e)
            return jsonify({"message": "invalid operation on database"}), 404

@doc_api.route("/doctoreducreg", methods = ["POST"])
def registerEducInformationDoctor():
    if request.method =="POST":
        cur = mysql.connection.cursor()
        doctor_id = request.json.get("doctor_id")
        school_name = request.json.get("School_name")
        graduation_date = request.json.get("Grad_date")
        degree = request.json.get("Degree")
        course = request.json.get("Course")
        try:
            response = cur.execute("INSERT INTO `doctor_education` (`doctor_id`, `school_name`, `graduation_date`, `degree`, `course`) VALUES (%s, %s, %s, %s, %s)", (doctor_id, school_name, graduation_date, degree, course))
            cur.connection.commmit()
            cur.close()
            return jsonify({"message": "Success"}), 200
        except:
            return jsonify({"message": "invalid operation on database "}), 404

@doc_api.route("/doctorspecialtyreg", methods = ["POST"])
def registerSpecialtyInformationDoctor():
    if request.method =="POST":
        cur = mysql.connection.cursor()
        doctor_id = request.json.get('doctor_id')
        specialties = request.json.get("specialization")
        sub_specialty = request.json.get("sub_specialization")
        try:
            response = cur.execute("INSERT INTO `doctor_specialty` (`doctor_id`, `specialties`, `sub-specialty`) VALUES (%s, %s, %s)", (doctor_id, specialties, sub-specialty))
            cur.connection.commmit()
            cur.close()
            return jsonify({"message": "Success"}), 200
        except:
            return jsonify({"message": "invalid operation on database "}), 404


@doc_api.route("/doctorInformation", methods=["GET"])
def getDoctorInformation():
    cur = mysql.connection.cursor()
    cur1 = mysql.connection.cursor()
    args  = request.args.to_dict()
    doctor_id = args.get("doctor_id") 
    try:
        BasicInfo = cur.execute("SELECT * FROM doctor WHERE doctor_id=%s", (doctor_id, ))
        Title = cur1.execute("SELECT * FROM doctor_title WHERE doctor_id=%s", (doctor_id,))
        
        if BasicInfo > 0:
            BasicInfo = cur.fetchone()
            cur.connection.commit()
            
        if Title > 0 :
            Title = cur1.fetchall()
            cur1.connection.commit()
            DocTitle = " , ".join([str(lis[1]) for lis in Title])

        Specialty = cur.execute("SELECT * FROM doctor_specialty WHERE doctor_id=%s", (doctor_id, ))
        Education = cur1.execute("SELECT * FROM doctor_education WHERE doctor_id=%s", (doctor_id, ))
        
        if Specialty > 0 :
            Specialty = cur.fetchall()
            cur.connection.commit()
        if Education > 0:
            Education = cur1.fetchall()
            cur1.connection.commit()

        Certification = cur.execute("SELECT * FROM doctor_certification WHERE doctor_id=%s", (doctor_id, ))
        Experience = cur1.execute("SELECT * FROM doctor_experience WHERE doctor_id=%s", (doctor_id, ))

        if Certification > 0:
            Certification = cur.fetchall()
            cur.connection.commit()

        if Experience > 0 :
            Experience = cur1.fetchall()
            cur1.connection.commit()

        Available_Online = cur.execute("SELECT * FROM `doctor_available_online` WHERE doctor_id=%s", (doctor_id, ))
        Available_Offline = cur1.execute("SELECT * FROM `doctor_availabledateclinic` WHERE doctor_id=%s", (doctor_id, ))

        if Available_Offline > 0:
            Available_Offline = cur1.fetchall()
            cur1.connection.commit()

        if Available_Online > 0:
            Available_Online = cur.fetchall()
            cur.connection.commit()

        Payment = cur.execute("SELECT * FROM `doctor_paymentinfo` WHERE doctor_id=%s", (doctor_id, ))
        if Payment > 0 :
            Payment = cur.fetchall()
            cur.connection.commit()

        ClinicAddress = cur.execute("SELECT * FROM `doctor_clinicaddress` WHERE doctor_id=%s", (doctor_id, ))
        if ClinicAddress > 0:
            ClinicAddress = cur.fetchall()
            cur.connection.commit()

        cur.close()
        cur1.close()

        return jsonify({"BasicInfo": BasicInfo,
                        "Titles": DocTitle,
                        "Specialty": Specialty,
                        "Education": Education, 
                        "Certification": Certification, 
                        "Experience": Experience,
                        "Available_Online" : Available_Online, 
                        "Available_Offline": Available_Offline, 
                        "Payment": Payment,
                        "Clinic_Address": ClinicAddress
                         }), 200

    except Exception as e: 
        return jsonify({"message": e}), 404

@doc_api.route("/doctor/update/personal", methods=["POST"])
def updatePersonalInfo():
    if request.method == 'POST':
        args = request.args.to_dict()
        doctor_id = request.json.get('doctor_id')
        cur = mysql.connection.cursor()
        firstname = request.json.get("first_name")
        middlename = request.json.get("middle_name")
        lastname = request.json.get("last_name") 
        suffix = request.json.get("suffix") 
        birthday = request.json.get("birthday")
        phone = request.json.get("phone")
        email = request.json.get("email") 
        consultation = request.json.get("mode_of_consultation")
        doc_image = request.json.get('doctor_image')
        password = request.json.get('password')
        try:
            cur.execute("UPDATE `doctor` SET `firstname`=%s,`middlename`=%s,`lastname`=%s,`suffix`=%s,`birthday`=%s,`contact_number`=%s,`email`=%s,`mode_of_consultation`=%s,`doctor_image`=%s,`password`=%s WHERE doctor_id=%s", (firstname,middlename,lastname,suffix,birthday,phone,email,consultation,doc_image,password, doctor_id))            
            cur.connection.commit()
            cur.close()
            return jsonify({
                'success': True
            }), 200
        except Exception as e: 
            print("Error has occured", e)
            return jsonify({"success": False}), 404

@doc_api.route("/doctor/update/education", methods=["POST"])
def updateEducInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Ed")
        newreq = list()
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:7]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
         
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")
        try:
            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM doctor_education WHERE `doctor_id`=%s AND id=%s ", (newreq[i][5], newreq[i][6]))
                if response > 0:
                    cur.execute("UPDATE `doctor_education` SET `school_type`=%s,`school_name`=%s,`graduation_date`=%s,`degree`=%s,`course`=%s WHERE `doctor_id`=%s AND id=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_education`(`doctor_id`, `school_type`, `school_name`, `graduation_date`, `degree`, `course`) VALUES (%s,%s,%s,%s,%s,%s)", (newreq[i][5], newreq[i][0:5]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e}), 404

@doc_api.route("/doctor/update/certificate", methods=["POST"])
def updateCertInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Cert")
        newreq = list()
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:5]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")
        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM doctor_certification WHERE `doctor_id`=%s AND id=%s ", (newreq[i][3], newreq[i][4]))
                if response > 0:
                    cur.execute("UPDATE `doctor_certification` SET `title`=%s,`giver`=%s,`date_given`=%s WHERE `doctor_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_certification`(`doctor_id`, `title`, `giver`, `date_given`) VALUES (%s,%s,%s,%s)", (newreq[i][3], newreq[i][0:3]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e}), 404
      
@doc_api.route("/doctor/update/specialization", methods=["POST"])
def updateSpecializationInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Spec")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:4]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")

        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM doctor_specialty WHERE `doctor_id`=%s AND id=%s ", (newreq[i][2], newreq[i][3]))
                if response > 0:
                    cur.execute("UPDATE `doctor_specialty` SET `specialties`=%s,`sub-specialty`=%s WHERE `doctor_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_specialty`(`doctor_id`, `specialties`, `sub-specialty`) VALUES (%s,%s,%s)", (newreq[i][2], newreq[i][0:2]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

@doc_api.route("/doctor/update/experience", methods=["POST"])
def updateExperienceInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Exp")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:6]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")

        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM doctor_experience WHERE `doctor_id`=%s AND id=%s ", (newreq[i][4], newreq[i][5]))
                if response > 0:
                    cur.execute("UPDATE `doctor_experience` SET `place_of_work`=%s,`job_title`=%s,`years_of_experience`=%s,`date_ended`=%s WHERE `doctor_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_experience`(`doctor_id`, `place_of_work`, `job_title`, `years_of_experience`, `date_ended`) VALUES (%s,%s,%s,%s,%s)", (newreq[i][4], newreq[i][0:4]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404


@doc_api.route("/doctor/update/payment", methods=["POST"])
def updatePaymentInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Pay")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:5]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")

        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM `doctor_paymentinfo` WHERE `doctor_id`=%s AND id=%s ", (newreq[i][3], newreq[i][4]))
                if response > 0:
                    cur.execute("UPDATE `doctor_paymentinfo` SET `payment_mode`=%s,`reference_name`=%s,`reference_number`=%s WHERE `doctor_id`=%s and `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_paymentinfo`(`doctor_id`, `payment_mode`, `reference_name`, `reference_number`) VALUES (%s,%s,%s,%s)", (newreq[i][3], newreq[i][0:3]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

@doc_api.route("/doctor/update/timeonline", methods=["POST"])
def updatetimeonlineInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("On")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][2:6]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")

        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM `doctor_available_online` WHERE `doctor_id`=%s AND id=%s ", (newreq[i][4], newreq[i][5]))
                if response > 0:
                    cur.execute("UPDATE `doctor_available_online` SET `day`=%s,`day_end`=%s,`time_start`=%s,`time_end`=%s WHERE `doctor_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_available_online`(`doctor_id`, `day`, `day_end`, `time_start`, `time_end`) VALUES (%s,%s,%s,%s,%s)", (newreq[i][4], newreq[i][0:4]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

@doc_api.route("/doctor/update/timeoffline", methods=["POST"])
def updatetimeofflineInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Off")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][3:7]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newlist.append(req[i][2])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")
  
        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM `doctor_availabledateclinic` WHERE `doctor_id`=%s AND id=%s  ", (newreq[i][4], newreq[i][6]))
                if response > 0:
                    cur.execute("UPDATE `doctor_availabledateclinic` SET `day`=%s,`day_end`=%s,`time_start`=%s,`time_end`=%s WHERE `doctor_id`=%s AND `address_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_availabledateclinic`(`doctor_id`, `address_id`, `day`, `day_end`, `time_start`, `time_end`) VALUES (%s,%s,%s,%s,%s,%s)", (newreq[i][4],newreq[i][5], newreq[i][0:5]))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

@doc_api.route("/doctor/update/clinicaddress", methods=["POST"])
def updateclinicInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Clinic")
        newreq = list()
        
        if type(req[0]) == list:
            for i in range(0, len(req)):
                newlist = req[i][3:9]
                newlist.append(req[i][0])
                newlist.append(req[i][1])
                newlist.append(req[i][2])
                newreq.append(newlist)
        elif type(req[0]) == dict:
            for i in range(0, len(req)):
                newreq.append(list(req[i].values()))
        else:
           print("None of the above")
        try:

            for i in range(0, len(newreq)):
                response = cur.execute("SELECT * FROM `doctor_clinicaddress` WHERE `doctor_id`=%s AND id=%s  ", (newreq[i][6], newreq[i][8]))
                if response > 0:
                    cur.execute("UPDATE `doctor_clinicaddress` SET `address`=%s,`barangay`=%s,`municipality`=%s,`province`=%s,`zip_code`=%s,`image`=%s WHERE `doctor_id`=%s AND `address_id`=%s AND `id`=%s", newreq[i])
                else:
                    cur.execute("INSERT INTO `doctor_clinicaddress`(`doctor_id`, `address_id`, `address`, `barangay`, `municipality`, `province`, `zip_code`, `image`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)", (newreq[i][6],newreq[i][7], newreq[i][0:6]))
            cur.connection.commit()
            cur.close()
            print("success")
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404


@doc_api.route("/doctor/getdoctor", methods=["GET"])
def getDoctor():
    args = request.args.to_dict()
    category = args.get("category")
    try:
        cur = mysql.connection.cursor()
        response = cur.execute("SELECT doctor_id FROM `doctor_specialty` WHERE `specialties`=%s", (category,))
        if response > 0: 
            doc_id = cur.fetchall()
        response1 = cur.executemany("SELECT * FROM doctor WHERE `doctor_id`=%s", doc_id)
        data = cur.fetchall()

        response2 = cur.executemany("SELECT * FROM doctor_title WHERE doctor_id=%s", doc_id)
        titles = cur.fetchall()
        print(data)
        return jsonify({"data": data, "titles": titles})
    except Exception as e: 
        print(e)
        return jsonify({"error": e}), 404

#add more logic
@doc_api.route("/setappointment", methods=["POST"])
def updateAppointmentStatus():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        app_id = request.json.get("id")
        status = request.json.get("status")
        try:
            if status == "Accepted":
                response = cur.execute("SELECT Doctor_id, Appointment_date FROM `appointment_request` WHERE Appointment_Id=%s", (app_id, ))
                det = cur.fetchone()

                response = cur.execute("SELECT * FROM `appointment_request` WHERE Doctor_id=%s AND Appointment_date=%s AND Status='Accepted' ORDER BY date_created", (det[0], det[1]))
                time = cur.fetchall()
                
                times = list()
                apt_time = "09:00"
                hasTime = False
                hour = 0 
                minute = 0
                for i in range(0, len(time)):
                    if time[i][4]:
                        times.append(time[i][4])
                        hasTime = True
                if hasTime:
                    tom = max(times).split(":")
                    if int(tom[1]) + 30 == 60:
                        hour = int(tom[0])
                        minute = "00"
                    else:
                        hour = tom[0]
                        minute = "30"
                    apt_time = str(hour) + ":" +str(minute)
                
                cur.execute("UPDATE `appointment_request` SET `Status`= %s, Queue=%s, Appointment_time=%s WHERE `Appointment_Id`=%s", (status, response+1,apt_time, app_id))
                cur.connection.commit()
            else:
                cur.execute("UPDATE `appointment_request` SET `Status`= %s WHERE `Appointment_Id`=%s", (status, app_id))
                cur.connection.commit()

            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e:
            print(e)
            return jsonify({'success': False}), 404
