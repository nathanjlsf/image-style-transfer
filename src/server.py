from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
from io import BytesIO
from PIL import Image
import nst 
import threading


app = Flask(__name__)
CORS(app)

progress = 0

@app.route('/neural_style_transfer', methods=['POST'])
def neural_style_transfer():
    global progress
    progress = 0
    
    if 'content_image' not in request.files or 'style_image' not in request.files:
        return 'Please upload both content and style images', 400

    content_image = request.files['content_image']
    style_image = request.files['style_image']

    content_path = 'temp_content.jpg'
    style_path = 'temp_style.jpg'
    content_image.save(content_path)
    style_image.save(style_path)

    output_path = 'temp_output.jpg'
    
    def run_style_transfer():
        global progress
        success, message = nst.perform_nst_with_progress(content_path, style_path, output_path)
        if success:
            progress = 100
        else:
            progress = -1  # Indicate error

    threading.Thread(target=run_style_transfer).start()

    return jsonify({"message": "Style transfer started"}), 202

@app.route('/progress', methods=['GET'])
def get_progress():
    global progress
    return jsonify({"progress": progress})

@app.route('/result', methods=['GET'])
def get_result():
    global progress
    if progress == 100:
        with open('temp_output.jpg', 'rb') as f:
            output_image = BytesIO(f.read())
        return send_file(output_image, mimetype='image/jpeg')
    elif progress == -1:
        return "Error occurred during style transfer", 500
    else:
        return "Style transfer not complete", 202

if __name__ == '__main__':
    app.run(debug=True)