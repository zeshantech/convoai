import api from "@/lib/apiClient";
import { IChat } from "@/models/Chat";
import { PaginateResult } from "mongoose";
import { toast } from "sonner";
import useSWR from "swr";

export function useGetChats(input: PaginationInput) {
  return useSWR<PaginateResult<IChat>>("/chat", async (url: string) => {
    try {
      const response = await api.get(url, { params: input });

      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message ?? "Unable to get Chats");
    }
  });
}
