import { getTranslation } from "@miracleufo/react-g-translator";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import api from "@/lib/apiClient";
import { getLanguageCode } from "@/utils/getLanguageCode";

export const useTranslator = () => {
  return useSWRMutation(
    "/translate",
    async (url, { arg }: { arg: ITranslation }) => {
      switch (arg.translator) {
        case "g-translate":
          const result = await getTranslation(arg.text, getLanguageCode(arg.sourceLang) as any, getLanguageCode(arg.targetLang) as any);
          return result;
        case "openai":
        case "anthropic":
          const response = await api.post<{ translation: string }>(url, arg);
          return response.data.translation;
      }
    },
    {
      onError: (error: unknown) => {
        toast.error((error as IError).message);
      },
    }
  );
};

interface ITranslation {
  text: string;
  sourceLang: string;
  targetLang: string;
  translator: ITranslators;
}
