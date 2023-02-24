#!/usr/bin/env node
import 'dotenv/config';
import chalk from 'chalk';
import { typewriter } from '@/utils/typewriter.js';
import { chatPrompt } from '@/utils/chat-input.js';

import { getCompletion } from './chat-gpt.js';

async function main() {
  console.clear();

  while (true) {
    const input = await chatPrompt(chalk.gray('>>: '));

    if (input === 'exit') {
      process.exit();
    }

    const { status, message } = await getCompletion(input);

    if (status === 'error') {
      console.error(chalk.red(JSON.stringify(message)));
    }

    if (status === 'success') {
      await typewriter(message);
    }
  }
}

main();
