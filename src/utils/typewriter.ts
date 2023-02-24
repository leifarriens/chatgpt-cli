import chalk from 'chalk';

export async function typewriter(text: string) {
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    process.stdout.write(chalk.green(c));

    await new Promise((resolve) => setTimeout(resolve, 10));

    if (i + 1 === text.length) {
      process.stdout.write('\n\n\n');
    }
  }
}
