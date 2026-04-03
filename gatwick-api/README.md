# gatwick-api (Cloudflare Workers)

This service has been ported from Flask to a Cloudflare Worker while keeping the same HTTP routes and response payloads.

## Routes preserved

- `GET /` Admin page (HTML)
- `GET /gate/:gateId` Gate page (HTML)
- `GET /new_player?name=&score=&skin=`
- `GET /update_player_skin?name=&skin=`
- `GET /:gateId/new_player?name=&score=&skin=`
- `DELETE /:gateId/delete`
- `DELETE /unassigned_players/:playerName/delete`
- `GET /:gateId/data?name=&score=&skin=`

## Run locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Configuration

`wrangler.toml` includes:

- `main = "src/index.js"`
- `compatibility_date = "2026-04-03"`
- `NUM_PER_BOARDING_GROUP` as a Worker variable

## Notes on state

The original Flask app kept state in memory (`all_players`, `unassigned_players`).
This Worker currently preserves that behavior with isolate memory.

For production-safe shared state across requests and isolates, move this state to Durable Objects or KV.
