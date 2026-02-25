"use client";

import { memo, useState } from "react";
import { PlusIcon } from "lucide-react";
import type { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "../react-flow/placeholder-node";
import { WorkflowNode } from "./WorkFlowNode";

export const InitialNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <WorkflowNode {...props} showToolbar={false}>
      <PlaceholderNode {...props} onClick={() => setSelectorOpen(true)}>
        <div className="flex items-center justify-center cursor-pointer">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
