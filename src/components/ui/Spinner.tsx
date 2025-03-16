import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Spinner = ({ size = 24, className, ...props }: ISVGProps) => {
  return <LoaderCircle className={cn("animate-spin", `w-${size / 4}`, className)} {...props} />;
};
