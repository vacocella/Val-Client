import { useDrop } from 'react-dnd';
import PlayerCard from './PlayerCard'; // Reuse the PlayerCard component

export default function Slot({ player, index, allowedTypes, hoveredPlayerType, onDrop, movePlayerBackToTray }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'player',
    canDrop: (droppedPlayer) => {
      // Check if any of the player's types match the allowed types for this slot
      return droppedPlayer.type.some((playerType) => allowedTypes.includes(playerType));
    },
    drop: (droppedPlayer) => {
      // Only drop the player if at least one type is valid for the slot
      if (droppedPlayer.type.some((playerType) => allowedTypes.includes(playerType))) {
        onDrop(droppedPlayer); // Place the player in the slot if valid
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className="flex flex-col items-center">
      {/* Display allowed types above the slot */}
      <div className="mb-2 text-gray-700 text-center">
        {allowedTypes.length > 1
          ? `Allowed Types: ${allowedTypes.join(', ')}`
          : `Allowed Type: ${allowedTypes[0]}`}
      </div>

      {/* The slot area where cards are dropped */}
      <div
        ref={drop}
        className={`w-48 h-72 border-2 flex items-center justify-center ${
          canDrop ? 'border-green-500' : isOver ? 'border-red-500' : 'border-dashed border-gray-500'
        }`}
      >
        {player ? (
          <PlayerCard player={player} fromTray={false} onRemove={() => movePlayerBackToTray(player)} />
        ) : (
          <div className={`text-gray-400 ${hoveredPlayerType && !allowedTypes.some((type) => hoveredPlayerType.includes(type)) ? 'text-red-500' : ''}`}>
            {/* {hoveredPlayerType && !allowedTypes.some((type) => hoveredPlayerType.includes(type)) ? 'Not Valid' : 'Empty Slot'} */}
            Empty Slot
          </div>
        )}
      </div>
    </div>
  );
}
