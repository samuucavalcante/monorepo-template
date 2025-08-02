import "dotenv/config";

import mongoose from "mongoose";

initDB().catch((err) => console.log(err));

async function initDB() {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: process.env.MONGO_DATABASE_NAME!,
  });
}

export { mongoose };
