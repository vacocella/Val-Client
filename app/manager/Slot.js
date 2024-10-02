import { useDrop } from 'react-dnd';
import { useState } from 'react';
import PlayerCard from './PlayerCard'; // Reuse the PlayerCard component

export default function Slot({
  player,
  index,
  allowedTypes,
  hoveredPlayerType,
  onDrop,
  movePlayerBackToTray,
  slotSize,
}) {
  const [isHovered, setIsHovered] = useState(false); // Track if slot is being hovered

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
    <div
      className="flex flex-col items-center w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)} 
    >
      {/* Display allowed types above the slot */}
      <div className="mb-2 text-gray-700 text-center">
        {allowedTypes.length > 1
          ? `Allowed Types: ${allowedTypes.join(', ')}`
          : `Allowed Type: ${allowedTypes[0]}`}
      </div>

      {/* The slot area where cards are dropped */}
      <div
        ref={drop}
        className={`border-2 flex items-center justify-center transition-all duration-300 ${
          canDrop ? 'border-green-500' : isOver ? 'border-red-500' : 'border-dashed border-gray-500'
        }`}
        style={{
          width: slotSize.width, // Dynamically apply slot size
          height: slotSize.height,
        }}
      >
        {player ? (
          <div className="relative w-full h-full">
            {/* The PlayerCard */}
            <PlayerCard
              player={player}
              fromTray={false}
              slotSize={slotSize} // Pass slot size to PlayerCard
            />

            {isHovered && (
              <button
                onClick={() => movePlayerBackToTray(player)}
                className="absolute top-1 left-1 bg-red-500 text-white text-xs p-1 rounded-full z-20 hover:bg-red-700"
                style={{ width: '20px', height: '20px' }} 
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <div
            className={`text-gray-400 ${
              hoveredPlayerType && !allowedTypes.some((type) => hoveredPlayerType.includes(type)) ? 'text-red-500' : ''
            }`}
          >
            Empty Slot
          </div>
        )}
      </div>
    </div>
  );
}
