import express from "express";
import cors from "cors";
import redis from "redis";

// import redisConnect from "./services/redis";
import { shuffleDeck } from "./services/utils";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/deck", (req, res) => {
  const deck = shuffleDeck();
//   client.set("deck", JSON.stringify(deck));
  res.json({ deck });
});

app.listen(port, () => {
    // redisConnect(redis);
  console.log(`Server started on http://localhost:${port}`);
});

// npm install express redis @types/express @types/cors @types/redis
// ts-node