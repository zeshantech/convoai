import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWR from "swr";

export function useGetMessages(chatId: string) {
  return useSWR("/message", async (url: string) => {
    try {
      const response = await api.get(`${url}?chatId=${chatId}`);

      return response.data?.messages ?? [];
    } catch (error: unknown) {
      toast.error((error as IError).message);
    }
  });
}
