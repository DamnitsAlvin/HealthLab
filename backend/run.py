from flask import jsonify
from flask_cors import CORS, cross_origin
from app import create_app
from routes.user import api
from routes.doctor import doc_api
from routes.test import test_api
from routes.service import ser_api
from flask_jwt_extended import JWTManager

app,mysql = create_app()
jwt = JWTManager(app)
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(doc_api, url_prefix="/api")
app.register_blueprint(test_api, url_prefix="/api")
app.register_blueprint(ser_api, url_prefix="/api")

CORS(app, resources={r"/*": {"origins": "*"}}, headers='Content-Type')

if __name__ == "__main__":
    app.run(debug=True)


