import { Modal } from "@/view/components/Modal";
import { useNewOccurrenceActionModal } from "./useNewOccurrenceActionModal";
import { Button } from "@/view/components/Button";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { Controller } from "react-hook-form";
import { FileUp, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/view/components/Input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const NewOccurrenceActionModal = () => {
  const {
    closeNewOccurrenceActionModal,
    isNewOccurrenceActionModalOpen,
    handleSubmit,
    control,
    errors,
    isLoadingNewOccurrence,
    handleFileSelected,
    handleDragOver,
    handleDrop,
    isDragging,
    file,
    handleDragLeave,
    isFinished,
  } = useNewOccurrenceActionModal();

  return (
    <Modal
      title="Novo Plano de Ação"
      open={isNewOccurrenceActionModalOpen}
      onClose={closeNewOccurrenceActionModal}
      overflow
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4 ">
          <div>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.title?.message}
                  placeholder="Título do Plano de Ação"
                  maxLength={60}
                  variant="modal"
                  name="title"
                  value={value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="dueDate"
              render={({ field: { onChange } }) => (
                <DatePickerInput
                  //value={value}
                  placeholder="Prazo da ação"
                  onChange={(value) => onChange(value)}
                  error={errors.dueDate?.message}
                />
              )}
            />
          </div>

          <div
            className={cn(
              "px-2 flex items-center justify-between  bg-white rounded-lg w-full border border-gray-500 h-[52px]  text-gray-800   placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none peer hover:bg-white"
            )}
          >
            <div className="flex flex-col">
              <Label>Finalizado</Label>
              <Label className="text-xs text-gray-600">
                Marcar o plano de ação como finalizado.
              </Label>
            </div>
            <Controller
              control={control}
              name="isFinished"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} />
              )}
            />
          </div>

          {isFinished && (
            <div className="w-full">
              <Controller
                control={control}
                name="finishedAt"
                shouldUnregister={true}
                render={({ field: { onChange } }) => (
                  <DatePickerInput
                    //value={value}
                    placeholder="Finalizado em:"
                    onChange={(value) => onChange(value)}
                    error={errors.finishedAt?.message}
                  />
                )}
              />
            </div>
          )}
          <div>
            <Controller
              control={control}
              name="responsible"
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.responsible?.message}
                  placeholder="Responsável"
                  maxLength={60}
                  variant="modal"
                  name="responsible"
                  value={value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="responsibleEmail"
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.responsibleEmail?.message}
                  placeholder="E-mail do Responsável"
                  maxLength={60}
                  variant="modal"
                  value={value}
                  name="responsibleEmail"
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="xs:w-full lg:col-span-4 h-32  ">
              <label
                htmlFor="file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                  "border relative flex rounded-md  cursor-pointer bg-white  w-full  h-full border-dashed border-gray-700  text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-gray-200",
                  isDragging && "bg-gray-200"
                )}
              >
                {file && (
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <FileUp className="w-8 h-8 text-clack" />
                    <div>{file.name}</div>
                  </div>
                )}
                {!file && (
                  <div className="flex flex-col gap-4 items-center">
                    {!isDragging && <FileUp className="w-8 h-8 text-clack" />}
                    {isDragging && <Hand className="w-8 h-8 text-clack" />}

                    <span className="text-black">
                      {!isDragging && " Anexar arquivo"}
                      {isDragging && " Solte o arquivo para fazer o upload"}
                    </span>
                    <span className="text-gray-600">
                      {
                        "Clique ou arraste para fazer o upload do arquivo (tamanho máximo 10MB)"
                      }
                    </span>
                  </div>
                )}
              </label>

              <input
                type="file"
                id="file"
                className="sr-only"
                onChange={handleFileSelected}
                // onDrop={handleFileSelected}
              ></input>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoadingNewOccurrence}>
          Criar
        </Button>
      </form>
    </Modal>
  );
};
