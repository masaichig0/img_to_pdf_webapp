from app import create_app

app = create_app()
#app.secret_key = os.environ.get("SECRET_KEY")

if __name__ == "__main__":
    app.run(debug=True)
