const Redis = require("redis");

// localhost version
const client = Redis.createClient();

function redisConnect() {
  client.connect();

  client.on("connect", () => {
    console.log("Connected to Redis database");
  });

  client.on("error", (err) => {
    console.log("Redis error: ", err);
  });
}

module.exports = {
  client,
  redisConnect,
};
