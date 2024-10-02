"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from '../store/playerSlice'; 
import FlipCard from './FlipCard'; 

export default function MarketPage() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players); 
  const [flippedCards, setFlippedCards] = useState([]);
  const router = useRouter(); 

  // Fetch player data on component mount
  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  // Handle flipping a card
  const handleCardFlip = (index) => {
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = true; 
      return newFlipped;
    });
  };

  const allPlayers = players.slice(0, 5);


  // Check if all cards are flipped
  const allFlipped = allPlayers.length > 0 && flippedCards.length === allPlayers.length && flippedCards.every(Boolean);

  const goToManager = () => {
    router.push('/manager');
  };

  if (players.length === 0) return <div>Loading...</div>; // Loading state

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-500">
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6 w-full text-center text-white">Valorant Night Market</h1>
        {/* Scrollable container for smaller viewports */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 gap-6 w-[1200px]"> {/* 5 cards per row */}
            {allPlayers.map((player, index) => (
              <FlipCard
                key={player.playerID}
                player={player}
                onFlip={() => handleCardFlip(index)} // Pass the flip event handler
              />
            ))}
          </div>
        </div>

        {/* Show the "Next" button if all cards are flipped */}
        {allFlipped && (
          <button
            className="mt-8 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700"
            onClick={goToManager}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
