// app/api/players/route.js

export async function GET(request) {
  const players = [
    { playerID: 1, playerName: "John", rarity: "rare" },
    { playerID: 2, playerName: "David", rarity: "rare" },
    { playerID: 3, playerName: "Arthur", rarity: "epic" },
    { playerID: 4, playerName: "William", rarity: "legendary" },
    { playerID: 5, playerName: "Chris", rarity: "rare" },
    { playerID: 6, playerName: "Michael", rarity: "epic" },
    { playerID: 7, playerName: "Alexander", rarity: "legendary" },
  ];

  return new Response(JSON.stringify(players), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
