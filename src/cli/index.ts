import { Command } from 'commander';
import prompts, { PromptObject } from 'prompts';
import fs from 'fs/promises';
import path from 'path';

type Task = 'Auth' | 'Bot';

export async function runCli(): Promise<Task> {
  const program = new Command().name('cgpt');

  program
    .description('A CLI for ChatGPT')
    // .argument(
    //   '[dir]',
    //   'The name of the application, as well as the name of the directory to create'
    // )
    .parse(process.argv);

  // if (program.args[0] !== undefined) {
  //   await getConfig();
  // }

  if (!program.args[0]) {
    return 'Bot';
  }

  return 'Auth';
}

async function getConfig() {
  const questions: PromptObject<string>[] = [
    {
      type: 'text',
      name: 'OPENAI_ORGANIZATION',
      message: 'Enter your OpenAI Organization name',
    },
    {
      type: 'password',
      name: 'OPENAI_API_KEY',
      message: 'Enter your OpenAI Api Key',
    },
  ];

  const response = await prompts(questions);

  writeConfig(Object.entries(response));
}

function writeConfig(config: [string, any][]) {
  const filepath = path.join(process.cwd(), '.env');
  fs.writeFile(
    filepath,
    config
      .map(([key, value]) => {
        return `${key}="${value}"`;
      })
      .join('\n')
  );
}
