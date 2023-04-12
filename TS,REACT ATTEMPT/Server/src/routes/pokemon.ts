import { Router } from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const router = Router();

router.get('/', async (_req, res) => {
  const pokemonDb = await open({
    filename: './src/database/pokemon.db',
    driver: sqlite3.Database,
  });

  const pokemonList = await pokemonDb.all('SELECT * FROM pokemon');
  res.status(200).json(pokemonList);
});

export default router;
