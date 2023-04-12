import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const userDb = await open({
    filename: './src/database/user.db',
    driver: sqlite3.Database,
  });

  const existingUser = await userDb.get('SELECT * FROM users WHERE username = ?', username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userDb.run('INSERT INTO users (username, hashedPassword) VALUES (?, ?)', [username, hashedPassword]);

  res.status(201).json({ message: 'User registered successfully.' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const userDb = await open({
    filename: './src/database/user.db',
    driver: sqlite3.Database,
  });

  const user = await userDb.get('SELECT * FROM users WHERE username = ?', username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful.', token });
});

export default router;
