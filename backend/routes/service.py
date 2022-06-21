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
