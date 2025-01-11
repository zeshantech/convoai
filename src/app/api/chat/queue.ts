// queue.ts
type Task = () => Promise<void>;

const taskQueue: Task[] = [];
let isProcessing = false;

/**
 * Add task to queue
 */
export function enqueueTask(task: Task) {
  taskQueue.push(task);
  processQueue();
}

/**
 * Process tasks one by one
 */
async function processQueue() {
  if (isProcessing) return;

  isProcessing = true;
  while (taskQueue.length > 0) {
    const task = taskQueue.shift();
    if (!task) break;

    try {
      await task();
    } catch (error) {
      console.error('Queue task failed:', error);
    }
  }
  isProcessing = false;
}
