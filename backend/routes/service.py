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

@ser_api.route("/updateService", methods=["POST"])
def updateService():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        location = request.json.get("location")
        offered = request.json.get("offered")
        payment = request.json.get("payment")
        serviceInfo = request.json.get('serviceInfo')
        time = request.json.get("time")

        ser_id = serviceInfo[0]
        serviceInfo = serviceInfo[1:7]
        serviceInfo.append(ser_id)

        try:
            cur.execute("UPDATE `service` SET `name`=%s,`is_verified`=%s,`email`=%s,`password`=%s,`image`=%s,`userType`=%s WHERE `service_id`=%s", (serviceInfo))
            cur.connection.commit()
            
            cur.execute("DELETE FROM `service_available_time` WHERE service_id= %s", (time[0][0], ))
            cur.connection.commit()
            for i in range(0, len(time)):
                avail_time = list()
                avail_time = time[i][2:6]
                avail_time.insert(0, time[i][0])
                cur.execute("INSERT INTO `service_available_time`(`service_id`, `open_time`, `closing_time`, `open_day`, `close_day`) VALUES (%s,%s,%s,%s,%s)", (avail_time ))
                cur.connection.commit()

            cur.execute("DELETE FROM `service_location` WHERE service_id=%s",(location[0][0], ))
            cur.connection.commit()
            for i in range(0, len(location)):
                cur.execute("INSERT INTO `service_location`(`service_id`, `address_id`, `address`, `barangay`, `municipality`, `province`, `zip_code`) VALUES (%s,%s,%s,%s,%s,%s,%s)", tuple(location[i]))
                cur.connection.commit()
            
            cur.execute("DELETE FROM `service_offered` WHERE service_id=%s", (offered[0][0],))
            for i in range(0, len(offered)):
                cur.execute("INSERT INTO `service_offered`(`service_id`, `service_name`, `service_cost`, `service_waiting_time`, `Description`) VALUES (%s,%s,%s,%s,%s)", tuple(offered[i][0:5]))
                cur.connection.commit()

            cur.execute("DELETE FROM `service_payment_option` WHERE service_id=%s", (payment[0][0], )) 
            for i in range(0, len(payment)):
                print(payment[i])
                cur.execute("INSERT INTO `service_payment_option`(`service_id`, `payment_mode`, `reference_name`, `reference_number`) VALUES (%s,%s,%s,%s)", tuple(payment[i][0:4]))
                cur.connection.commit() 

            cur.close()
            return jsonify({'success': True}), 200
        except Exception as e:
            print(e)
            return jsonify({'success': False}), 404