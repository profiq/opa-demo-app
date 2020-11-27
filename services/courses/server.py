from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

OPA_URL = "http://opa:8181/v1/data"
DATA_JSON_PATH = "/app/share/data.json"


@app.route("/all_courses", methods=["GET"])
def all_courses():
    try:
        with open(DATA_JSON_PATH, "r") as f:
            json_data = json.load(f)

        lst_names = list(json_data["courses"].keys())
        return make_response(jsonify(
            {
                "courses": lst_names
            }
        ), 200)
    except Exception as e:
        return make_response(jsonify(
            {
                "info": e
            }
        ), 500)


@app.route("/course_detail", methods=["POST"])
def course_detail():
    try:
        with open(DATA_JSON_PATH, "r") as f:
            json_data = json.load(f)

        user_payload = request.get_json(force=True)
        course = user_payload["course"]

        course_id = json_data["courses"][course]["id"]
        course_name = json_data["courses"][course]["name"]
        course_credits = json_data["courses"][course]["credits"]
        course_time_slot = list(json_data["courses"][course]["time_slot"])
        course_teachers = list(json_data["courses"][course]["teachers"])

        return make_response(jsonify(
            {
                "id": course_id,
                "name": course_name,
                "credits": course_credits,
                "time_slot": course_time_slot,
                "teachers": course_teachers
            }
        ), 200)
    except Exception as e:
        return make_response(jsonify(
            {
                "info": e
            }
        ), 500)


@app.route("/course_update", methods=["POST"])
def update_course():
    user_payload = request.get_json(force=True)

    course = user_payload["course"]
    data_course = user_payload["data"]

    try:
        with open(DATA_JSON_PATH, "r") as f:
            json_data = json.load(f)

        json_data["courses"][course] = data_course

        with open(DATA_JSON_PATH, "w") as f:
            json.dump(json_data, f)

        headers = {"Content-type": "application/json-patch+json"}
        requests.put(OPA_URL, data=open(DATA_JSON_PATH, "rb"), headers=headers)
        return make_response(jsonify(
            {
                "info": f"json data updated"
            }
        ), 200)
    except Exception as e:
        return make_response(jsonify(
            {
                "info": e
            }
        ), 500)


if __name__ == '__main__':
    app.run(debug=True)
