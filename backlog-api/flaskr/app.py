from flask import Flask, Response, url_for

app = Flask(__name__)


@app.route("/api/")
def index():
    resp = Response("<h1>Hello</h1>")
    resp.headers["custom-header"] = "custom header content"
    return resp


@app.route("/api/new")
def new():
    return None


@app.route("/api/update")
def get():
    # accepts payloads
    return None


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
