const redis = require('../config/redis');

const rateLimiter = (limit = 100, windowSeconds = 60) =>{
  return async (req, res, next) => {
    try {
        const ip = req.ip;

        const key = `rate_limit:${ip}`;
        const current = await redis.incr(key);

        if(current == 1){
            await redis.expire(key, windowSeconds);
        }

        if(current > limit){
            return res.status(429).json({
                error: `Too many requests. Please try again later.`
            });
        }

        next();
    } catch (err) {
        console.log('Rate Limiter error : ', err);
        next();
    }
  };
};

module.exports = rateLimiter;