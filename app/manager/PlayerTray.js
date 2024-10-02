import PlayerCard from './PlayerCard'; 

export default function PlayerTray({ availablePlayers, onPlayerHover, onPlayerHoverEnd }) {
  if (availablePlayers.length === 0) {
    return <div>No players available in the tray.</div>;
  }

  return (
    <div className="bg-gray-200 p-4 flex justify-around">
      {availablePlayers.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          fromTray={true}
          onHover={() => onPlayerHover(player.type)} 
          onHoverEnd={onPlayerHoverEnd} 
        />
      ))}
    </div>
  );
}
