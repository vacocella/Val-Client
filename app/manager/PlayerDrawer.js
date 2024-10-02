import PlayerCard from './PlayerCard';

export default function PlayerDrawer({
  players,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  onPlayerHover,
  onPlayerHoverEnd,
}) {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 z-50">
      {/* Search and Filter Section */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="w-full p-2 mb-2 text-black rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full p-2 text-black rounded"
        >
          <option value="">All Types</option>
          <option value="igl">IGL</option>
          <option value="dualist">Dualist</option>
          <option value="flex">Flex</option>
          <option value="initiator">Initiator</option>
          <option value="controller">Controller</option>
        </select>
      </div>

      {/* Player List */}
      <div className="overflow-y-auto h-[80vh]">
        {players.length === 0 ? (
          <div className="text-white">No players found.</div>
        ) : (
          players.map((player) => (
            <PlayerCard
              key={player.playerID}
              player={player}
              fromTray={true}
              onHover={() => onPlayerHover(player.type)} 
              onHoverEnd={onPlayerHoverEnd}
            />
          ))
        )}
      </div>
    </div>
  );
}
