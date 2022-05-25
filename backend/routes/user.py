from flask import Flask,jsonify, request, url_for, Blueprint
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from app import create_app

app,mysql = create_app()
api=Blueprint('api', __name__)


@api.route("/users", methods =["GET"])
def displayUser():
    cur = mysql.connection.cursor()
    Resval = cur.execute("Select * from user")
    if Resval > 0:
        data = cur.fetchall()
        print(data)
        cur.connection.commit()
        cur.close()
        
        return jsonify({"data": data}), 200

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
            return ({"message": "NO user with that ID"}), 401
        else: 
            data = cur.fetchone()

        if data[14] == password:
            access_token = create_access_token(identity=username)
            cur.connection.commit()
            cur.close()
            return jsonify({"access_token": access_token, "data": data[:14]}), 200

        else:
            return jsonify({"message": "Invalid password"}), 401

@api.route("/userreg", methods=["POST"])
def registerUser():
    if request.method=="POST":
        cur = mysql.connection.cursor()
        username = request.json.get("username")
        firstname= request.json.get("firstname")
        lastname = request.json.get("lastname")
        middlename = request.json.get("middlename")
        suffix = request.json.get("suffix")
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
                suffix, 
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
            cur.execute("Insert into user(`user_id`, `First_name`, `Last_name`,`Middle_name`, `Suffix`, `Birthday`, `Gender`, `Address_line1`, `Address_line2`, `Municipality`, `Province`, `Civil_status`, `Phone_number`, `Email`,`Password`) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (username, firstname, lastname,middlename,suffix,birthday,gender,addressline1,addressline2,municipality,province, civilstats, contactnum,email, password ))
            cur.connection.commit()
            cur.close()
            access_token = create_access_token(identity=username)
            return jsonify({"access_token": access_token, "data": data}), 200
        
        except Exception as ex: 
            print("Something went wrong: {} ".format(type(ex)))
            return jsonify({"message": "Email was already in use" }), 404


@api.route("/getalldoctor", methods=["GET", "POST"])
def getalldoctor():
    if request.method == "POST":
        tosearch = request.json.get("category"); 
        query =""
        if tosearch == "1": 
            query = "Select * from doctor where 1"
           
        else:
            query = "Select * from doctor where Specialization = '" +tosearch+"'"
           
        
        cur = mysql.connection.cursor()
        resval = cur.execute(query)
        doctorname = []
        if resval > 0: 
            data = cur.fetchall()
            for i in range(0,len(data)):
                curs = mysql.connection.cursor()
                curs.execute("SELECT * from employee where Employee_id=%s",(data[i][0]) ); 
                val= curs.fetchall()
                curs.connection.commit()
                curs.close()
                doctorname.append(val[0])    
            cur.connection.commit()
            cur.close()
            return jsonify({"data": data, "doctor_info": doctorname}), 200
        return jsonify({"error": "No doctor found!"})

@api.route("/postAppointment", methods=["GET", "POST"])
def postAppointment():
    if request.method=="POST":
        cur = mysql.connection.cursor()
        appointmentId = request.json.get("appointmentId")
        patientId = request.json.get("patientId")
        doctorId = request.json.get("doctorId")
        appointmentDate = request.json.get("appointmentDate")
        appointmentTime = request.json.get("appointmentTime")
        status = "Pending"
        specialty = request.json.get("specialty")
        if specialty == "Dentistry":
            dentistFunction(appointmentId)
        elif specialty == "Opthalmologist":
            optalFunctions(appointmentId)
        elif specialty == "Ob-Gyn":
            OBFunctions(appointmentId)
        else: 
            GHFunctions(appointmentId)
        try:
            cur.execute("INSERT INTO appointment_request(Appointment_Id, Patient_id, Doctor_id, Appointment_date, Appointment_time, Status, Specialty) values(%s, %s,%s,%s, %s,%s,%s)", (appointmentId, patientId, doctorId, appointmentDate, appointmentTime, status, specialty)) 
            cur.connection.commit()
            cur.close()
            return "Successful", 200
        except:
            return "Error"

def dentistFunction(appointmentId):
    print("called")
    if request.method =="POST":
        cur = mysql.connection.cursor()
        hasMouthSore = request.json.get("hasMouthSore")
        hasJawPain = request.json.get("hasJawPain")
        hasSwollenFace = request.json.get("hasSwollenFace")
        hasSensitiveTeeth = request.json.get("hasSensitiveTeeth")
        hasBrokenTeeth = request.json.get("hasBrokenTeeth")
        hasDryMouth = request.json.get("hasDryMouth")
        hasBleedingGums = request.json.get("hasBleedingGums")
        hasBadTaste = request.json.get("hasBadTaste")
        isSmoker = request.json.get("isSmoker")
        description = request.json.get("description")
        try:
            cur.execute("INSERT INTO `dentistappointmentrequest`(`appointment_request`, `hasMouthSore`, `hasJawPain`, `hasSwollenFace`, `hasSensitiveTeeth`, `hasBrokenTeeth`, `hasDryMouth`, `hasBleedingGums`, `hasBadTaste`, `isSmoker`, `description`) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)",(appointmentId, hasMouthSore, hasJawPain, hasSwollenFace, hasSensitiveTeeth, hasBrokenTeeth, hasDryMouth, hasBleedingGums, hasBadTaste, isSmoker, description))
            cur.connection.commit()
            cur.close()
            return "Successful", 200
        except Exception:
            return "Error"

def optalFunctions(appointmentId):
    if request.method == "POST":
        print("called")
        cur = mysql.connection.cursor() 
        hasEyeStrain = request.json.get("hasEyeStrain")
        hasDryEyes = request.json.get("hasDryEyes")
        hasItchyEyes = request.json.get("hasItchyEyes")
        hasIrritatedEyes  = request.json.get("hasIrritatedEyes")
        hasFluctuatingVision= request.json.get("hasFluctuatingVision")
        hasFrequentHeadache= request.json.get("hasFrequentHeadach")
        hasRedEyes= request.json.get("hasRedEyes") 
        hasTrouble= request.json.get("hasTrouble") 
        usingGadget = request.json.get("usingGadget") 
        seeingGlare = request.json.get("seeingGlare")
        description = request.json.get("description")
        try:
            cur.execute("INSERT INTO `optalappointmentrequest`(`appointment_request`, `hasEyeStrain`, `hasDryEyes`, `hasIrritatedEyes`, `hasItchyEyes`, `hasFluctuatingVision`, `hasFrequentHeadache`, `hasRedEyes`, `hasTrouble`, `usingGadget`, `seeingGlare`, `description`) VALUES(%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s)", (appointmentId,hasEyeStrain,hasDryEyes,hasItchyEyes, hasIrritatedEyes, hasFluctuatingVision,hasFrequentHeadache,hasRedEyes,hasTrouble,usingGadget,seeingGlare,description))
            cur.connection.commit()
            cur.close()
            return "Succesful", 200
        except:
            return "Error"

def OBFunctions(appointmentId):
    if request.method == "POST":
        print("called")
        cur = mysql.connection.cursor() 
        hasPainfulPeriods = request.json.get("hasPainfulPeriods")
        hasVaginalOdor = request.json.get("hasVaginalOdor")
        hasSwollenBumps = request.json.get("hasSwollenBumps")
        hasVaginalDryness  = request.json.get("hasVaginalDryness")
        hasPain = request.json.get("hasPain")
        hasUrinaryLeak = request.json.get("hasUrinaryLeak")
        hasLowLibido= request.json.get("hasLowLibido") 
        isASmoker= request.json.get("isASmoker") 
        hasSTD = request.json.get("hasSTD") 
        description = request.json.get("description")
        try:
            cur.execute("INSERT INTO `obappointmentrequest`(`appointment_request`, `hasPainfulPeriods`, `hasVaginalOdor`, `hasSwollenBumps`, `hasVaginalDryness`, `hasPain`, `hasUrinaryLeak`, `hasLowLibido`, `isASmoker`, `hasSTD`, `description`) VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s)",(appointmentId, hasPainfulPeriods ,hasVaginalOdor,hasSwollenBumps,hasVaginalDryness,hasPain,hasUrinaryLeak,hasLowLibido,isASmoker,hasSTD,description))
            cur.connection.commit()
            cur.close()
            return "Succesful", 200
        except:
            return "Error"

def GHFunctions(appointmentId):
    if request.method == "POST":
        print("called")
        cur = mysql.connection.cursor() 
        patientInCur = request.json.get("patientInCur")
        frequentHeadache  = request.json.get("frequentHeadache")
        fatigue = request.json.get("fatigue")
        shortness  = request.json.get("shortness")
        sleepless  = request.json.get("sleepless")
        urinary  = request.json.get("urinary")
        isSmoker = request.json.get("isSmoker")
        description = request.json.get("description")
        try:
            cur.execute("INSERT INTO `ghappointmentrequest`(`appointment_request`, `patientInCur`, `frequentHeadaches`, `fatigue`, `shortnessOfBreath`, `sleeplessNight`, `urinaryLeakage`, `isSmoker`, `description`) VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s)", (appointmentId, patientInCur, frequentHeadache, fatigue, shortness, sleepless, urinary, isSmoker, description))
            cur.connection.commit()
            cur.close()
            return "Succesful", 200
        except:
            return "Error"

@api.route("/getAppointment", methods=["GET", "POST"])
def getUserAppointment():
    if request.method == "POST": 
        userId = request.json.get("User_id")
        cur = mysql.connection.cursor() 
        try:
            print("called here")
            resval = cur.execute("SELECT * FROM appointment_request WHERE Patient_id = %s",(userId,))
         
            print("called here againt")
            
            if resval > 0: 
                data = cur.fetchall()
                print(data)
                cur.connection.commit()
                cur.close()
                print(jsonify({"data": data}))

                return jsonify({"data":data}), 200
            return jsonify({"message": "currently no appointments to show!"})
        except:
            return "Error"

