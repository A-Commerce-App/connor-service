const redis = require('redis');
const { promisifyAll } = require('bluebird');
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

promisifyAll(redis);

module.exports = redisClient;