import { cn } from "@/lib/utils";
import { Button } from "@/view/components/Button";
import { Modal } from "@/view/components/Modal";

import { FileIcon } from "lucide-react";
import { ChangeEvent, DragEvent } from "react";

interface UploadFileModalProps {
  onDrop: (event: DragEvent<HTMLLabelElement>) => void;
  onDragOver: (event: DragEvent<HTMLLabelElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDragLeave: (event: DragEvent<HTMLLabelElement>) => void;
  isDragging: boolean;
  file: File | null;
  open: boolean;
  onClose(): void;
  handleFileSubmit(file: File): void;
}

export const UploadFileModal = ({
  file,
  onDragOver,
  onDrop,
  open,
  onClose,
  isDragging,
  onDragLeave,
  onChange,
  handleFileSubmit,
}: UploadFileModalProps) => {
  return (
    <Modal title="Anexar arquivo" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4  items-center">
        <div className="col-span-12 w-full xs:w-full lg:col-span-4 h-60">
          <label
            htmlFor="file"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={cn(
              "border relative flex rounded-md  cursor-pointer bg-white  w-full  h-full border-dashed border-gray-700  text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-gray-200",
              isDragging && "bg-gray-200"
            )}
          >
            {file && <div>{file.name}</div>}
            {!file && (
              <>
                <FileIcon className="w-8 h-8 text-gray-700" />
                <span className="text-gray-700">
                  Arraste e solte um arquivo aqui, ou clique para selecionar
                </span>
              </>
            )}
          </label>

          <input
            type="file"
            id="file"
            className="sr-only"
            onChange={onChange}
            // onDrop={handleFileSelected}
          ></input>
        </div>
        <Button
          className="w-full"
          disabled={!file}
          onClick={() => handleFileSubmit(file!)}
        >
          Enviar
        </Button>
      </div>
    </Modal>
  );
};
