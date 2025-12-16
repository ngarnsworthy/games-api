export default function Page() {
  return (
    <>
      <h1 id="haxmas-day-4">Haxmas day 4</h1>
      <h1 id="api">API</h1>
      <h2 id="schema">Schema</h2>
      <h3 id="game">Game</h3>
      <ul>
        <li>name: the name of the game</li>
        <li>description: a description of the game</li>
        <li>started: when development on the game started</li>
        <li>
          finished: when development on the game finished or unfinished if null
        </li>
      </ul>
      <h3 id="time">Time</h3>
      <p>Time is represented as seconds UTC</p>
      <h2 id="endpoints">Endpoints</h2>
      <ul>
        <li>
          /api/games
          <ul>
            <li>GET: returns a list of all games</li>
            <li>
              POST: adds a new game with a name (required), a description, and a
              starting time
            </li>
          </ul>
        </li>
        <li>
          /api/games/:id/finish PATCH: marks a game as finished at the current
          time
        </li>
        <li>
          /api/games/:id/description PATCH: changes a game&#39;s description
        </li>
        <li>/api/games/:id DELETE: deletes a game</li>
      </ul>
    </>
  );
}
