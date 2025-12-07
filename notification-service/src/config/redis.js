const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Notification Service connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;