// workers/chatWorker.ts
import mongoose from 'mongoose';
import { Chat } from '../models/Chat'; // We'll define the Chat model next
import { chatQueue } from '@/app/api/chat/queue';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatGPTClone';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('Worker: Connected to MongoDB'))
  .catch((err) => {
    console.error('Worker: MongoDB connection error:', err);
    process.exit(1);
  });

// Process jobs
chatQueue.process(async (job) => {
  try {
    const { userId, messages } = job.data;

    // Create and save the chat
    const chat = new Chat({ userId, messages });
    await chat.save();

    console.log(`Worker: Chat saved for userId=${userId}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Worker: Error processing job:', error);
    return Promise.reject(error);
  }
});

// Optional: Listen to job events
chatQueue.on('completed', (job) => {
  console.log(`Worker: Job completed with id ${job.id}`);
});

chatQueue.on('failed', (job, err) => {
  console.error(`Worker: Job failed with id ${job.id}, error: ${err}`);
});

console.log('Worker: Listening for jobs...');
