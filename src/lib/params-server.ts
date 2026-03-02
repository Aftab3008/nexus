import { createLoader } from "nuqs/server";
import { credentialsParams, executionsParams, workflowsParams } from "./params";

export const workflowsParamsLoader = createLoader(workflowsParams);

export const credentialsParamsLoader = createLoader(credentialsParams);

export const executionsParamsLoader = createLoader(executionsParams);
