import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/**
 * GET all
 */
app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(items);
});

/**
 * CREATE
 */
app.post("/items", async (req, res) => {
  const { title, content } = req.body;

  const item = await prisma.item.create({
    data: { title, content },
  });

  res.json(item);
});

/**
 * UPDATE
 */
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const item = await prisma.item.update({
    where: { id },
    data: { title, content },
  });

  res.json(item);
});

/**
 * DELETE
 */
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.item.delete({
    where: { id },
  });

  res.json({ ok: true });
});

app.listen(3001, "0.0.0.0", () => {
  console.log("API running on port 3001");
});