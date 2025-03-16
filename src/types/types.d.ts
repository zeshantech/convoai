type PaginationInput = {
  limit?: number;
  page?: number;
};

type IError = {
  message: string;
};

type ITranslators = "g-translate" | "openai" | "anthropic";
