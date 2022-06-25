from flask import Flask,jsonify, request, url_for, Blueprint
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from app import create_app
import os

app,mysql = create_app()
api=Blueprint('api', __name__)

#Create User
@api.route("/userreg", methods=["POST"])
def registerUser():
    if request.method=="POST":
        cur = mysql.connection.cursor()
        username = request.json.get("username")
        firstname= request.json.get("firstname")
        lastname = request.json.get("lastname")
        middlename = request.json.get("middlename")
        birthday = request.json.get("birthday")
        gender = request.json.get("gender")
        addressline1 = request.json.get("address1")
        addressline2 = request.json.get("address2")
        municipality = request.json.get("municipality")
        province = request.json.get("province")
        civilstats = request.json.get("civil_status")
        contactnum = request.json.get("contact_num")
        email = request.json.get("email")
        password = request.json.get("password")

        data = [
                username,
                firstname,
                lastname,
                middlename,
                birthday,
                gender, 
                addressline1, 
                addressline2, 
                municipality, 
                province, 
                civilstats,
                contactnum, 
                email
                ]
        try:
            print("Insert into user(`user_id`, `First_name`, `Last_name`,`Middle_name`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_status`, `Phone_number`, `Email`,`Password`) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"% (username, firstname, lastname,middlename,birthday,gender,addressline1,addressline2,municipality,province, civilstats, contactnum,email, password ))
            cur.execute("Insert into user(`user_id`, `First_name`, `Last_name`,`Middle_name`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_status`, `Phone_number`, `Email`,`Password`) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (username, firstname, lastname,middlename,birthday,gender,addressline1,addressline2,municipality,province, civilstats, contactnum,email, password ))
            cur.connection.commit()
            cur.execute("INSERT INTO `patient`(`Patient_id`, `user_id`, `First_name`, `Last_name`, `Relationship`, `Birthday`, `Gender`) VALUES (%s,%s,%s,%s,%s,%s,%s)", (username, username, firstname, lastname, "Self", birthday, gender))
            cur.connection.commit()
            cur.close()
            access_token = create_access_token(identity=username)
            return jsonify({"access_token": access_token, "data": data}), 200
        
        except Exception as ex: 
            print("Something went wrong: " , ex)
            return jsonify({"message": "Email was already in use" }), 404


#Create appointment
@api.route("/postAppointment", methods=["GET", "POST"])
def postAppointment():
    if request.method=="POST":
        cur = mysql.connection.cursor()
        appointment = request.json.get("appointment")
        print(f'{appointment}')
        try:
            cur.execute("INSERT INTO `appointment_request`(`Appointment_Id`, `Patient_id`, `Doctor_id`, `Appointment_date`,  `Description`, `Mode`) VALUES (%s,%s,%s,%s,%s, %s)", appointment) 
            cur.connection.commit()
            response = cur.execute("SELECT * FROM appointment_request WHERE Doctor_id=%s and Appointment_date=%s", (appointment[2], appointment[3]))
            if response > 0:
                rows= cur.rowcount
                cur.connection.commit()
                cur.close()
            return jsonify({"success": True, "queue": rows }), 200
        except Exception as e:
            print(e)
            return jsonify({"success": False}), 404

#Create Patient
@api.route("/regPatient", methods=["POST"])
def registerPatient():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        patient = request.json.get("Patient")
        try:
            response = cur.execute("SELECT * FROM patient WHERE USER_ID=%s AND First_name=%s")
            if not response > 0:
                cur.execute("INSERT INTO `patient`(`Patient_id`, `user_id`, `First_name`, `Last_name`, `Relationship`, `Birthday`, `Gender`) VALUES (%s,%s,%s,%s,%s,%s,%s)", patient)
                cur.connection.commit()
                cur.close()
            return jsonify({"success": True}), 200
        except Exception as e:
            return jsonify({"success": False}), 404

#Retrieve Appointment
@api.route("/getAppointment", methods=["GET", "POST"])
def getUserAppointment():
    if request.method == "POST": 
        userId = request.json.get("User_id")
        userType = request.json.get("User_type")
        cur = mysql.connection.cursor() 
        if userType == "user":
            try:
                response = cur.execute("SELECT Patient_id, First_name, Last_name FROM patient WHERE user_id=%s", (userId, ))
                if response > 0: 
                    Patient_name = cur.fetchall() 
                    cur.connection.commit()
                
                    #get appointments
                    data = list()
                    doctor_name = list()

                    for i in range(0, len(Patient_name)): 
                        resval = cur.execute("SELECT * FROM appointment_request WHERE Patient_id = %s ORDER BY date_created",(Patient_name[i][0], ))
                        if resval > 0: 
                            appointments = cur.fetchall()
                            cur.connection.commit()
                            for i in range(0, len(appointments)):
                                data.append(appointments[i])
                
                    for i in range(0, len(data)):
                        doc = cur.execute("SELECT * FROM doctor WHERE doctor_id=%s", (data[i][2], ))
                        doctor_name.append(cur.fetchone()[0:4])

                    return jsonify({"Appointments": data, "Name": Patient_name, "Doctor": doctor_name}), 200
                return jsonify({"message": "currently no appointments to show!"}), 404
            except Exception as e:
                print(e)
                return jsonify({"error": True}), 404

        elif userType == "doctor": 
            try:
                resval = cur.execute("SELECT * FROM appointment_request WHERE Doctor_id = %s ORDER BY date_created",(userId, ))
               
                if resval > 0: 
                    data = cur.fetchall()
                    response = cur.execute('SELECT DISTINCT Patient_id FROM appointment_request WHERE Doctor_id=%s', (userId, ))
                    cur.connection.commit()
                    patient_id = cur.fetchall()
                    print(f"{patient_id}")

                    Patient_name = list()
                    for i in range(0, len(patient_id)):
                        response = cur.execute("SELECT * FROM patient WHERE Patient_Id=%s", (patient_id[i][0], ))
                        cur.connection.commit()
                        Patient = cur.fetchone()
                        Patient_name.append(Patient[0:4])

                    print(f'{Patient_name}')
                    return jsonify({"Appointments": data, "Name": Patient_name}), 200
                return jsonify({"message": "currently no appointments to show!"})
            except Exception as e :
                print(e)
                return jsonify({"error": True})
            return jsonify({'ongoing': True})
        else: 
            return jsonify({"error": "lack of parameters"})

#Retrieve User
@api.route("/userInformation", methods=["GET"])
def getUserInformation():
    args  = request.args.to_dict()
    user_id = args.get("userID")
    print(user_id)
    cur = mysql.connection.cursor()
    try:
        response = cur.execute("SELECT * FROM user WHERE user_id=%s", (user_id, )) 
        if response is not None:
            data = cur.fetchone()
            cur.connection.commit()
            print(f'{data}')
            cur.close()
            return ({'userData': data}), 200
        else:
            return ({'success': False}), 404
    except Exception as e:
        print(e)
        return({'success': False}), 404

#Delete appointment 
@api.route("/deleteAppointment", methods=["DELETE"])
def deleteAppointment():
    cur = mysql.connection.cursor()
    args  = request.args.to_dict()
    app_id = args.get("id") 
    try:
        data = cur.execute("DELETE FROM `appointment_request` WHERE Appointment_Id=%s", (app_id, ))
        cur.connection.commit()
        cur.close()
        return jsonify({'success': True}), 200
    except Exception as e: 
        return jsonify({"success": False}), 404

#Update User
@api.route("/updateuserinformation", methods=["POST"])
def updateUserInformation():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        req = request.json.get("details")
        dat = req[1:15]
        if req[15] is None:
            dat.append("")
        else:
            dat.append(req[15])
        dat.append(req[0])
        print(f'{req[1:16]}')
        print('length: ', len(req))
        print("UPDATE `user` SET `First_name`=%s,`Last_name`=%s,`Middle_name`=%s,`Birthday`=%s,`Gender`=%s,`Address_line1`=%s,`Address_line2`=%s,`Municipality`=%s,`Province`=%s,`Civil_Status`=%s,`Phone_Number`=%s,`Email`=%s,`Password`=%s,`userType`=%s,`userImage`=%s WHERE `user_id`=%s"%tuple(dat))
        try: 
            cur.execute("UPDATE `user` SET `First_name`=%s,`Last_name`=%s,`Middle_name`=%s,`Birthday`=%s,`Gender`=%s,`Address_line1`=%s,`Address_line2`=%s,`Municipality`=%s,`Province`=%s,`Civil_Status`=%s,`Phone_Number`=%s,`Email`=%s,`Password`=%s,`userType`=%s,`userImage`=%s WHERE `user_id`=%s", tuple(dat))
            cur.connection.commit()
            cur.close()
            return({'succes': True}), 200
        except Exception as e:
            print(e)
            return ({'success':False}), 404


@api.route("/checkDate", methods=["GET"])
def CheckAppointmentDate():
    cur = mysql.connection.cursor()
    args = request.args.to_dict()
    doc_id = args.get('doc_id')
    date = args.get('date')
    try:
        response = cur.execute("SELECT * FROM `appointment_request` where Doctor_id=%s AND Appointment_date=%s AND Status='Accepted'", (doc_id, date))
        cur.connection.commit()
        print(response)
        if response > 5:
            return jsonify({"dateFull": True}), 200
        else:
            return jsonify({"dateFull": False}), 200
        
    except Exception as e:
        print(e)
        return jsonify({'message': 'gg'}), 404

@api.route("/email", methods=["POST"])
def checkEmail():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        email = request.json.get("email")
        response = cur.execute("SELECT * FROM user WHERE Email=%s",(email,))
        if response is None:
            response = cur.execute("SELECT * FROM doctor WHERE email=%s", (email,))
            # add contraint for service 
            if response is None:
                pass
        
        if response == 0:
            return jsonify({"message": "all goods"}), 200
        else:
            return jsonify({"message": "email is in use"}), 404
       
@api.route("/updateImage", methods=["POST"])
def fileImageHandler():
    if request.method == "POST":
        if "file" not in request.files:
            print("NO files")
            return jsonify({"success": False}), 404
        filed = request.files['file']
        pic_id = request.form['id']  
        filename = filed.filename
        extension = filename.split(".")[1]
        filed.save(os.path.join("C:\\Users\\User\\Desktop\\Projects\\HealthLab\\front\\public\\uploads", pic_id+"Image."+extension))
        return jsonify({"success": True}), 200

@api.route("/usersauth", methods=["POST"])
def authenticateUser():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        username = request.json.get("ID")
        password = request.json.get("password")
        userType = request.json.get("userType")

        if userType == "user": 
            response = cur.execute('SELECT * FROM user where (user_id=%s or email=%s)', (username,username))
        elif userType == "doctor": 
            response = cur.execute('SELECT * FROM doctor where (doctor_id=%s or email=%s)', (username,username))
        else:
            response = cur.execute('SELECT * FROM service where (service_id=%s or email=%s)', (username,username))
        
        if response is None:
            print("response is none ")
            return ({"message": "NO user with that ID"}), 401
            print("should not be seen")

        else: 
            data = cur.fetchone()
 
        if userType == "user": 
            if data[13] == password:
                access_token = create_access_token(identity=username)
                cur.connection.commit()
                cur.close()
                return jsonify({"access_token": access_token, 
                                "data": [data[0], data[12], data[14], data[1], data[2]] }), 200
            else:
                return jsonify({"message": "Invalid password"}), 401

        elif userType == "doctor": 
            if data[11] == password:
                access_token = create_access_token(identity=username)
                cur.connection.commit()
                cur.close()
                return jsonify({"access_token": access_token, 
                                "data": [data[0], data[7], data[12]] }), 200
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            if data[4] == password:
                access_token = create_access_token(identity=username)
                cur.connection.commit()
                cur.close()
                return jsonify({"access_token": access_token, 
                                "data": [data[0], data[1], data[6]] }), 200
        