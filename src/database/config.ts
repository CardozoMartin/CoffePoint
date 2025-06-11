// src/config/database.ts
import mongoose from 'mongoose';




const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://martincardozo1993xp:wCqSETzkYhwSSpk3@cluster-63i.bkvhzgl.mongodb.net/coffepoint?retryWrites=true&w=majority&appName=Cluster-63i');
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error: unknown) {
    
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Error desconocido al conectar a MongoDB');
    }
    process.exit(1);
  }
};

export default connectDB;