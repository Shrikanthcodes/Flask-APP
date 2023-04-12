import express, { Request, Response } from 'express';
import { User } from '../database/models/User';
import { Pokemon } from '../database/models/Pokemon';

const router = express.Router();

// Get a list of generation 1 Pokemon
router.get('/pokemon', async (req: Request, res: Response) => {
  try {
    // Check if the user is logged in
    if (!req.session?.user) {
      res.status(401).send('You must be logged in to view this page.');
      return;
    }

    // Get the color query parameter, if any
    const color = req.query.color as string | undefined;

    // Build the query
    const query: any = { id: { $lte: 151 } };
    if (color) {
      query.color = color;
    }

    // Query the database for matching Pokemon
    const pokemon = await Pokemon.find(query);

    // Render the Pokemon list view
    res.render('pokemon', { pokemon });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Authenticate a user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      res.status(401).send('Invalid username or password.');
      return;
    }

    // Check if the password is correct
    if (!(await user.checkPassword(password))) {
      res.status(401).send('Invalid username or password.');
      return;
    }

    // Store the user in the session
    req.session!.user = user;

    // Redirect to the home page
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Log out the user
router.get('/logout', (req: Request, res: Response) => {
  // Destroy the session
  req.session?.destroy(() => {
    // Redirect to the home page
    res.redirect('/');
  });
});

export default router;
