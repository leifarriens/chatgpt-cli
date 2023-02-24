import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const chatPrompt = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));
