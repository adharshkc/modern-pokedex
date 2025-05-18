'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/app/types/pokemon';
import { fetchPokemonByName } from '@/app/lib/api'; 
import TypeBadge from '@/app/components/TypeBadge';
import StatBar from '@/app/components/StatBar';

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const pokemonName = params.name as string;
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonName) {
      loadPokemonDetail();
    }
  }, [pokemonName]);

  const loadPokemonDetail = async () => {
    try {
      setLoading(true);
      const data = await fetchPokemonByName(pokemonName);
      setPokemon(data);
      setError(null);
    } catch (err) {
      setError('Failed to load Pokémon details. Please try again.');
      console.error('Error loading Pokemon detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-xl text-gray-600">Loading Pokémon details...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex flex-col justify-center items-center min-h-96">
        <div className="text-xl text-red-600 mb-4">{error || 'Pokémon not found'}</div>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Pokédex
        </Link>
      </div>
    );
  }

  const mainImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        ← Back to Pokédex
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image and Basic Info */}
            <div className="text-center">
              <div className="w-80 h-80 mx-auto relative mb-6">
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              <h1 className="text-4xl font-bold capitalize text-gray-800 mb-2">
                {pokemon.name}
              </h1>
              <p className="text-gray-600 text-lg">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Types */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type.slot} type={type.type.name} />
                  ))}
                </div>
              </div>

              {/* Physical Characteristics */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Physical Characteristics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Height</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {(pokemon.height / 10).toFixed(1)} m
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Weight</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </div>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Abilities</h2>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability) => (
                    <div
                      key={ability.slot}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="font-medium capitalize">
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                      {ability.is_hidden && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Base Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Base Stats</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  label={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}