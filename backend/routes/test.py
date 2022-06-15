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
@test_api.route("/test1", methods=["GET"])
def insertManyValues():
    print("InsertManyValues was called")
    cur = mysql.connection.cursor()
    val = [
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
    ]
    sql = "INSERT INTO test (name, address) VALUES (%s, %s)"
    cur.executemany(sql,val)
    cur.connection.commit()
    print(cur.rowcount, " rows was inserted")
    return jsonify({'last_row_id': cur.lastrowid})

@test_api.route("/testd", methods=["GET"])
def testonle():
    args = request.args
    print("Request: ", type(args))
    return args

@test_api.route("/users", methods =["GET"])
def displayUser():
    cur = mysql.connection.cursor()
    Resval = cur.execute("Select * from user")
    if Resval > 0:
        data = cur.fetchall()
        print(data)
        cur.connection.commit()
        cur.close()
        
        return jsonify({"data": data}), 200


