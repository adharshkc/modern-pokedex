'use client';

interface TypeBadgeProps {
  type: string;
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function TypeBadge({ type }: TypeBadgeProps) {
  const colorClass = typeColors[type] || 'bg-gray-400';
  
  return (
    <span className={`${colorClass} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
      {type}
    </span>
  );
}