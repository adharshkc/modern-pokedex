'use client';

import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import { PokemonListItem, PokemonListResponse } from './types/pokemon';
import { fetchPokemonList } from './lib/api';

const POKEMON_PER_PAGE = 20;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    loadPokemon();
  }, [currentPage]);

  useEffect(() => {
    // Filter pokemon based on search term
    if (searchTerm) {
      const filtered = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemonList);
    }
  }, [searchTerm, pokemonList]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * POKEMON_PER_PAGE;
      const data: PokemonListResponse = await fetchPokemonList(POKEMON_PER_PAGE, offset);
      
      setPokemonList(data.results);
      setTotalCount(data.count);
      setHasNext(data.next !== null);
      setHasPrevious(data.previous !== null);
      setError(null);
    } catch (err) {
      setError('Failed to load Pokémon. Please try again.');
      console.error('Error loading Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchTerm(''); // Clear search when changing pages
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-gray-600">Loading Pokémon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      
      {filteredPokemon.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          {searchTerm ? `No Pokémon found matching "${searchTerm}"` : 'No Pokémon found'}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          
          {/* Only show pagination if not searching */}
          {!searchTerm && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          )}
        </>
      )}
    </div>
  );
}