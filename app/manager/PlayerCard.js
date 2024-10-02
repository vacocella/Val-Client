import { useDrag } from 'react-dnd';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

export default function PlayerCard({ player, fromTray = false, onRemove, onHover, onHoverEnd }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: { ...player }, 
    canDrag: true, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), 
    }),
  });

  const fallbackImage = 'https://www.vlr.gg/img/base/ph/sil.png'; // Fallback image if player_url is not provided

  return (
    <div
      ref={fromTray ? drag : null} 
      className={`w-48 h-72 ${isDragging ? 'opacity-50' : 'opacity-100'}`} 
      onMouseEnter={onHover} 
      onMouseLeave={onHoverEnd} 
    >
      <Card className="w-full h-full bg-yellow-200 text-black">
        <CardContent className="flex flex-col items-center justify-center">
          {/* Team logo in the top left */}
          <div className="w-10 h-10">
            <Image src={player.team_logo} alt="Team Logo" width={40} height={40} />
          </div>

          {/* Player face */}
          <div className="w-16 h-16 mb-2">
            <Image
              src={player.player_url || fallbackImage}
              alt={`${player.playerName}'s face`}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>

          {/* Player name */}
          <h3 className="text-xl">{player.playerName}</h3>
          <p className="text-sm">{player.country}</p>

          {/* Player stats */}
          <div className="mt-2 text-xs">
            <p><strong>Aim:</strong> {player.stats.aim}</p>
            <p><strong>Game Sense:</strong> {player.stats.game_sense}</p>
            <p><strong>Clutch:</strong> {player.stats.clutch}</p>
            <p><strong>Type:</strong> {player.type.join(', ')}</p> {/* Show the player's types */}
          </div>

          {/* Optional remove button (only shown if the card is not in the tray) */}
          {!fromTray && (
            <button onClick={onRemove} className="mt-4 bg-red-500 text-white p-2 rounded">
              Remove
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
