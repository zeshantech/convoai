import api from "@/lib/apiClient";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface IUpdateMessage {
  id: string;
  vote?: "like" | "dislike";
  suggestion?: string;
}

export function useUpdateMessage() {
  return useSWRMutation(
    "/message",
    async (url: string, { arg }: { arg: IUpdateMessage }) => {
      try {
        const response = await api.put(`${url}/${arg.id}`, arg);

        return response.data;
      } catch (error: any) {
        console.log(error);
        toast.error(
          error?.message ?? "Something went wrong, plz tryagain Later"
        );
      }
    }
  );
}
