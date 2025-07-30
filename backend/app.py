from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from lxml import etree
import os

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

@app.route("/upload", methods=["POST"])
def upload_xml():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    xml_data = file.read()

    try:
        parser = etree.XMLParser(load_dtd=True, resolve_entities=True)
        root = etree.fromstring(xml_data, parser=parser)

        name = root.find("name").text
        email = root.find("email").text
        department = root.find("department").text

        return jsonify({
            "name": name,
            "email": email,
            "department": department
        })
    except Exception as e:
        return jsonify({"error": f"Invalid XML: {e}"}), 400


@app.route("/history", methods=["GET"])
def history():
    return jsonify([
        {"name": "Alice Johnson", "department": "Finance", "date": "2023-09-12"},
        {"name": "Mark Chen", "department": "Engineering", "date": "2023-11-21"}
    ])

# Serve React frontend from /static
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
