import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface IUpdateChat {
  id: string;
  title?: string;
  visibility?: "public" | "private";
}

export function useUpdateChat() {
  return useSWRMutation(
    "/chat",
    async (url: string, { arg }: { arg: IUpdateChat }) => {
      try {
        const response = await api.put(`${url}/${arg.id}`, arg);

        return response.data;
      } catch (error: any) {
        console.log(error);
        toast.error(error?.message ?? "Unable to get Chats");
      }
    }
  );
}
