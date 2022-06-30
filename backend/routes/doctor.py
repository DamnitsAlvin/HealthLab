from app import create_app
from flask import Blueprint, Flask, jsonify, request, url_for
from flask_jwt_extended import create_access_token
from math import sin, cos, sqrt, atan2, radians
from credentials import API_KEY 
import requests

app,mysql = create_app()
doc_api=Blueprint('doc_api', __name__)

#Create doctor
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
        password = request.json.get("password") 

        if consultation == "Virtual": 
            consultation = 0 
        elif consultation == "Face to Face":
            consulation = 1 
        else:
            consulation = 2 

        if(request.json.get("doctor_image")):
            image = request.json.get("doctor_image")
        else: 
            image = ""
        
        data = [
            doctor_id, 
            email, 
            "doctor"
        ]

        try:
            response = cur.execute("INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`,`doctor_image`,`password`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (doctor_id, firstname, middlename, lastname, suffix, birthday, phone, email, consultation, "false", image, password))
            cur.connection.commit()
            cur.close()
            return jsonify({"register": True}), 200

        except Exception as e:
            print("Something went wrong: ", e)
            return jsonify({"message": "invalid operation on database"}), 404

# Retrieve Doctor information
@doc_api.route("/doctorInformation", methods=["GET"])
def getDoctorInformation():
    cur = mysql.connection.cursor()
    cur1 = mysql.connection.cursor()
    args  = request.args.to_dict()
    doctor_id = args.get("doctor_id") 
    try:
        BasicInfo = cur.execute("SELECT * FROM doctor WHERE doctor_id=%s", (doctor_id, ))
        Title = cur1.execute("SELECT * FROM doctor_title WHERE doctor_id=%s", (doctor_id,))

        DocTitle=""
        Specialty = list()
        Education = list()
        Certification = list()
        Experience = list()
        Available_Online = list()
        Available_Offline = list()
        Payment = list()
        ClinicAddress  = list()
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
                        "Titles": Title,
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
        print(e)
        return jsonify({"message": "dunno"}), 404

#Update Doctor Information
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

#Update Doctor Information
@doc_api.route("/doctor/update/education", methods=["POST"])
def updateEducInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Ed")
        doc = request.json.get("id")
        newreq = list()

        if req:
            if type(req[0]) == list:
                for i in range(0, len(req)):
                    newlist = req[i][2:7]
                    newlist.append(req[i][0])
                    newlist.append(req[i][1])
                    #newlist = [] newreq = [[]]
                    newreq.append(newlist)
            
            elif type(req[0]) == dict:
                for i in range(0, len(req)):
                    newreq.append(list(req[i].values()))
            else:
                print("None of the above")

        try:
            cur.execute("DELETE FROM doctor_education WHERE `doctor_id`=%s", (doc,))
            for i in range(0, len(newreq)):
                rak = newreq[i][0:5]
                rak.insert(0,newreq[i][5] )
                cur.execute("INSERT INTO `doctor_education`(`doctor_id`, `school_type`, `school_name`, `graduation_date`, `degree`, `course`) VALUES (%s,%s,%s,%s,%s,%s)", rak)
           
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False}), 404

#Update Doctor Information
@doc_api.route("/doctor/update/certificate", methods=["POST"])
def updateCertInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Cert")
        doc = request.json.get("id")
        newreq = list()
        if req:
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
            cur.execute("DELETE FROM doctor_certification WHERE `doctor_id`=%s", (doc,) )
            for i in range(0, len(newreq)):
                rak = newreq[i][0:3]
                rak.insert(0,newreq[i][3])
                cur.execute("INSERT INTO `doctor_certification`(`doctor_id`, `title`, `giver`, `date_given`) VALUES (%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False}), 404

#Update Doctor Information      
@doc_api.route("/doctor/update/specialization", methods=["POST"])
def updateSpecializationInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Spec")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_specialty WHERE `doctor_id`=%s", (doc,))
            for i in range(0, len(newreq)):
                rak = newreq[i][0:2]
                rak.insert(0, newreq[i][2])
                cur.execute("INSERT INTO `doctor_specialty`(`doctor_id`, `specialties`, `sub-specialty`) VALUES (%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/experience", methods=["POST"])
def updateExperienceInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Exp")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_experience WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                rak = newreq[i][0:4]
                rak.insert(0,newreq[i][4])
                cur.execute("INSERT INTO `doctor_experience`(`doctor_id`, `place_of_work`, `job_title`, `years_of_experience`, `date_ended`) VALUES (%s,%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/payment", methods=["POST"])
def updatePaymentInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Pay")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_paymentinfo WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                rak = newreq[i][0:3]
                rak.insert(0, newreq[i][3])
                cur.execute("INSERT INTO `doctor_paymentinfo`(`doctor_id`, `payment_mode`, `reference_name`, `reference_number`) VALUES (%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/timeonline", methods=["POST"])
def updatetimeonlineInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("On")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_available_online WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                rak = newreq[i][0:4]
                rak.insert(0, newreq[i][4])
                cur.execute("INSERT INTO `doctor_available_online`(`doctor_id`, `day`, `day_end`, `time_start`, `time_end`) VALUES (%s,%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            return jsonify({'sucess': False, 'problem': e})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/timeoffline", methods=["POST"])
def updatetimeofflineInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Off")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_availabledateclinic WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                print(newreq[i])
                rak = newreq[i][0:4]
                rak.insert(0, newreq[i][4])
                rak.insert(1,newreq[i][5])
                cur.execute("INSERT INTO `doctor_availabledateclinic`(`doctor_id`, `address_id`, `day`, `day_end`, `time_start`, `time_end`) VALUES (%s,%s,%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/clinicaddress", methods=["POST"])
def updateclinicInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Clinic")
        doc = request.json.get("id")
        newreq = list()
        
        if req:
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
            cur.execute("DELETE FROM doctor_clinicaddress WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                print(newreq)
                rak = newreq[i][0:5]
                rak.insert(0,newreq[i][5])
                rak.insert(1,newreq[i][6])
                cur.execute("INSERT INTO `doctor_clinicaddress`(`doctor_id`, `address_id`, `address`, `barangay`, `municipality`, `province`, `zip_code`) VALUES (%s,%s,%s,%s,%s,%s,%s)", rak)
            cur.connection.commit()
            cur.close()
            print("success")
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False})  , 404

#Update Doctor Information
@doc_api.route("/doctor/update/title", methods=["POST"])
def updatetitleInfo():
    if request.method == "POST": 
        cur = mysql.connection.cursor()
        req = request.json.get("Title")
        doc = request.json.get("id")
        newreq = list()
        print(req)
        if req:
            if type(req[0]) == list:
                for i in range(0, len(req)):
                    newlist = req[i][0:2]
                    print(newlist)
                    newreq.append(newlist)
            elif type(req[0]) == dict:
                for i in range(0, len(req)):
                    newreq.append(list(req[i].values()))
            else:
                print("None of the above")

        try:
            cur.execute("DELETE FROM doctor_title WHERE `doctor_id`=%s", (doc, ))
            for i in range(0, len(newreq)):
                cur.execute("INSERT INTO `doctor_title`(`doctor_id`, `doctor_title`) VALUES (%s,%s)", newreq[i])
            cur.connection.commit()
            cur.close()
            print("success")
            return jsonify({'success': True}), 200
        except Exception as e: 
            print(e)
            return jsonify({'sucess': False})  , 404

