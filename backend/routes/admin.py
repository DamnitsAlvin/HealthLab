from app import create_app
from flask import Blueprint, Flask, jsonify, request, url_for
from flask_jwt_extended import create_access_token

app,mysql = create_app()
ad_api=Blueprint('admin_api', __name__)

@ad_api.route("/getDoctorServiceToVerify", methods=['GET'])
def getUsersToVerify():
    cur = mysql.connection.cursor()
    try:
        response = cur.execute("SELECT * FROM `verification` WHERE 1")
        response = cur.fetchall()
        return jsonify({"ToVerify": response}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "No users to verify"}),404

@ad_api.route("/setVerifyAccepted", methods=["POST"])
def verifyUser():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        user_id =  request.json.get("id")
        userType = request.json.get("user")
        mode = request.json.get("mode")
        try:
            cur.execute("DELETE FROM `verification` WHERE user_id=%s", (user_id, ))
            if mode== "Accept":
                if userType=="doctor":
                    cur.execute("UPDATE `doctor` SET `is_verified`=%s WHERE `doctor_id`=%s", (True, user_id) )
                else:
                    cur.execute("UPDATE ``service` SET `is_verifiedis_verified`=%s WHERE `service_id`=%s", (True, user_id) )
            else:
                if userType=="doctor":
                    cur.execute("UPDATE `doctor` SET `is_verified`=%s WHERE `doctor_id`=%s", (False, user_id) )
                else:
                    cur.execute("UPDATE ``service` SET `is_verifiedis_verified`=%s WHERE `service_id`=%s", (False, user_id) )
          
            cur.connection.commit()
            cur.close()
            return jsonify({"success": True}), 200
        except Exception as e:
            return jsonify({"success": False}), 404

@ad_api.route("/addVerification", methods=["POST"])
def addVerificatoin():
    if request.method=="POST":
        cur = mysql.connection.cursor()
        data = request.json.get("data")
        try:
            response = cur.execute("INSERT INTO `verification`(`user_id`, `first_name`, `last_name`, `license_image`, `license_image_back`,`user`) VALUES (%s,%s,%s,%s,%s, %s)", data)
            cur.connection.commit()
            print("UPDATE `doctor` SET `is_verified`=%s WHERE doctor_id=%s"%('2', data[0]))
            cur.execute("UPDATE `doctor` SET `is_verified`=%s WHERE doctor_id=%s", ('2', data[0].strip()))

            cur.connection.commit()
            cur.close
            return jsonify({"success": True}), 200
        except Exception as e:
            print(e)
            return jsonify({"success":False}), 404

@ad_api.route("/getdeleterequest", methods=["GET"])
def getDeleteReq():
    cur = mysql.connection.cursor()
    try:
        response = cur.execute("SELECT * FROM `admin_delete_app_req`")
        cur.connection.commit()
        if response >0:
            data = cur.fetchall()
            cur.close()
            return jsonify({"data": data}), 200
        return ({'data': []}), 200

    except Exception as e:
        print(e)
        return jsonify({'success': False}), 404

@ad_api.route("/deleteapp", methods=["DELETE"])
def deleteAppointmentReq():
    cur = mysql.connection.cursor()
    args = request.args.to_dict()
    app_id = args.get("id")
    try:

        response = cur.execute("DELETE FROM `admin_delete_app_req` WHERE Appointment_id=%s", (app_id, ))
        cur.connection.commit()

        response1 = cur.execute("SELECT Doctor_id, Appointment_date, Queue FROM `appointment_request` WHERE Appointment_id=%s", (app_id, ))
        dat = cur.fetchone()

        response2 = cur.execute("SELECT * FROM appointment_request WHERE Doctor_id=%s AND Appointment_date=%s", (dat[0], dat[1]))
        ggez = cur.fetchall()
        for i in range(0, len(ggez)):
            if ggez[i][9] > dat[2]:
                respeto = cur.execute("UPDATE appointment_request SET Queue=%s WHERE Appointment_Id=%s", (ggez[i][9]-1, ggez[i][0]))
                cur.connection.commit()
            else:
                continue
        
        response = cur.execute("DELETE FROM `appointment_request` WHERE Appointment_id=%s", (app_id, ))
        cur.connection.commit()

        return jsonify({"success": True}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 404

@ad_api.route("/getreporteduser", methods=['GET'])
def getreporteduser():
    cur = mysql.connection.cursor()
    try:
        response = cur.execute("SELECT * FROM `admin_reported_user`")
        data = cur.fetchall()
        cur.connection.commit()
        cur.close()
        return jsonify({'reported': data}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 404

@ad_api.route("/deletereporteduser", methods=["DELETE"])
def deletereporteduser():
    cur = mysql.connection.cursor()
    args =request.args.to_dict()
    user_id = args.get("id")
    print(user_id)
    try:
        cur.execute("DELETE FROM appointment_request WHERE Patient_id=%s", (user_id, ))
        cur.execute("DELETE FROM patient WHERE user_id=%s", (user_id, ))
        cur.execute("DELETE FROM user WHERE user_id=%s", (user_id, ))
        cur.execute("DELETE FROM `admin_reported_user` where user_id=%s", (user_id, ))
        cur.connection.commit()
        cur.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 404

