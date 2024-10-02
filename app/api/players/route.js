// app/api/players/route.js

export async function GET(request) {
  const players = [
    {
      playerID: 1,
      playerName: 'John Doe',
      country: 'USA',
      // team_logo: 'https://example.com/team1.png',
      // player_url: 'https://example.com/player1.png',
      type: ['dualist', 'flex'],
      stats: {
        aim: 85,
        game_sense: 80,
        clutch: 75,
      },
    },
    {
      playerID: 2,
      playerName: 'Jane Smith',
      country: 'UK',
      // team_logo: 'https://example.com/team2.png',
      // player_url: 'https://example.com/player2.png',
      type: ['initiator'],
      stats: {
        aim: 90,
        game_sense: 85,
        clutch: 80,
      },
    },
    {
      playerID: 3,
      playerName: 'Bill Johnson',
      country: 'Canada',
      // team_logo: 'https://example.com/team3.png',
      // player_url: 'https://example.com/player3.png',
      type: ['igl', 'flex'],
      stats: {
        aim: 80,
        game_sense: 88,
        clutch: 82,
      },
    },
    {
      playerID: 4,
      playerName: 'Alice Brown',
      country: 'Germany',
      // team_logo: 'https://example.com/team4.png',
      // player_url: 'https://example.com/player4.png',
      type: ['dualist'],
      stats: {
        aim: 92,
        game_sense: 86,
        clutch: 78,
      },
    },
    {
      playerID: 5,
      playerName: 'Chris Green',
      country: 'Australia',
      // team_logo: 'https://example.com/team5.png',
      // player_url: 'https://example.com/player5.png',
      type: ['flex', 'igl'],
      stats: {
        aim: 88,
        game_sense: 90,
        clutch: 85,
      },
    },
    {
      playerID: 6,
      playerName: 'Samantha Lee',
      country: 'South Korea',
      // team_logo: 'https://example.com/team6.png',
      // player_url: 'https://example.com/player6.png',
      type: ['initiator'],
      stats: {
        aim: 89,
        game_sense: 83,
        clutch: 88,
      },
    },
  ];

  return new Response(JSON.stringify(players), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