#Retrieve doctor to display
@doc_api.route("/doctor/getdoctor", methods=["POST"])
def getDoctor():
    args = request.args.to_dict()
    category = request.json.get("category")
    lat = request.json.get('latitude')
    longitude = request.json.get('longitude')
    R = 6373.0
   
    if lat is None or lat=="":
        lat = radians(14.5995)
        longitude= radians(120.9842)

    try:
        if isinstance(lat, str):
            lat = lat.strip()
            lat = float(lat)
            lat = radians(lat)

            longitude = longitude.strip()
            longitude = float(longitude)
            longitude = radians(longitude)
        else:
            lat = radians(lat)
            longitude = radians(longitude)
    except ValueError as e:
        print(e)
    
 
    try:
        cur = mysql.connection.cursor()
        response = cur.execute("SELECT doctor_id FROM `doctor_specialty` WHERE `specialties`=%s", (category,))
        if response > 0: 
            doc_id = cur.fetchall()
        
        
        doc_address = []
        doctors = list()
        payload = {}
        headers = {}
  
        #display if doctor is verified
        for i in range(0, len(doc_id)): 
            print("doc_id: ", doc_id[i][0])
            response1 = cur.execute("SELECT * FROM doctor WHERE `doctor_id`=%s AND is_verified=%s", (doc_id[i][0], True ))
            data = cur.fetchone()

            if data is None:
                continue
            else:
                print("else of data is none")
                data = list(data)
                resp = cur.execute("SELECT * FROM `doctor_clinicaddress` WHERE doctor_id=%s", (doc_id[i][0], ))
                if resp > 0:
                    print("if of resp > 0")
                    add = cur.fetchone()
                    add = f"{add[3]} {add[4]} {add[5]} {add[6]}"
                    print("add: ", add)
                    url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={add}&inputtype=textquery&key={API_KEY}"
                    plac_id = requests.request("GET", url, headers=headers, data=payload)
                    plac_id = plac_id.json()
                    plac_id = plac_id['candidates'][0]['place_id']

                    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={plac_id}&key={API_KEY}"
                    plac_det = requests.request("GET", url, headers=headers, data=payload)
                    plac_det = plac_det.json()
                    lat1 = radians(plac_det['result']['geometry']['location']['lat'])
                    long1 = radians(plac_det['result']['geometry']['location']['lng'])

                    dlon = longitude - long1
                    dlat = lat - lat1

                    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat) * sin(dlon / 2)**2
                    c = 2 * atan2(sqrt(a), sqrt(1 - a))

                    distance = R * c

                    print("place_det: ", distance, "kms\n")
                    data.append(distance)
                else:
                    print("place_det: 1000 kms\n")
                    data.append('1000')
            doctors.append(data)

        doc_spec = list()   
        doc_title = list()
        if response > 0: 
            for i in range(0, len(doctors)):
                doc = cur.execute("SELECT * FROM `doctor_specialty` WHERE doctor_id=%s", (doctors[i][0], ))
                doc = cur.fetchall()
                for i in range(0, len(doc)):
                    doc_spec.append(doc[i])
            
            for i in range(0, len(doctors)):
                response2 = cur.execute("SELECT * FROM doctor_title WHERE doctor_id=%s", (doctors[i][0], ))
                title = cur.fetchall()
                for i in range(0 ,len(title)):
                    doc_title.append(title[i])


        return jsonify({"data": doctors, "titles": doc_title, "Specialization": doc_spec})
    except Exception as e: 
        print(e)
        return jsonify({"error": "gg"}), 404

#Update appointment
@doc_api.route("/setappointment", methods=["POST"])
def updateAppointmentStatus():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        app_id = request.json.get("id")
        status = request.json.get("status")
        try:
            print(f'{status}')
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

@doc_api.route("/setappointmentdone", methods=["POST"])
def updateAppointmentStatusDone():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        app_id = request.json.get("id")
        try:
            cur.execute("UPDATE `appointment_request` SET `Status`= %s WHERE `Appointment_Id`=%s", ("Done", app_id))
            cur.connection.commit()
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e:
            print(e)
            return jsonify({'success': False}), 404

@doc_api.route("/reportuser", methods=["POST"])
def reportauser():
    if request.method == 'POST':
        print("called")
        cur = mysql.connection.cursor()
        user_id = request.json.get("id")
        reason = request.json.get("reason")
        app_id = request.json.get("app_id")
        doc_id = request.json.get('doc_id')
        try:
            cur.execute("UPDATE `appointment_request` SET `Reported`= %s WHERE `Appointment_Id`=%s", (1, app_id))
            cur.execute("INSERT INTO `admin_reported_user`(`user_id`, `doctor_id`, `reason of report`) VALUES (%s,%s,%s)", (user_id, doc_id, reason))
            resp = cur.execute("SELECT reports FROM user WHERE user_id=%s", (user_id, ))
            
            resp = cur.fetchone()
            cur.execute("UPDATE user SET reports=%s WHERE user_id=%s", (resp[0]+1, user_id))
            cur.connection.commit()
            
            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e:
            print(e)
            return jsonify({'success': False}), 404

#????????
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
        except Exception as e:
            print(e)
            return jsonify({"message": "invalid operation on database "}), 404

