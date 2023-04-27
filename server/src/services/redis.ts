import redis from "redis";

const redisClient = redis.createClient({
  password: "Hjiuu8(U*8098098HHH",
  socket: {
    host: "redis-19682.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 19682,
  },
});

redisClient.on("connect", () => {
  console.log("Connected to Redis database");
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});
