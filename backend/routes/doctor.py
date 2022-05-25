from flask import Flask,jsonify, request, url_for, Blueprint
from flask_jwt_extended import create_access_token
from app import create_app

app,mysql = create_app()
doc_api=Blueprint('doc_api', __name__)

@doc_api.route("/doctorbasicreg", methods=["POST"])
def registerBasicInformationDoctor():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        doctor_id = request.json.get("doctor_id")
        firstname = request.json.get("first_name")
        middlename = request.json.get("middle_name")
        lastname = request.json.get("last_name") 
        suffix = request.json.get("suffix") 
        birthday = request.json.get("birthday")
        phone = request.json.get("phone")
        email = request.json.get("email") 
        consultation = request.json.get("mode_of_consultation")

        if consultation == "Virtual": 
            consultation = 0 
        elif consultation == "Face to Face":
            consulation = 1 
        else:
            consulation = 2 

        image = request.json.get("doctor_image")
        password = request.json.get("password") 
        data = [
            doctor_id, 
            firstname, 
            middlename, 
            lastname, 
            birthday, 
            phone, 
            email, 
            consultation
        ]
        print("INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`, `password`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" % (doctor_id, firstname, middlename, lastname, suffix, birthday, phone, email, consultation, "false", password))
        try:
            response = cur.execute("INSERT INTO `doctor` (`doctor_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthday`, `contact_number`, `email`, `mode_of_consultation`, `is_verified`, `password`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (doctor_id, firstname, middlename, lastname, suffix, birthday, phone, email, consultation, "false", password))
            cur.connection.commit()
            cur.close()
            access_token = create_access_token(identity = doctor_id)
            return jsonify({"access_token": access_token, "data": data}), 200

        except Exception as e:
            print("Something went wrong: ", e)
            return jsonify({"message": "invalid operation on database"}), 404

@doc_api.route("/doctoreducreg", methods = ["POST"])
def registerEducInformationDoctor():
    if request.method =="POST":
        cur = mysql.connection.cursor()
        doctor_id = request.json.get("doctor_id")
        school_name = request.json.get("School_name")
        graduation_date = request.json.get("Grad_date")
        degree = request.json.get("Degree")
        course = request.json.get("Course")
        try:
            response = cur.execute("INSERT INTO `doctor_education` (`doctor_id`, `school_name`, `graduation_date`, `degree`, `course`) VALUES (%s, %s, %s, %s, %s)", (doctor_id, school_name, graduation_date, degree, course))
            cur.connection.commmit()
            cur.close()
            return jsonify({message: "Success"}), 200
        except:
            return jsonify({message: "invalid operation on database "}), 404

@doc_api.route("/doctorspecialtyreg", methods = ["POST"])
def registerSpecialtyInformationDoctor():
    if request.method =="POST":
        cur = mysql.connection.cursor()
        doctor_id = request.json.get('doctor_id')
        specialties = request.json.get("specialization")
        sub_specialty = request.json.get("sub_specialization")
        try:
            response = cur.execute("INSERT INTO `doctor_specialty` (`doctor_id`, `specialties`, `sub-specialty`) VALUES (%s, %s, %s)", (doctor_id, specialties, sub-specialty))
            cur.connection.commmit()
            cur.close()
            return jsonify({message: "Success"}), 200
        except:
            return jsonify({message: "invalid operation on database "}), 404
