"use client";

import { useState } from "react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import valorantLogo from '../assets/val_logo.png'; 

export default function FlipCard({ player, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false); 

  // Handle click to flip the card, but only once
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true); 
      onFlip(); 
    }
  };

  return (
    <div className="w-48 h-72 cursor-pointer" onClick={handleFlip}>
      {!isFlipped ? (
        <Card className="flex items-center justify-center bg-black text-white h-full relative">
          {/* Back of the card (Valorant logo) */}
          <Image src={valorantLogo} alt="Valorant Logo" width={100} height={100} />
        </Card>
      ) : (
        <Card className="bg-yellow-200 text-black h-full relative">
          <CardContent className="flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 w-10 h-10">
              <Image src={player.team_logo} alt="Team Logo" width={40} height={40} />
            </div>

            {/* Player face */}
            <div className="w-16 h-16 mb-2">
              <Image src={player.player_url || 'https://www.vlr.gg/img/base/ph/sil.png'} alt={`${player.playerName}'s face`} width={64} height={64} className="rounded-full" />
            </div>

            {/* Player name and country */}
            <h3 className="text-xl">{player.playerName}</h3>
            <p className="text-sm">{player.country}</p>

            {/* Player stats */}
            <div className="mt-2 text-xs">
              <p><strong>Aim:</strong> {player.stats.aim}</p>
              <p><strong>Game Sense:</strong> {player.stats.game_sense}</p>
              <p><strong>Clutch:</strong> {player.stats.clutch}</p>
              <p><strong>Type:</strong> {player.type.join(', ')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
