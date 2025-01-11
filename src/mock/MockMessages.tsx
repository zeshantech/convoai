import { faker } from "@faker-js/faker";
import { Message } from "ai/react";

export const generateMockMessages = (count: number): Array<Message> => {
  const messages: Array<Message> = [];
  const roles = ["assistant", "user"] as const;

  for (let i = 1; i <= count; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const content = faker.lorem.sentence();
    const timestamp = faker.date.recent()

    messages.push({
      id: Math.random().toString(),
      content,
      role,
      createdAt: timestamp,
    });
  }

  return messages;
};
