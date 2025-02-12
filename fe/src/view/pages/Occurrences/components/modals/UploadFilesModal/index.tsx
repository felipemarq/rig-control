import { Modal } from "@/view/components/Modal";

import { FileIcon } from "lucide-react";
import { ChangeEvent, DragEvent } from "react";

interface UploadFilesModalProps {
  onDrop: (event: DragEvent<HTMLLabelElement>) => void;
  onDragOver: (event: DragEvent<HTMLLabelElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  open: boolean;
  onClose(): void;
}

export const UploadFilesModal = ({
  file,
  onDragOver,
  onDrop,
  open,
  onClose,
  onChange,
}: UploadFilesModalProps) => {
  return (
    <Modal title="Anexar arquivo" open={open} onClose={onClose}>
      <div className="mt-10 flex flex-col gap-4">
        <div className="col-span-12  w-[73%] xs:w-full lg:col-span-4  h-60">
          <label
            htmlFor="file"
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border relative flex rounded-md  cursor-pointer bg-gray-400  w-full  h-full border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-gray-600"
          >
            {file && <div>{file.name}</div>}
            {!file && (
              <>
                <FileIcon className="w-8 h-8 text-white" />
                <span className="text-white">Anexar arquivo</span>
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
      </div>
    </Modal>
  );
};
