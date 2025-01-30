```markdown
# ImgToPDF Converter

![Flask](https://img.shields.io/badge/Flask-1.1.2-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple.svg)
![Python](https://img.shields.io/badge/Python-3.9-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

<img src="https://img.icons8.com/color/96/000000/image-to-pdf.png" alt="ImgToPDF Logo" align="right">

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Description

**ImgToPDF Converter** is a user-friendly web application that allows users to effortlessly convert their images (JPG, JPEG, PNG) into PDF files. Designed with a modern and responsive interface using Bootstrap 5, the application ensures a seamless experience across all devices. Developed in just **2 hours** with the assistance of [ChatGPT](https://chat.openai.com/), this app showcases the power of combining rapid development tools with intelligent assistance.

## Features

- **Image Upload:** Users can upload images via drag-and-drop or by selecting files through the upload button.
- **Real-time Progress Bar:** Displays the upload and conversion progress to keep users informed.
- **PDF Download:** After successful conversion, users can download their PDF files instantly.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices using Bootstrap 5.
- **Multiple Conversions:** Users can perform multiple image-to-PDF conversions without navigating away from the upload screen.
- **User Authentication:** Secure login and registration system to manage user-specific conversions.
- **Modern UI Elements:** Utilizes Font Awesome icons and sleek Bootstrap components for an enhanced user experience.
- **Smooth Transitions:** Seamless UI transitions and feedback using Bootstrap alerts and toast notifications.

## Technologies Used

- **Backend:**
  - [Flask](https://flask.palletsprojects.com/) - A lightweight WSGI web application framework.
  - [Flask-Login](https://flask-login.readthedocs.io/) - User session management for Flask.
  - [img2pdf](https://github.com/jbarlow83/img2pdf) - Converts images to PDF.
  
- **Frontend:**
  - [Bootstrap 5](https://getbootstrap.com/) - Frontend component library for responsive design.
  - [Font Awesome](https://fontawesome.com/) - Icon toolkit for scalable vector icons.
  
- **Others:**
  - [Python 3.9](https://www.python.org/) - Programming language.
  - [Werkzeug](https://werkzeug.palletsprojects.com/) - WSGI utility library for Python.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ImgToPDF-Converter.git
   cd ImgToPDF-Converter
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   FLASK_APP=run.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key
   UPLOAD_FOLDER=app/uploads
   CONVERTED_FOLDER=app/converted
   ```

   Replace `your_secret_key` with a secure key of your choice.

5. **Initialize the Database**

   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

6. **Run the Application**

   ```bash
   flask run
   ```

   The application will be accessible at `http://127.0.0.1:5000/`.

## Usage

1. **Register an Account**

   - Navigate to the **Register** page.
   - Provide a username, email, and password to create a new account.

2. **Login**

   - Use your registered credentials to log in.

3. **Convert Images to PDF**

   - On the home page, either drag and drop your image files into the upload area or click the **Select Image** button to choose files from your device.
   - Monitor the upload and conversion progress via the progress bar.
   - Once conversion is complete, click the **Download PDF** button to retrieve your PDF file.
   - After downloading, the interface will reset, allowing you to perform additional conversions seamlessly.

## Project Structure

```
ImgToPDF-Converter/
│
├── app/
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── images/
│   ├── templates/
│   │   ├── layout.html
│   │   └── index.html
│   ├── uploads/
│   ├── converted/
│   ├── __init__.py
│   ├── routes.py
│   └── models.py
│
├── migrations/
│
├── venv/
│
├── .env
├── requirements.txt
├── run.py
└── README.md
```

- **app/**: Contains the main application code, including static assets and templates.
- **migrations/**: Database migration files managed by Flask-Migrate.
- **venv/**: Python virtual environment (should be excluded from version control).
- **.env**: Environment variables configuration file.
- **requirements.txt**: Python dependencies.
- **run.py**: Entry point to run the Flask application.
- **README.md**: Project documentation (this file).

## Acknowledgments

This project was developed in just **2 hours** with the assistance of [ChatGPT](https://chat.openai.com/), showcasing the potential of AI-powered tools in accelerating web application development.

Special thanks to:

- [OpenAI](https://openai.com/) for providing the ChatGPT platform.
- The developers and contributors of [Flask](https://flask.palletsprojects.com/), [Bootstrap](https://getbootstrap.com/), and [Font Awesome](https://fontawesome.com/) for their invaluable tools and libraries.

## License

This project is licensed under the [MIT License](LICENSE).

---
```
