import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWR from "swr";

export function useGetMessages(chatId: string) {
  return useSWR("/messages", async (url: string) => {
    try {
      const response = await api.get(`${url}?chatId=${chatId}`);

      return response.data?.messages ?? [];
    } catch (error: any) {
      console.log(error);

      toast.error(error?.message ?? "Unable to get Messages");
    }
  });
}
