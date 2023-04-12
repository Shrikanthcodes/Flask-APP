// App.tsx
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import PokemonList from './components/PokemonList';
import ColorSelect from './components/ColorSelect';
import { AuthProvider, useAuth } from './event/AuthContext';
import { PokemonProvider, usePokemon } from './event/PokemonContext';

const AppContent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { filteredPokemonList, selectedColor, setColorFilter } = usePokemon();

  if (!isAuthenticated) {
    return (
      <div>
        <Login onLogin={login} />
        <Register onRegister={(username, email, password) => {}} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ColorSelect
        colors={['Red', 'Blue', 'Green', 'Yellow']} // Example colors, replace with actual colors.
        selectedColor={selectedColor}
        onColorChange={setColorFilter}
      />
      <PokemonList pokemonList={filteredPokemonList} />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <PokemonProvider>
        <div className="app">
          <h1>Pokemon App</h1>
          <AppContent />
        </div>
      </PokemonProvider>
    </AuthProvider>
  );
};

export default App;
