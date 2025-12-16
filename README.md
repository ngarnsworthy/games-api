# Haxmas day 4

# API

## Schema

### Game
- name: the name of the game
- description: a description of the game
- started: when development on the game started
- finished: when development on the game finished or unfinished if null

### Time
Time is represented as seconds UTC

## Endpoints
- /api/games
 - GET: returns a list of all games
 - POST: adds a new game with a name (required), a description, and a starting time
- /api/games/:id/finish PATCH: marks a game as finished at the current time
- /api/games/:id/description PATCH: changes a game's description
- /api/games/:id DELETE: deletes a game