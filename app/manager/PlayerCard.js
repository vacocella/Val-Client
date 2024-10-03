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

  const fallbackImage_player = 'https://www.vlr.gg/img/base/ph/sil.png'; 
  const fallbackImage_team = 'https://www.vlr.gg/img/vlr/tmp/vlr.png'; 

  return (
    <div
      ref={fromTray ? drag : null}
      className={`${isDragging ? 'opacity-50' : 'opacity-100'} relative`}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      style={{
        width: slotSize.width, 
        height: slotSize.height, 
      }}
    >
      <Card className="w-full h-full relative bg-yellow-200 text-black">
        <CardContent className="flex flex-col items-center justify-center h-full">
          
          {/* Team logo placed behind the player face */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Image
              src={player.team_logo || fallbackImage_team}
              alt="Team Logo"
              layout="fill" 
              objectFit="cover" 
              className="rounded-full"
            />
          </div>

          {/* Player face */}
          <div className="relative w-16 h-16 mb-2 z-10">
            <Image
              src={player.player_url || fallbackImage_player}
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
            <p><strong>Type:</strong> {player.type.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
