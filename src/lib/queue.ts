type Task = () => Promise<void>;

const taskQueue: Task[] = [];
let isProcessing = false;

export function enqueueTask(task: Task) {
  taskQueue.push(task);
  processQueue();
}

async function processQueue() {
  if (isProcessing) return;

  isProcessing = true;
  while (taskQueue.length > 0) {
    const task = taskQueue.shift();
    if (!task) break;

    try {
      await task();
    } catch (error) {
      console.error("Queue task failed:", error);
    }
  }
  isProcessing = false;
}
