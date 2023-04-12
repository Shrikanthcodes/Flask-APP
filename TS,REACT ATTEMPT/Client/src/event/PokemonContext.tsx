// PokemonContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
  color: string; // Added color property
}

interface PokemonState {
  pokemonList: Pokemon[];
  filteredPokemonList: Pokemon[];
  selectedColor: string;
  setColorFilter: (color: string) => void;
}

const PokemonContext = createContext<PokemonState | undefined>(undefined);

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
    const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        const fetchDetails = async (url: string) => {
          const res = await fetch(url);
          const details = await res.json();
          return {
            name: details.name,
            url,
            color: details.types[0].type.name,
          };
        };

        const fetchedPokemonList: Pokemon[] = await Promise.all(
          data.results.map((result: { url: string }) => fetchDetails(result.url))
        );

        setPokemonList(fetchedPokemonList);
      } catch (error) {
        console.error('Failed to fetch Pokemon data:', error);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filterPokemon = () => {
      if (selectedColor) {
        setFilteredPokemonList(
          pokemonList.filter((pokemon) => pokemon.color === selectedColor)
        );
      } else {
        setFilteredPokemonList(pokemonList);
      }
    };

    filterPokemon();
  }, [selectedColor, pokemonList]);

  const setColorFilter = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <PokemonContext.Provider
      value={{ pokemonList, filteredPokemonList, selectedColor, setColorFilter }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
