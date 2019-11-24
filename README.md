<h1 align="center">Football Data</h1>

<p align="center">
  Express api gateway to access football data
</p>

## Installing

- Clone the repo: `git clone https://github.com/mu545/football-data.git`
- Install [npm](https://www.npmjs.com) first if you don't have it in your machine
- Run the `npm install` command to install dependencies
- Set environment configuration
  - Set `FOOTBALL_API_KEY` with your football-data API key, you can get API key from [football-data.org](https://www.football-data.org)
- Run `npm start` to start your server
- Now you can access your football data api

## API Endpoints version 1

Access endpoints from url `http://hostname/users/api/v1/{endpoint}`

| Endpoint | Description |
|:--|:--|
| /competitions | Shows a list competitions of all leagues. |
| /league/{league-id} | Shows information of the selected competition. |
| /matches/{league-id}/{season-year} | Shows all matches of that competition. |
| /match/{match-id} | Shows information about the selected match. |
| /teams/{league-id}/{season-year} | Shows all teams of that competition. |
| /team/{team-id} | Shows information about a team. |
| /standings/{league-id} | Shows latest tables (total, home, away) for the current season. |
| /scorers/{league-id} | Shows all goal scorers by shot goals descending for the current season. |
| /player/{player-id} | Shows information about a player. |
