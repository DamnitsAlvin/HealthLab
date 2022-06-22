from app import create_app
from flask import Blueprint, Flask, jsonify, request, url_for
from flask_jwt_extended import create_access_token


app,mysql = create_app()
ser_api=Blueprint('ser_api', __name__)

@ser_api.route("/registerService", methods=["POST"])
def registerService():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        info = request.json.get("Info")
        print(info)
        try:
            cur.execute("INSERT INTO `service`(`service_id`, `name`, `email`, `password`, `image`) VALUES (%s,%s,%s,%s,%s)", info)
            cur.connection.commit()
            cur.close()
            return jsonify({"success": True}), 200
        except Exception as e:
            print(e)
            return jsonify({"success": False}), 404

@ser_api.route("/serviceInfo", methods=["GET"])
def getServiceInfo():
    cur = mysql.connection.cursor()
    cur1 = mysql.connection.cursor()
    args  = request.args.to_dict()
    service_id = args.get("service_id")
    service_id = service_id.strip()
    print(f'{service_id}is awesomes')
    print(len(service_id))
    try:
        response = cur.execute("SELECT * FROM service WHERE service_id=%s", (service_id, ))
        response = cur.fetchone()
        cur.connection.commit()

        available_time = cur.execute("SELECT * FROM `service_available_time` WHERE service_id=%s", (service_id, ))
        location = cur1.execute("SELECT * FROM `service_location` WHERE service_id=%s", (service_id, ))

        if available_time > 0: 
            available_time = cur.fetchall()
            cur.connection.commit()

        if location > 0: 
            location = cur1.fetchall()
            cur1.connection.commit()
        
        offered = cur.execute("SELECT * FROM `service_offered` WHERE service_id=%s", (service_id, ))
        payment = cur1.execute("SELECT * FROM `service_payment_option` WHERE service_id=%s", (service_id, ))

        if offered > 0: 
            offered = cur.fetchall()
            cur.connection.commit()
        
        if payment > 0: 
            payment = cur1.fetchall()
            cur1.connection.commit()


        
        return jsonify({
            "service_info": response, 
            "available_time": available_time, 
            "location": location, 
            "service_offered": offered, 
            "payment": payment
        }), 200
    except Exception as e:
        print(e)
        return jsonify({"service_info": False}), 404