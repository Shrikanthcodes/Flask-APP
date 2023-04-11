# Flask-APP
A Flask APP to view Pokemon Database

Pokemon App

This is a Flask-based web application that allows users to view a list of Pokemon and filter by color and type. Users can also register for an account to access additional features.

Installation

1) Clone the repository to your local machine
2) Create a virtual environment with the following command:  python3 -m venv venv
3) Activate the virtual environment: source venv/bin/activate
4) Install the required packages with the following command: pip install -r requirements.txt
5) Create a .env file in the root directory of the project with the following variables: 
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///your_database.db
6) Create the database by running the following command: flask db upgrade
7) Populate the database with Pokemon data by running the following command: python populate.py
8) To run the application, activate the virtual environment and run the following command: flask run
(Run populate.py again after flask run if database errors persist)


The application will be accessible at http://localhost:5000


TypeScript and React Attmpt zip file is incomplete, and will not run properly
