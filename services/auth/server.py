from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)

SECRET = "secret"


@app.route("/auth", methods=["GET", "POST"])
def create_jwt():
    user_payload = request.get_json(force=True)
    try:
        encoded_jwt = str(
            jwt.encode(user_payload, SECRET, algorithm="HS256", headers={"typ": "JWT", "alg": "HS256"}))[2:-1]

        return make_response(jsonify(
            {
                "JWT": encoded_jwt
            }
        ), 200)
    except Exception as e:
        return make_response(jsonify(
            {
                "info": e
            }
        ), 500)
