from flask import Flask, request, jsonify
from flask_cors import CORS
from lxml import etree

app = Flask(__name__)
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
        {"name": "Alice Johnson", "department": "Finance", "date": "2025-07-12"},
        {"name": "Mark Chen", "department": "Engineering", "date": "2025-01-21"}
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
