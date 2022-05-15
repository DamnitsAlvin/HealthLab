from flask import jsonify
from flask_cors import CORS, cross_origin
from app import create_app
from userroutes import api
from flask_jwt_extended import JWTManager

app,mysql = create_app()
jwt = JWTManager(app)
app.register_blueprint(api, url_prefix='/api')

CORS(app, resources={r"/*": {"origins": "*"}}, headers='Content-Type')

if __name__ == "__main__":
    app.run(debug=True)


