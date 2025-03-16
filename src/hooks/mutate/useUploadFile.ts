import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import api from "@/lib/apiClient"; // Ensure this is correctly configured

export function useUploadFiles() {
  return useSWRMutation(
    "/signed-url",
    async (url: string, { arg }: { arg: File }) => {
      try {
        const response = await api.post(url, {
          fileName: arg.name,
          fileType: arg.type,
        });

        const { url: presignedUrl, objectUrl } = response.data;

        await api.put(presignedUrl, arg, {
          headers: {
            "Content-Type": arg.type,
          },
        });

        return objectUrl;
      } catch (error: any) {
        console.error("Upload Error:", error);
        toast.error(error?.message ?? "Unable to upload file");
        throw error;
      }
    }
  );
}
