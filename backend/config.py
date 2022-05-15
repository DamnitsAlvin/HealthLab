import os 

class ApplicationConfiguration: 
    SQLALCHEMY_DATABASE_URI = "mysql://root:@localhost/test"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CORS_HEADERS = "Content-Type"

    MYSQL_HOST = os.environ.get("DATABASE_HOST")
    MYSQL_USER = os.environ.get("DATABASE_USER")
    MYSQL_PASSWORD = os.environ.get("DATABASE_PASSWORD")
    MYSQL_DB = os.environ.get("DATABASE_DB")

    FLASK_ENV="development"
    FLASK_APP_KEY="any key works"

    JWT_SECRET_KEY = os.environ.get("JWT_SECRET")


    

