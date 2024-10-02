"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from '../store/playerSlice'; 
import PlayerDrawer from './PlayerDrawer';
import Chatbot from './Chatbot';
import Slot from './Slot'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function ManagerPage() {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.players); 
  const [availablePlayers, setAvailablePlayers] = useState([]); 
  const [playerSlots, setPlayerSlots] = useState([null, null, null, null, null]);
  const [hoveredPlayerType, setHoveredPlayerType] = useState(null); 
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); 
  const [isChatVisible, setIsChatVisible] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterType, setFilterType] = useState(''); 
  const [sortBy, setSortBy] = useState(''); 
  const [slotSize, setSlotSize] = useState({ width: 0, height: 0 });

  // Slot rules: each slot only accepts certain player types
  const slotRules = [
    ['igl'],          
    ['dualist', 'flex'],
    ['initiator'],    
    ['flex'],         
    ['controller'],   
  ];

  // Fetch players on component mount and populate the drawer
  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (players.length > 0) {
      setAvailablePlayers(players); 
    }
  }, [players]);

  // Calculate the slot size dynamically based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Dynamically calculate the slot size
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const width = Math.min(screenWidth / 5, 200);
      const height = Math.min(screenHeight / 3, 250);
      setSlotSize({ width, height });
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  // Handle placing a player in a slot
  const placePlayerInSlot = (player, index) => {
    const newSlots = [...playerSlots];

    // If the target slot is occupied, move the existing player back to the drawer
    if (newSlots[index]) {
      setAvailablePlayers((prev) => [...prev, newSlots[index]]);
    }

    // Place the new player in the target slot
    newSlots[index] = player;
    setPlayerSlots(newSlots);

    // Remove the new player from the drawer
    setAvailablePlayers((prev) => prev.filter((p) => p.playerID !== player.playerID));
  };

  // Handle moving a player back to the drawer from a slot
  const movePlayerBackToTray = (player, slotIndex) => {
    setAvailablePlayers([...availablePlayers, player]); // Add the player back to the drawer
    const newSlots = playerSlots.map((p, i) => (i === slotIndex ? null : p)); // Remove the player from the slot
    setPlayerSlots(newSlots);
  };

  // Filter and sort players by name, type, and selected stat
  const filteredPlayers = availablePlayers.filter((player) => {
    const matchesName = player.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || player.type.includes(filterType);
    return matchesName && matchesType;
  });

   // Toggle drawer visibility
   const toggleDrawerVisibility = () => {
    setIsDrawerVisible(!isDrawerVisible); 
    setIsChatVisible(false); 
  };

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    setIsDrawerVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative flex h-screen w-screen flex-col justify-between">
       {/* Drawer and Chat Buttons */}
       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4 z-50">
          <button
            className="p-2 bg-blue-500 text-white rounded transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
            onClick={toggleDrawerVisibility} 
          >
            {isDrawerVisible ? 'Close Drawer' : 'Open Drawer'}
          </button>

          <button
            className="p-2 bg-green-500 text-white rounded transition-transform duration-300 hover:scale-110 hover:bg-green-700"
            onClick={toggleChatVisibility} 
          >
            {isChatVisible ? 'Close Chat' : 'Open Chat'}
          </button>
        </div>

        {/* Player Drawer */}
        {isDrawerVisible && (
          <div
            className={`absolute top-0 left-0 h-full w-64 bg-gray-200 p-4 shadow-lg z-50 overflow-y-auto transition-transform duration-300`}
          >
            <PlayerDrawer
              players={filteredPlayers}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onPlayerHover={(type) => setHoveredPlayerType(type)} // Set hovered player's type
              onPlayerHoverEnd={() => setHoveredPlayerType(null)} // Clear hover when player is not hovered
              slotSize={slotSize} // Pass slot size to PlayerDrawer
            />
          </div>
        )}

        {/* Chatbot */}
        {isChatVisible && (
          <div
            className={`absolute top-0 right-0 h-full w-100 bg-gray-200 p-4 shadow-lg z-50 overflow-y-auto transition-transform duration-300`}
          >
            <Chatbot />
          </div>
        )}

        {/* Main section showing 5 slots in a 2-1-2 layout */}
        <div className="grid grid-rows-[1fr_auto_1fr] gap-4 h-full max-h-full p-4">
          {/* First row with 2 slots */}
          <div className="grid grid-cols-2 gap-4">
            {playerSlots.slice(0, 2).map((player, index) => (
              <Slot
                key={index}
                player={player}
                index={index}
                allowedTypes={slotRules[index]} // Pass allowed types for this slot
                hoveredPlayerType={hoveredPlayerType} // Pass the currently hovered player's type
                onDrop={(newPlayer) => placePlayerInSlot(newPlayer, index)} // Handle drop into a slot
                movePlayerBackToTray={(player) => movePlayerBackToTray(player, index)} // Move player back to tray
                slotSize={slotSize} // Pass slot size to Slot
              />
            ))}
          </div>

          {/* Second row with 1 slot */}
          <div className="grid grid-cols-1 justify-center">
            <Slot
              key={2}
              player={playerSlots[2]}
              index={2}
              allowedTypes={slotRules[2]} // Pass allowed types for this slot
              hoveredPlayerType={hoveredPlayerType} // Pass the currently hovered player's type
              onDrop={(newPlayer) => placePlayerInSlot(newPlayer, 2)} // Handle drop into a slot
              movePlayerBackToTray={(player) => movePlayerBackToTray(player, 2)} // Move player back to tray
              slotSize={slotSize} // Pass slot size to Slot
            />
          </div>

          {/* Third row with 2 slots */}
          <div className="grid grid-cols-2 gap-4">
            {playerSlots.slice(3, 5).map((player, index) => (
              <Slot
                key={index + 3}
                player={player}
                index={index + 3}
                allowedTypes={slotRules[index + 3]} // Pass allowed types for this slot
                hoveredPlayerType={hoveredPlayerType} // Pass the currently hovered player's type
                onDrop={(newPlayer) => placePlayerInSlot(newPlayer, index + 3)} // Handle drop into a slot
                movePlayerBackToTray={(player) => movePlayerBackToTray(player, index + 3)} // Move player back to tray
                slotSize={slotSize} // Pass slot size to Slot
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
