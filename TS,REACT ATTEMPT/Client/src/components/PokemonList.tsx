import React from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList = ({ pokemonList }: PokemonListProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {pokemonList.map((pokemon) => (
                <tr key={pokemon.name}>
                    <td>{pokemon.name}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PokemonList;