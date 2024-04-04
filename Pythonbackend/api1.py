from flask import Flask, render_template, request, jsonify
from PIL import Image
import pytesseract
import io

app = Flask(__name__)

# # HTML form to upload image
# UPLOAD_HTML = '''
# <!doctype html>
# <html>
# <head><title>Upload Image</title></head>
# <body>
# <form method="post" action="/upload" enctype="multipart/form-data">
#   <input type="file" name="image">
#   <input type="submit" value="Upload">
# </form>
# </body>
# </html>
# '''

@app.route('/')
def upload_form():
    return UPLOAD_HTML

@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if the POST request has a file part
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']

    # Check if the file is an image
    if image_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
    if not image_file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
        return jsonify({'error': 'Unsupported image format'}), 400

    try:
        # Open image file using PIL (Python Imaging Library)
        img = Image.open(io.BytesIO(image_file.read()))
        # Use pytesseract to convert image to text
        pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
        text = pytesseract.image_to_string(img)
        
        return jsonify({'text': text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run()