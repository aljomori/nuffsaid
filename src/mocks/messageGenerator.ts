import faker from 'faker';
import { v4 } from 'uuid';
import getRandom from '../utils/random';

export enum Priority {
  'error' = 1,
  'warning',
  'info',
}
export interface IMessage {
  id: string;
  message: string;
  priority: Priority;
}
interface IMessageGeneratorOption {
  messageCallback: (message: IMessage) => void;
}

export default class MessageGenerator {
  constructor(options: IMessageGeneratorOption) {
    this.messageCallback = options.messageCallback;
    this.stopGeneration = false;
  }

  public messageCallback;

  public stopGeneration;

  stop(): void {
    this.stopGeneration = true;
  }

  start(): void {
    this.stopGeneration = false;
    this.generate();
  }

  isStarted(): boolean {
    return !this.stopGeneration;
  }

  generate(): void {
    if (this.stopGeneration) {
      return;
    }
    const message = faker.lorem.sentence();
    const priority = getRandom(1, 3);
    const nextInMS = getRandom(500, 3000);

    this.messageCallback({
      id: v4(),
      message,
      priority,
    });

    setTimeout(() => {
      this.generate();
    }, nextInMS);
  }
}
