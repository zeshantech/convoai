import api from "@/lib/apiClient";
import { IChat } from "@/models/Chat";
import { toast } from "sonner";
import useSWR from "swr";

export function useGetChats() {
  return useSWR<IChat[]>("/chat", async (url: string) => {
    try {
      const response = await api.get(url);

      return response.data?.chats ?? [];
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message ?? "Unable to get Chats");
    }
  });
}
