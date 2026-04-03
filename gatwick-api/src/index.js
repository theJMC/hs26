const DEFAULT_NUM_PER_BOARDING_GROUP = 5;
const GROUPS = ["A", "B", "C", "D", "E"];

const state = {
  allPlayers: {},
  unassignedPlayers: [
    {
      name: "Player1",
      score: 0,
      skin: "bus",
      boarding_group: "E",
    },
  ],
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    ...init,
  });
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getNumPerBoardingGroup(env) {
  const parsed = Number.parseInt(env.NUM_PER_BOARDING_GROUP ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_NUM_PER_BOARDING_GROUP;
}

function refreshBoardingGroups(gateId, env) {
  if (!state.allPlayers[gateId]) {
    state.allPlayers[gateId] = [];
    return;
  }

  state.allPlayers[gateId].sort((a, b) => b.score - a.score);
  const numPerBoardingGroup = getNumPerBoardingGroup(env);

  state.allPlayers[gateId].forEach((player, index) => {
    let groupIndex = Math.floor(index / numPerBoardingGroup);
    if (groupIndex >= GROUPS.length) {
      groupIndex = GROUPS.length - 1;
    }

    player.boarding_group = GROUPS[groupIndex];
  });
}

function renderAdminPage() {
  const gates = Object.keys(state.allPlayers);

  const gateRows = gates
    .map(
      (gate) => `
            <tr id="gate-row-${escapeHtml(gate)}">
                <td>${escapeHtml(gate)}</td>
                <td>
                    <a href="/gate/${encodeURIComponent(gate)}" style="margin-right: 10px;">View Players</a>
                    <button class="delete-btn" onclick="confirmDelete('${escapeHtml(gate)}')">
                        Delete
                    </button>
                </td>
            </tr>`
    )
    .join("\n");

  const playerRows = state.unassignedPlayers
    .map(
      (player) => `
            <tr id="player-row-${escapeHtml(player.name)}">
                <td>${escapeHtml(player.name)}</td>
                <td>${escapeHtml(player.score)}</td>
                <td>${escapeHtml(player.skin)}</td>
                <td>
                    <button class="delete-btn" onclick="confirmDeletePlayer('${escapeHtml(player.name)}')">
                        Delete
                    </button>
                </td>
            </tr>`
    )
    .join("\n");

  const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Airport Gate Control</title>
    <style>
        body { font-family: sans-serif; margin: 40px; background-color: #f9f9f9; }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #007bff; color: white; }
        .delete-btn {
            background-color: #dc3545; color: white; border: none;
            padding: 8px 12px; cursor: pointer; border-radius: 4px;
        }
        .delete-btn:hover { background-color: #a71d2a; }
    </style>
</head>
<body>

    <h2>Active Airport Gates</h2>

    <table>
        <thead>
            <tr>
                <th>Gate ID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
${gateRows}
        </tbody>
    </table>

    <h2>Unassigned Players</h2>

    <table>
        <thead>
            <tr>
                <th>Player Name</th>
                <th>Score</th>
                <th>Skin</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
${playerRows}
        </tbody>
    </table>

    <script>
        async function confirmDelete(gateId) {
            if (!confirm("Are you sure you want to decommission this gate?")) return;

            try {
          const response = await fetch('/' + gateId + '/delete', {
                    method: 'DELETE'
                });

                if (response.ok) {
            const row = document.getElementById('gate-row-' + gateId);
                    row?.remove();
                } else {
                    alert("Failed to delete gate.");
                }
            } catch (error) {
                console.error(error);
                alert("Error deleting gate.");
            }
        }

        async function confirmDeletePlayer(playerName) {
            if (!confirm("Are you sure you want to remove this unassigned player?")) return;

            try {
              const response = await fetch('/unassigned_players/' + encodeURIComponent(playerName) + '/delete', {
                    method: 'DELETE'
                });

                if (response.ok) {
                const row = document.getElementById('player-row-' + playerName);
                    row?.remove();
                } else {
                    alert("Failed to delete player.");
                }
            } catch (error) {
                console.error(error);
                alert("Error deleting player.");
            }
        }
    </script>
</body>
</html>`;

  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function renderGatePage(gateId) {
  const gatePlayers = state.allPlayers[gateId] ?? [];

  const playerRows = gatePlayers.length
    ? gatePlayers
        .map(
          (player) => `
                <tr>
                    <td>${escapeHtml(player.name)}</td>
                    <td>${escapeHtml(player.score)}</td>
                </tr>`
        )
        .join("\n")
    : `
                <tr>
                    <td colspan="2" style="text-align: center; color: #888;">No players currently connected.</td>
                </tr>`;

  const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Players - Gate ${escapeHtml(gateId)}</title>
    <style>
        body { font-family: sans-serif; margin: 40px; background-color: #f4f7f6; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background-color: #28a745; color: white; }
        .back-link { display: inline-block; margin-bottom: 20px; text-decoration: none; color: #007bff; }
    </style>
</head>
<body>

    <div class="container">
        <a href="/" class="back-link">&larr; Back to Gates</a>

        <h1>Gate ${escapeHtml(gateId)} Players</h1>

        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
${playerRows}
            </tbody>
        </table>
    </div>

</body>
</html>`;

  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function getStringParam(url, key, fallback) {
  const value = url.searchParams.get(key);
  if (!value) {
    return fallback;
  }
  return value;
}

function getIntParam(url, key, fallback) {
  const raw = url.searchParams.get(key);
  const parsed = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return parsed;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (method === "GET" && url.pathname === "/") {
      return renderAdminPage();
    }

    const gatePageMatch = url.pathname.match(/^\/gate\/([^/]+)$/);
    if (method === "GET" && gatePageMatch) {
      const gateId = decodeURIComponent(gatePageMatch[1]);
      return renderGatePage(gateId);
    }

    if (method === "GET" && url.pathname === "/new_player") {
      const name = getStringParam(url, "name", "Player");
      const score = getIntParam(url, "score", 0);
      const skin = getStringParam(url, "skin", "bus");

      state.unassignedPlayers.push({
        name,
        score,
        skin,
        boarding_group: "E",
      });

      return json({ message: `Player ${name} added successfully.` });
    }

    if (method === "GET" && url.pathname === "/update_player_skin") {
      const name = getStringParam(url, "name", "Player");
      const skin = getStringParam(url, "skin", "bus");

      const player = state.unassignedPlayers.find((candidate) => candidate.name === name);
      if (!player) {
        return json({ message: `Player ${name} not found.` }, { status: 404 });
      }

      player.skin = skin;
      return json({ message: `Player ${name} updated successfully.` });
    }

    const newPlayerMatch = url.pathname.match(/^\/([^/]+)\/new_player$/);
    if (method === "GET" && newPlayerMatch) {
      const gateId = decodeURIComponent(newPlayerMatch[1]);
      const name = getStringParam(url, "name", "Player");
      const score = getIntParam(url, "score", 0);
      const skin = getStringParam(url, "skin", "bus");

      if (!state.allPlayers[gateId]) {
        state.allPlayers[gateId] = [];
      }

      const unassignedIndex = state.unassignedPlayers.findIndex((player) => player.name === name);
      if (unassignedIndex !== -1) {
        const player = state.unassignedPlayers[unassignedIndex];
        player.score = score;
        player.skin = skin;
        state.allPlayers[gateId].push(player);
        state.unassignedPlayers.splice(unassignedIndex, 1);
        return json({ message: `Player ${name} added successfully.` });
      }

      state.allPlayers[gateId].push({
        name,
        score,
        skin,
      });
      return json({ message: `Player ${name} added successfully.` });
    }

    const deleteGateMatch = url.pathname.match(/^\/([^/]+)\/delete$/);
    if (method === "DELETE" && deleteGateMatch) {
      const gateId = decodeURIComponent(deleteGateMatch[1]);
      if (state.allPlayers[gateId]) {
        delete state.allPlayers[gateId];
      }

      return json({ message: `Gate ${gateId} deleted successfully.` });
    }

    const deletePlayerMatch = url.pathname.match(/^\/unassigned_players\/([^/]+)\/delete$/);
    if (method === "DELETE" && deletePlayerMatch) {
      const playerName = decodeURIComponent(deletePlayerMatch[1]);
      const index = state.unassignedPlayers.findIndex((player) => player.name === playerName);
      if (index === -1) {
        return json({ message: `Player ${playerName} not found.` }, { status: 404 });
      }

      state.unassignedPlayers.splice(index, 1);
      return json({ message: `Player ${playerName} deleted successfully.` });
    }

    const dataMatch = url.pathname.match(/^\/([^/]+)\/data$/);
    if (method === "GET" && dataMatch) {
      const gateId = decodeURIComponent(dataMatch[1]);
      const name = getStringParam(url, "name", "Player");
      const score = getIntParam(url, "score", 0);
      const skin = getStringParam(url, "skin", "bus");

      refreshBoardingGroups(gateId, env);

      const player = state.allPlayers[gateId].find((candidate) => candidate.name === name);
      if (!player) {
        return json({ error: "Player not found" }, { status: 404 });
      }

      player.score = score;
      player.skin = skin;

      return json({
        boarding_group: player.boarding_group,
        players: state.allPlayers[gateId],
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
