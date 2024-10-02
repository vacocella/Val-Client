"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image';
import { fetchPlayers } from '../store/playerSlice'; 
import val_img from '../assets/val_logo.png'
export default function MarketPage() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const [flipped, setFlipped] = useState([false, false, false, false, false]);

  // Fetch player data on component mount
  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  // Prevent card from flipping back once flipped
  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((flip, i) => (i === index && !flip ? true : flip)));
  };

  if (players.length === 0) return <div>Loading...</div>; // Loading state

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Valorant Night Market</h1>
      <div className="flex space-x-6">
        {players.slice(0, 5).map((player, index) => (
          <div
            key={player.playerID}
            className={`relative w-40 h-60 border-4 border-red-500 rounded-lg cursor-pointer transition-transform duration-500 transform card-container hover:shadow-2xl ${getRarityShadow(
              player.rarity
            )} ${flipped[index] ? "flip-card" : ""}`}
            onClick={() => handleFlip(index)}
          >
            {/* Front of the card with Valorant logo */}
            <div className="absolute w-full h-full bg-black flex items-center justify-center rounded-lg backface-hidden card-front">
              <Image src={val_img} alt="Valorant Logo" width={100} height={100} />
            </div>

            {/* Back of the card with player name */}
            <div
              className={`absolute w-full h-full text-black flex items-center justify-center rounded-lg backface-hidden card-back ${getRarityBackground(
                player.rarity
              )}`}
            >
              <h3 className="text-xl">{player.playerName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Function to get background color for the back based on rarity
function getRarityBackground(rarity) {
  switch (rarity) {
    case "rare":
      return "bg-cyan-500"; // Cyan for rare
    case "epic":
      return "bg-purple-600"; // Purple for epic
    case "legendary":
      return "bg-yellow-400"; // Gold for legendary
    default:
      return "bg-gray-300";
  }
}

// Function to get shadow color based on rarity
function getRarityShadow(rarity) {
  switch (rarity) {
    case "rare":
      return "hover:shadow-cyan-500"; // Light Cyan glow for rare
    case "epic":
      return "hover:shadow-purple-600"; // Light Purple glow for epic
    case "legendary":
      return "hover:shadow-yellow-400"; // Light Yellow glow for legendary
    default:
      return "hover:shadow-gray-300";
  }
}
