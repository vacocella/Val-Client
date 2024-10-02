"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from '../store/playerSlice'; 
import PlayerDrawer from './PlayerDrawer';
import Slot from './Slot'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function ManagerPage() {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.players);
  const [availablePlayers, setAvailablePlayers] = useState([]); 
  const [playerSlots, setPlayerSlots] = useState([null, null, null, null, null]);
  const [hoveredPlayerType, setHoveredPlayerType] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Slot rules: each slot only accepts certain player types
  const slotRules = [
    ['igl'],           // Slot 1 only accepts 'igl'
    ['dualist', 'flex'], // Slot 2 accepts 'dualist' or 'flex'
    ['initiator'],      // Slot 3 only accepts 'initiator'
    ['flex'],           // Slot 4 only accepts 'flex'
    ['controller'],     // Slot 5 only accepts 'controller'
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

  // Handle placing a player in a slot
  const placePlayerInSlot = (player, index) => {
    const newSlots = [...playerSlots];

    if (newSlots[index]) {
      // Add the existing player back to the drawer
      setAvailablePlayers((prev) => [...prev, newSlots[index]]);
    }

    newSlots[index] = player;
    setPlayerSlots(newSlots);

    setAvailablePlayers((prev) => prev.filter((p) => p.playerID !== player.playerID));
  };

  const movePlayerBackToTray = (player, slotIndex) => {
    setAvailablePlayers([...availablePlayers, player]); // Add the player back to the drawer
    const newSlots = playerSlots.map((p, i) => (i === slotIndex ? null : p)); // Remove the player from the slot
    setPlayerSlots(newSlots);
  };

  // Filter players by name and type
  const filteredPlayers = availablePlayers.filter((player) => {
    const matchesName = player.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || player.type.includes(filterType);
    return matchesName && matchesType;
  });

  // Toggle drawer visibility
  const toggleDrawerVisibility = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative flex h-screen w-screen flex-col justify-between">
        {/* Drawer Button */}
        <button
          className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded"
          onClick={toggleDrawerVisibility}
        >
          {isDrawerVisible ? 'Close Drawer' : 'Open Drawer'}
        </button>

        {/* Player Drawer */}
        {isDrawerVisible && (
          <PlayerDrawer
            players={filteredPlayers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            onPlayerHover={(type) => setHoveredPlayerType(type)}
            onPlayerHoverEnd={() => setHoveredPlayerType(null)}
          />
        )}

        {/* Main section showing 5 slots in a 2-1-2 layout */}
        <div className="grid grid-rows-3 gap-8 justify-center flex-grow">
          {/* First row with 2 slots */}
          <div className="grid grid-cols-2 gap-8">
            {playerSlots.slice(0, 2).map((player, index) => (
              <Slot
                key={index}
                player={player}
                index={index}
                allowedTypes={slotRules[index]} // Pass allowed types for this slot
                hoveredPlayerType={hoveredPlayerType} // Pass the currently hovered player's type
                onDrop={(newPlayer) => placePlayerInSlot(newPlayer, index)} // Handle drop into a slot
                movePlayerBackToTray={(player) => movePlayerBackToTray(player, index)} // Move player back to tray
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
            />
          </div>

          {/* Third row with 2 slots */}
          <div className="grid grid-cols-2 gap-8">
            {playerSlots.slice(3, 5).map((player, index) => (
              <Slot
                key={index + 3}
                player={player}
                index={index + 3}
                allowedTypes={slotRules[index + 3]} // Pass allowed types for this slot
                hoveredPlayerType={hoveredPlayerType} // Pass the currently hovered player's type
                onDrop={(newPlayer) => placePlayerInSlot(newPlayer, index + 3)} // Handle drop into a slot
                movePlayerBackToTray={(player) => movePlayerBackToTray(player, index + 3)} // Move player back to tray
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}