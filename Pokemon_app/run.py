from app import app, db
from app.models import User, Pokemon
from app.models import fetch_and_store_pokemon_data
from flask_login import current_user, logout_user

#Logout on exit
@app.teardown_request
def logout_on_exit(exc=None):
    if current_user.is_authenticated:
        logout_user()

if __name__ == '__main__':
    #Populate sqlite db
    fetch_and_store_pokemon_data()
    #run app
    app.run(debug=True)
    
