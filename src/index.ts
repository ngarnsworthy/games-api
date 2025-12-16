import { Hono } from 'hono'
import { listGames, createGame, deleteGame, finishGame, updateGameDescription } from "./db/queries"
import Homepage from './homepage'

const app = new Hono()

app.get('/', (c) => {
  return c.html(Homepage())
})

app.get("/api/games", (c) => c.json(listGames()))

app.post("/api/games", async (c) => {
  const body = await c.req.json().catch(() => null)
  const name = (body?.name ?? "").toString().trim()
  if (!name) return c.json({ error: "name is required" }, 400);
  const description = (body?.description ?? "").toString().trim();
  const started = body?.started

  return c.json(createGame(name, description, started), 201)
})

app.patch("/api/games/:id/finish", async (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = await finishGame(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})

app.patch("/api/games/:id/description", async (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)
  const body = await c.req.json().catch(() => null)
  const description = (body?.description ?? "").toString().trim();

  const res = await updateGameDescription(id, description)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})

app.delete("/api/games/:id", async (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = await deleteGame(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})

const port = Number(process.env.PORT) || 3000

export default {
  port,
  fetch: app.fetch,
}
