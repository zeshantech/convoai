import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ConfigForm from "./ConfigForm";
import { Spinner } from "../ui/Spinner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import Composer from "./Composer";
import { MODELS } from "./constants";
import { IForm } from "./types";
import { Badge } from "../ui/badge";
import { useGenerateImages } from "@/hooks/mutate/useGenerateImages";
import Image from "next/image";
import ImageMenu from "./ImageMenu";

const MainContent: React.FC = () => {
  const { isMutating, trigger, data } = useGenerateImages();

  const { register, handleSubmit, setValue, watch } = useForm<IForm>({
    defaultValues: {
      selectedModelId: MODELS[0].id,
      selectedSize: "",
      seed: 0.7,
      prompt: "",
      numberOfImages: 1,
    },
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await trigger({
      ...data,
      numberOfImages: Number(data.numberOfImages),
    });
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="gap-2 p-2 max-h-full"
    >
      <ResizablePanel defaultSize={30}>
        <ConfigForm register={register} setValue={setValue} watch={watch} />
      </ResizablePanel>
      <ResizableHandle className="opacity-60" />
      <ResizablePanel defaultSize={70} className="pt-3">
        <div className="flex border flex-col relative rounded-md h-full p-2">
          <Badge className="absolute top-2 right-2 gap-1" variant={"outline"}>
            Output
          </Badge>
          <div className="flex-1 flex items-center justify-center px-4 overflow-x-auto gap-4 hide-scrollbar">
            {isMutating ? (
              <Spinner size={48} />
            ) : data?.length ? (
              data?.map((src, index) => (
                <div className="relative" key={index}>
                  <Image
                    src={src}
                    alt={`Generated ${index}`}
                    key={index}
                    className="rounded-md border !h-72 w-fit"
                    width={10000}
                    height={10000}
                  />
                  <ImageMenu src={src} />
                </div>
              ))
            ) : (
              <p>No images generated yet.</p>
            )}
          </div>

          <Composer
            setValue={setValue}
            register={register}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainContent;
