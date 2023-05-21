const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// Redis commands to retrieve user data
exports.index = async (req, res, next) => {
  try {
    const UserData = await new Promise((resolve, reject) => {
      client.zrevrangebyscore(
        "users",
        "+inf",
        "-inf",
        "WITHSCORES",
        "LIMIT",
        0,
        10,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            const users = [];
            for (let i = 0; i < data.length; i += 2) {
              users.push({
                username: data[i],
                win: parseInt(data[i + 1]),
              });
            }
            resolve(users);
          }
        }
      );
    });

    res.json({ users: UserData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.create = (req, res, next) => {
  const { username } = req.body;

  client.hgetall(`user:${username.toLowerCase()}`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (result) {
      res.json({ user: result });
    } else {
      const data = {
        username: username.toLowerCase(),
        win: 0,
        loose: 0,
        gamesPlayed: 0,
      };

      client.hmset(`user:${username.toLowerCase()}`, data, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Server Error" });
        }

        res.json({ user: data });
      });
    }
  });
};

exports.update = (req, res, next) => {
  const { game, cards, defusingCard } = req.body;

  const data = {
    gamesPlayed: game.played,
    win: game.win,
    loose: game.loose,
    savedGame: {
      cards,
      defusingCard,
    },
  };

  client.hmset(
    `user:${req.params.username.toLowerCase()}`,
    data,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      }

      res.json({ user: data });
    }
  );
};

