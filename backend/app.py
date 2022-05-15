from flask import Flask
from flask_mysqldb import MySQL 
from config import ApplicationConfiguration

def create_app():
    app = Flask(__name__)
    app.config.from_object(ApplicationConfiguration)
    mysql = MySQL(app)
    return app,mysql

