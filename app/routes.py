# app/routes.py

from flask import Blueprint, render_template, request, redirect, url_for, flash, send_from_directory, jsonify, current_app
from flask_login import login_required, current_user
from app import db
import os
import img2pdf
from werkzeug.utils import secure_filename

# Define the Blueprint
main_bp = Blueprint('main', __name__)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

@main_bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main_bp.route('/upload', methods=['POST'])
@login_required
def upload():
    """Handle image upload and conversion to PDF."""
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part in the request.'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No file selected for uploading.'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Define user-specific upload and conversion directories
        user_upload_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], str(current_user.id))
        user_converted_folder = os.path.join(current_app.config['CONVERTED_FOLDER'], str(current_user.id))

        # Create directories if they don't exist
        os.makedirs(user_upload_folder, exist_ok=True)
        os.makedirs(user_converted_folder, exist_ok=True)

        # Save the uploaded file
        filepath = os.path.join(user_upload_folder, filename)
        file.save(filepath)

        try:
            # Convert the image to PDF
            pdf_filename = os.path.splitext(filename)[0] + '.pdf'
            pdf_filepath = os.path.join(user_converted_folder, pdf_filename)
            with open(pdf_filepath, "wb") as f:
                f.write(img2pdf.convert(filepath))

            # Generate the download URL
            download_url = url_for('main.download_file', filename=pdf_filename, _external=True)

            return jsonify({'status': 'success', 'download_url': download_url}), 200
        except Exception as e:
            return jsonify({'status': 'error', 'message': f'An error occurred during conversion: {str(e)}'}), 500
    else:
        return jsonify({'status': 'error', 'message': 'Allowed file types are jpg, jpeg, png.'}), 400

@main_bp.route('/download/<filename>', methods=['GET'])
@login_required
def download_file(filename):
    """Allow authenticated users to download the converted PDF."""
    user_converted_folder = os.path.join(current_app.config['CONVERTED_FOLDER'], str(current_user.id))
    # Ensure the directory exists
    if not os.path.exists(os.path.join(user_converted_folder, filename)):
        flash('File not found.', 'danger')
        return redirect(url_for('main.index'))

    return send_from_directory(user_converted_folder, filename, as_attachment=True)
