import { executionsParams } from "@/lib/params";
import { useQueryStates } from "nuqs";

export const useExecutionsParams = () => {
  return useQueryStates(executionsParams);
};
