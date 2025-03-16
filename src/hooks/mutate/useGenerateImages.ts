import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface GenerateImageData {
  selectedModelId: string;
  selectedSize: string;
  seed: number;
  prompt: string;
  numberOfImages: number;
}

interface GenerateImageResponse {
  images: { base64Data: string }[];
}

export function useGenerateImages() {
  return useSWRMutation(
    "/generate-image",
    async (url: string, { arg }: { arg: GenerateImageData }) => {
      try {
        const fetcher = await api.post<GenerateImageResponse>(url, arg);
        return fetcher.data.images.map(
          (image) => `data:image/png;base64,${image.base64Data}`
        );
      } catch (error: unknown) {
        toast.error((error as IError).message);
      }
    }
  );
}
