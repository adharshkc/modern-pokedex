'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '../types/pokemon';
import { getPokemonIdFromUrl, getPokemonImageUrl } from '../lib/api';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const imageUrl = getPokemonImageUrl(pokemonId);

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
              }}
            />
          </div>
          <h3 className="text-lg font-semibold capitalize text-gray-800">
            {pokemon.name}
          </h3>
          <span className="text-sm text-gray-500">#{pokemonId.padStart(3, '0')}</span>
        </div>
      </div>
    </Link>
  );
}