import { createLoader } from "nuqs/server";
import { credentialsParams, workflowsParams } from "./params";

export const workflowsParamsLoader = createLoader(workflowsParams);

export const credentialsParamsLoader = createLoader(credentialsParams);
