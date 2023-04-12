// Define a Mongoose schema for Pokemon
//Did not create mongoDB instance (ERROR)

import mongoose, { Schema } from 'mongoose';

export interface IPokemon extends mongoose.Document {
  id: number;
  name: string;
  height: number;
  weight: number;
  type: string;
  color: string;
  url: string;
}

const PokemonSchema: Schema = new Schema({
  id: { type: Number, unique: true },
  name: String,
  height: Number,
  weight: Number,
  type: String,
  color: String,
  url: String,
});

// Define a Mongoose model for Pokemon
export const Pokemon = mongoose.model<IPokemon>('Pokemon', PokemonSchema);
