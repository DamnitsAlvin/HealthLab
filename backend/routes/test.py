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
test_api=Blueprint('test_api', __name__)

@test_api.route("/test", methods=["POST"])
def fileHandler():
    if request.method == "POST":
        if "file" not in request.files:
            print("NO files")
            return jsonify({"message": "fail"})
        filed = request.files['file']
        filename = filed.filename
        filed.save(os.path.join("C:\\Users\\User\\Desktop\\New folder (2)\\uploads", filename))
        print(filename)

        return jsonify({"message": "received success"})

