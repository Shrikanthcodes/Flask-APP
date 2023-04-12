import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { User } from './models/User';
import { Pokemon } from './models/Pokemon';

export async function connectToDatabase() {
  const url = process.env.MONGO_URL || 'mongodb://localhost/pokemon-app';
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export async function initUsers() {
  await User.init();
}

export async function initPokemon() {
  await Pokemon.init();
}

export async function populatePokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  const pokemonList = data.results;

  for (const pokemon of pokemonList) {
    const res = await fetch(pokemon.url);
    const pokemonData = await res.json();
    const { id, name, height, weight, types, sprites } = pokemonData;
    const color = sprites.front_default.substring(31, 34);

    const type = types.map((t: any) => t.type.name).join(', ');

    const pokemonDocument = new Pokemon({
      id,
      name,
      height,
      weight,
      type,
      color,
    });

    await pokemonDocument.save();
  }
}

export async function createSampleAdminUser() {
  const adminUsername = 'admin';
  const adminPassword = 'password'; // You should use a strong password in a real application

  // Check if the admin user already exists
  const existingAdmin = await User.findOne({ username: adminUsername });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  // Hash the admin password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Insert the admin user into the users collection
  const adminUser = new User({
    username: adminUsername,
    hashedPassword,
  });

  await adminUser.save();

  console.log('Admin user created.');
}
