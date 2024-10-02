import { useDrag } from 'react-dnd';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

export default function PlayerCard({
  player,
  fromTray = false,
  onHover,
  onHoverEnd,
  slotSize,
}) {
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
      className={`${isDragging ? 'opacity-50' : 'opacity-100'} relative`}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      style={{
        width: slotSize.width, // Apply the dynamic width
        height: slotSize.height, // Apply the dynamic height
      }}
    >
      <Card className="w-full h-full relative bg-yellow-200 text-black">
        <CardContent className="flex flex-col items-center justify-center h-full">
          
          {/* Team logo placed behind the player face */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Image
              src={player.team_logo}
              alt="Team Logo"
              layout="fill" // Make the logo fill the background
              objectFit="cover" // Ensure it covers the area
              className="rounded-full" // Optional: Adds a rounded effect
            />
          </div>

          {/* Player face */}
          <div className="relative w-16 h-16 mb-2 z-10">
            <Image
              src={player.player_url || fallbackImage}
              alt={`${player.playerName}'s face`}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>

          {/* Player name */}
          <h3 className="text-xl z-10">{player.playerName}</h3>
          <p className="text-sm z-10">{player.country}</p>

          {/* Player stats */}
          <div className="mt-2 text-xs z-10">
            <p><strong>Aim:</strong> {player.stats.aim}</p>
            <p><strong>Game Sense:</strong> {player.stats.game_sense}</p>
            <p><strong>Clutch:</strong> {player.stats.clutch}</p>
            <p><strong>Type:</strong> {player.type.join(', ')}</p> {/* Show the player's types */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
