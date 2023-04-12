import requests
import sqlite3

conn = sqlite3.connect('your_database.db')
cursor = conn.cursor()

def fetch_and_store_pokemon_data():
    url = "https://pokeapi.co/api/v2/pokemon/"

    for i in range(1, 152):
        response = requests.get(url + str(i))
        print(response)
        if response.status_code == 200:
            data = response.json()

            name = data['name']
            height = data['height']
            weight = data['weight']
            ptype = data['types'][0]['type']['name']
            color_response = requests.get(data['species']['url'])
            if color_response.status_code == 200:
                color_data = color_response.json()
                color = color_data['color']['name']
            else:
                color = 'unknown'
            url = data['sprites']['front_default']

            
            
            cursor.execute("INSERT INTO pokemon (name, height, weight, ptype, color, url) VALUES (?, ?, ?, ?, ?, ?)",
                            (name, height, weight, ptype, color, url))
        url = "https://pokeapi.co/api/v2/pokemon/"
    conn.commit()
            

    print('Pokemon data fetching and storage completed successfully.')
fetch_and_store_pokemon_data()
conn.close()