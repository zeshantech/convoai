// customModel.ts
import { openai } from '@ai-sdk/openai';

import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';
import { google } from '@ai-sdk/google';
import { LanguageModel, experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { customMiddleware } from './custom-middleware';
import { ModelProviderEnum } from '@/context/ModelContext';


export const getModel = (id: string): LanguageModel => {
  let apiClient;
  const provider = getProvider(id);

  switch (provider) {
    case ModelProviderEnum.OpenAI:
      apiClient = openai(id);
      break;
    case ModelProviderEnum.Anthropic:
      apiClient = anthropic(id);
      break;
    case ModelProviderEnum.Mistral:
      apiClient = mistral(id);
      break;
    case ModelProviderEnum.Gemini:
      apiClient = google(id);
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }

  return wrapLanguageModel({
    model: apiClient,
    middleware: customMiddleware,
  });
}

function getProvider(modelId: string): ModelProviderEnum {
  switch (modelId) {
    case 'gpt-4o':
    case 'gpt-4o-mini':
    case 'gpt-4-turbo':
    case 'gpt-4':
    case 'o1-mini':
    case 'o1-preview':
    case 'o1':
      return ModelProviderEnum.OpenAI;

    case 'claude-3-5-sonnet-20241022':
    case 'claude-3-5-sonnet-20240620':
    case 'claude-3-5-haiku-20241022':
      return ModelProviderEnum.Anthropic;

    case 'pixtral-large-latest':
    case 'pixtral-12b-2409':
    case 'mistral-large-latest':
    case 'mistral-small-latest':
      return ModelProviderEnum.Mistral;

    case 'gemini-2.0-flash-exp':
    case 'gemini-1.5-flash':
    case 'gemini-1.5-pro':
      return ModelProviderEnum.Gemini;

    default:
      throw new Error(`Unknown provider for model: ${modelId}`);
  }
}
