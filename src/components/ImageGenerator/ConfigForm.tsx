import React, { useMemo } from "react";
import { Input } from "../ui/input";
import ModelSelector from "./ModelSelector";
import { MODELS } from "./constants";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IForm } from "./types";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
}

interface ConfigFormProps {
  register: UseFormRegister<IForm>;
  setValue: UseFormSetValue<IForm>;
  watch: UseFormWatch<IForm>;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className="gap-2 grid grid-cols-3">
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`text-sm bg-background h-24 min-w-24 flex-1 border rounded-md flex items-center justify-center cursor-pointer ${
            selectedSize === size ? "border-primary" : ""
          }`}
          onClick={() => onSizeChange(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default function ConfigForm({
  register,
  setValue,
  watch,
}: ConfigFormProps) {
  const selectedModel = useMemo(() => {
    const model = MODELS.find(
      (model) => model.id === watch("selectedModelId")
    )!;
    setValue("selectedSize", model.supportedSizes[0]);

    return model;
  }, [watch("selectedModelId")]);

  const sizes: string[] = selectedModel?.supportedSizes || [];
  return (
    <fieldset className="rounded-lg border p-4 h-full">
      <legend className="-ml-1">Settings</legend>
      <div className="space-y-4">
        <ModelSelector
          selectedModelId={watch("selectedModelId")}
          onModelChange={(value) => setValue("selectedModelId", value)}
        />

        <div>
          <label className="block font-medium mb-2">Select Image Size</label>
          <Select>
            <SelectTrigger id="model" className="items-start">
              <SelectValue placeholder="Select a model">
                {watch("selectedSize")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SizeSelector
                sizes={sizes}
                selectedSize={watch("selectedSize")}
                onSizeChange={(size) => setValue("selectedSize", size)}
              />
            </SelectContent>
          </Select>
        </div>

        <Input
          label="Reference Image"
          type="file"
          {...register("referenceImage")}
        />
        <div className="flex gap-2">
          <Input
            id="seed"
            label="Seed"
            type="number"
            placeholder="0.7"
            {...register("seed")}
          />
          <Input
            id="numberOfImages"
            label="Number of Images"
            type="number"
            placeholder="0.7"
            {...register("numberOfImages")}
          />
        </div>
      </div>
    </fieldset>
  );
}
