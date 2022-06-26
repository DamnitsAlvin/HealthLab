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
            response = cur.execute("INSERT INTO `verification`(`user_id`, `first_name`, `last_name`, `license_image`, `user`) VALUES (%s,%s,%s,%s,%s)", data)
            cur.connection.commit()
            print("UPDATE `doctor` SET `is_verified`=%s WHERE doctor_id=%s"%('2', data[0]))
            cur.execute("UPDATE `doctor` SET `is_verified`=%s WHERE doctor_id=%s", ('2', data[0].strip()))

            cur.connection.commit()
            cur.close
            return jsonify({"success": True}), 200
        except Exception as e:
            print(e)
            return jsonify({"success":False}), 404
        


