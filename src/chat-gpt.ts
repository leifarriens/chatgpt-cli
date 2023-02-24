import { Configuration, OpenAIApi } from 'openai';
import { randomUUID } from 'crypto';
import { isAxiosError } from 'axios';
import ora from 'ora';

const sessionUser = randomUUID();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function getCompletion(prompt: string): Promise<{
  status: 'success' | 'error';
  message: string;
}> {
  const spinner = ora().start();

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
      presence_penalty: -1,
      max_tokens: 2048, // 256,
      user: sessionUser,
    });

    spinner.stop();

    return { status: 'success', message: completion.data.choices[0].text! };
  } catch (error) {
    spinner.fail('Failed to generate response');
    if (isAxiosError(error) && error.response) {
      return { status: 'error', message: error.response.data };
    }
  }

  return { status: 'error', message: 'Floating' };
}
