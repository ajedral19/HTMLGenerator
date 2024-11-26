from flask import Flask, Response, url_for, request, jsonify, render_template, Blueprint

app = Flask(__name__)

views = Blueprint("views", __name__, template_folder="views")

app.register_blueprint(views)


@app.route("/api/")
def index():
    # resp = Response("<h1>Hello</h1>")
    data = {"test": "some data"}
    # resp.headers["custom-header"] = "custom header content"
    return jsonify(data)
    # return resp
    # return render_template("test.html", **{"test_data": "this is a test"})


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
        print(url_for("index"))

    app.run(debug=True)
