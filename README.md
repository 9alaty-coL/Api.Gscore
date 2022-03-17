# Api.GScore

This server provides tournament data and stores users infomation for [GScore](https://github.com/9alaty-coL/gscore) application.</br>
Cause the free API (only 10 request per minute) so I built this server to store data and handle more requests from client.

## Data resource

[<img src="https://www.football-data.org/assets/logo.jpg" width="200px">](https://www.football-data.org/)

RESTful. Reliable. Free to use. Easy to integrate.

## Available resources

| **Resource** | **Action**                                     | **URI**               | **Filters**                       |
|--------------|------------------------------------------------|-----------------------|-----------------------------------|
| Standings    | Show Standings for a particular competition.   | /standings/{leagueId} | season={YEAR}                     |
| Matches      | List all matches for a particular competition. | /matches/{leagueId}   | season={YEAR}</br>matchday={MATCHDAY} |
| Top scorers  | List all scorers for a particular competition. | /scorer/{leagueId}    | season={YEAR}                     |