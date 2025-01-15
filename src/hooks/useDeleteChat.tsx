import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface IDeleteChat {
  id: string;
}

export function useDeleteChat() {
  return useSWRMutation(
    "/chat",
    async (url: string, { arg }: { arg: string }) => {
      try {
        const response = await api.delete(`${url}/${arg}`);

        return response.data;
      } catch (error: any) {
        toast.error(error?.message ?? "Unable to delete Chat");
      }
    }
  );
}
