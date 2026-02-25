"use client";

import { memo, useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <Button size="icon" variant="outline" className="bg-background">
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";
