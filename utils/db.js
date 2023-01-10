import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const connection = {};

export async function connectDB() {
  if (connection.isConnected) {
    console.log('Already connected to the DB');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous DB connection');
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('New DB connection');
  connection.isConnected = db.connections[0].readyState;
}
