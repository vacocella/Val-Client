import PlayerCard from './PlayerCard'; 

export default function PlayerDrawer({
    players,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    onPlayerHover,
    onPlayerHoverEnd,
    slotSize,
  }) {
    return (
      <div
        className="absolute top-0 left-0 h-full w-64 bg-gray-200 p-4 shadow-lg overflow-y-auto transition-transform duration-300"
        style={{ transform: 'translateX(0)' }} // Make sure it's visible
      >
        {/* Search and Filter Inputs */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search players..."
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          >
            <option value="">Filter by Type</option>
            <option value="igl">IGL</option>
            <option value="dualist">Dualist</option>
            <option value="flex">Flex</option>
            <option value="initiator">Initiator</option>
            <option value="controller">Controller</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
          >
            <option value="">Sort by</option>
            <option value="aim">Aim</option>
            <option value="game_sense">Game Sense</option>
            <option value="clutch">Clutch</option>
          </select>
        </div>
  
        {/* Display Players */}
        <div className="grid gap-4">
          {players.map((player) => (
            <PlayerCard
              key={player.playerID}
              player={player}
              fromTray={true}
              onHover={() => onPlayerHover(player.type)}
              onHoverEnd={onPlayerHoverEnd}
              slotSize={slotSize} // Pass the dynamic slot size to PlayerCard
            />
          ))}
        </div>
      </div>
    );
  }
  