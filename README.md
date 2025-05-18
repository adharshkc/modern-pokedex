# Modern Pokedex

A modern, responsive Pokedex application built with Next.js, TypeScript, and Tailwind CSS. This application fetches data from the PokéAPI to display detailed information about Pokémon.

## Features

- **Pokémon List**: Browse through a paginated list of Pokémon with search functionality
- **Search**: Filter Pokémon by name in real-time
- **Pagination**: Navigate through different pages of Pokémon
- **Detailed View**: Click on any Pokémon to view detailed information including:
  - High-quality sprites and artwork
  - Types with color-coded badges
  - Physical stats (height, weight)
  - Abilities (including hidden abilities)
  - Base stats with visual progress bars
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adharshkc/modern-pokedex.git
cd modern-pokedex
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Technologies Used

- **Next.js 14**: React framework for production
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PokéAPI**: RESTful API for Pokémon data
- **React Hooks**: For state management and side effects

## API Integration

This application uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data. The main endpoints used are:

- `/pokemon` - List of Pokémon with pagination
- `/pokemon/{id or name}` - Detailed Pokémon information

## Performance Optimizations

- **Image Optimization**: Using Next.js Image component for optimized loading
- **TypeScript**: Compile-time type checking for fewer runtime errors
- **Efficient State Management**: Using React hooks for optimal re-renders
- **Responsive Design**: Optimized for various screen sizes

## Future Enhancements

- Add Pokémon evolution chains
- Implement advanced filtering (by type, generation, etc.)
- Add Pokémon comparison feature
- Include Pokémon moves and locations
- Add favorites/bookmarking functionality
- Implement offline support with service workers

## License

This project is open source and available under the [MIT License](LICENSE).