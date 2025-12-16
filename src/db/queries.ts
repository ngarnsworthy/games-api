import { db } from "./index";
import { games } from "./schema";
import { eq, asc } from "drizzle-orm";

export function listGames() {
  return db.select().from(games).orderBy(asc(games.started)).all();
}

export async function createGame(
  name: string,
  description?: string,
  started?: number
) {
  const createdAt = Math.floor(Date.now() / 1000);

  const res = await db
    .insert(games)
    .values({
      name: name,
      description: description,
      started: Math.floor(started ?? (Date.now() / 1000)),
    })
    .returning()
    .execute();

  return res[0];
}

export async function finishGame(id: number) {
  const res = await db
    .update(games)
    .set({ finished: Math.floor(Date.now() / 1000) })
    .where(eq(games.id, id))
    .returning({ updatedId: games.id })
    .execute();

  return { changes: res.length };
}

export async function updateGameDescription(id: number, description: string) {
  const res = await db
    .update(games)
    .set({ description: description })
    .where(eq(games.id, id))
    .returning({ updatedId: games.id })
    .execute();

  return { changes: res.length };
}

export async function deleteGame(id: number) {
  const res = await db
    .delete(games)
    .where(eq(games.id, id))
    .returning({ updatedId: games.id })
    .execute();

  return { changes: res.length };
}
