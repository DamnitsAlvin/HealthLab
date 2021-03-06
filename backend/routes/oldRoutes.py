from flask import Flask,jsonify, request, url_for, Blueprint


old_api = Blueprint("api", __name__, )
@old_api.route("/getalldoctor", methods=["GET", "POST"])
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


#@doc_api.route("/setappointment", methods=["POST"])
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