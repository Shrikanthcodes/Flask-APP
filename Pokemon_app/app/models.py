from app import db, login_manager
import app
from flask_login import UserMixin
import requests
import hashlib

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

    def check_password(self, password):
        return self.password_hash == hashlib.sha256(password.encode('utf-8')).hexdigest()


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    ptype = db.Column(db.String(64), nullable=False)
    color = db.Column(db.String(64), nullable=False)
    url = db.Column(db.String(255), nullable=False)

def fetch_and_store_pokemon_data():
    base_url = "https://pokeapi.co/api/v2/"
    url = base_url + "pokemon?limit=151"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError("Failed to fetch pokemon data")

    pokemon_data = response.json()["results"]

    for data in pokemon_data:
        name = data["name"]
        url = data["url"]
        response = requests.get(url)
        if response.status_code != 200:
            raise ValueError(f"Failed to fetch data for {name}")

        data = response.json()
        height = data["height"]
        weight = data["weight"]
        ptype = data["types"][0]["type"]["name"]
        color_url = data["species"]["url"]
        
        # Make an API call to retrieve the color of the pokemon
        color_response = requests.get(color_url)
        if color_response.status_code != 200:
            raise ValueError(f"Failed to fetch color data for {name}")
        color_data = color_response.json()
        color = color_data["color"]["name"]
        
        pokemon = Pokemon(name=name, height=height, weight=weight, ptype=ptype, color=color, url=url)
        db.session.add(pokemon)
    db.session.commit()