import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  //   const editor = useAtomValue(editorAtom);
  //   const saveWorkflow = useUpdateWorkflow();

  //   const handleSave = () => {
  //     if (!editor) return;

  //     const nodes = editor.getNodes();
  //     const edges = editor.getEdges();

  //     saveWorkflow.mutate({ id: workflowId, nodes, edges });
  //   };

  return (
    <div className="ml-auto">
      <Button size="sm" onClick={() => {}} disabled={false}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};
