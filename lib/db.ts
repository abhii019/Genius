// // lib/db.ts
// import mongoose from "mongoose";

// // Get MongoDB URI from environment variables
// const MONGODB_URI = process.env.MONGODB_URI;
// console.log("MONGODB_URI:", MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global as typeof global & {
//   mongoose: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// };

// if (!cached.mongoose) {
//   cached.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.mongoose.conn) {
//     return cached.mongoose.conn;
//   }

//   if (!cached.mongoose.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.mongoose.promise = mongoose
//       .connect(MONGODB_URI!, opts)
//       .then((mongoose) => {
//         console.log("MongoDB connected");
//         return mongoose;
//       });
//   }
//   cached.mongoose.conn = await cached.mongoose.promise;
//   return cached.mongoose.conn;
// }

// export default dbConnect;
