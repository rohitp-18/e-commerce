const redis = require("redis");

const redisClient = redis.createClient();

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("redis connected");
  } catch (error) {
    console.log("error: redis error" + error);
  }
}

async function checkRedisClient() {
  try {
    await redisClient.ping;
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { redisClient, connectRedis, checkRedisClient };
