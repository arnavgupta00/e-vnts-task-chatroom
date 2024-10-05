import Redis from "ioredis";

const redis = new Redis("redis://default:RagrY8Fxi0i1xRTx9WlmJ9oZ4BOfdETZ@redis-19908.c264.ap-south-1-1.ec2.redns.redis-cloud.com:19908" || "redis://localhost:6379"); // Defaults to localhost:6379

export default redis;
