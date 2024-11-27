from flask import Flask, Response, url_for, request, jsonify, render_template, Blueprint
from os import getcwd
from views import getters

app = Flask(__name__)

views = Blueprint("views", __name__, template_folder="templates")

app.register_blueprint(views)


@app.route("/api/")
def index():
    data = getters.list_of_backlogs()
    return render_template("index.html", **{"text": "Backlogs API Documentation", "data": data, 'type_of_data': type(data[0])})




@app.route("/api/task/new", methods=["POST"])
def new():
    body = request.get_json()
    print(body)
    return jsonify(body)


# @app.route("/api/update")
# def get():
#     # accepts payloads
#     return None


@app.route("/api/get")
def get():
    # get all or just one or from index to limit
    return None


@app.route("/api/archive")
def archive():
    # archive one or multiple
    return None


@app.route("/api/trash")
def trash():
    # delete one or multiple
    return None


if __name__ == "__main__":
    with app.test_request_context():
        print(url_for("index"), 'this is index')

    app.run(debug=True)
