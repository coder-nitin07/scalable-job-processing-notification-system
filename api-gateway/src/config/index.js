require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jobServiceUrl: process.env.JOB_SERVICE_URL || process.env.JOBS_SERVICE_URL,
    notificationsServiceUrl: process.env.NOTIFICATION_SERVICE_URL || process.env.NOTIFICATIONS_SERVICE_URL,
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
        url: process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || 'localhost' }:${process.env.REDIS_PORT || 6379}`,
    },
    jwtSecret: process.env.JWT_SECRET    
};