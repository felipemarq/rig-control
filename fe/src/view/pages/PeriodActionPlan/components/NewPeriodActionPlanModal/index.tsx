import { Modal } from "@/view/components/Modal";
import { useNewPeriodActionPlanModal } from "./useNewPeriodActionPlanModal";
import { Card } from "@/components/ui/card";

import { Controller } from "react-hook-form";
import { Input } from "@/view/components/Input";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Paperclip, PlusCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { Button } from "@/view/components/Button";
import { Textarea } from "@/components/ui/textarea";
import TextArea from "antd/es/input/TextArea";
import { UploadFilesModal } from "../UploadFilesModal";

export const NewPeriodActionPlanModal = () => {
  const {
    isNewPeriodActionPlanModalOpen,
    closeNewPeriodActionPlanModal,
    append,
    remove,
    control,
    errors,
    watch,
    fields,
    handleSubmit,
    isPending,
    file,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelected,
    isDragging,
    isUploadingFile,
    openUploadFilesModal,
    closeUploadFilesModal,
    handleAddFile,
    filesArray,
  } = useNewPeriodActionPlanModal();

  if (isUploadingFile) {
    return (
      <UploadFilesModal
        handleFileSubmit={handleAddFile}
        open={isUploadingFile}
        onClose={closeUploadFilesModal}
        file={file}
        onChange={handleFileSelected}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        isDragging={isDragging}
        onDragLeave={handleDragLeave}
      />
    );
  }

  return (
    <Modal
      title="Criar Plano de Ação"
      open={isNewPeriodActionPlanModalOpen}
      onClose={closeNewPeriodActionPlanModal}
      overflow
    >
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 mix-blend-multiply" />
          {/*  <div className="relative z-10 p-6 text-white">
              <CardTitle className="text-2xl font-bold mb-2">
                Criar Plano de Ação
              </CardTitle>
              <p className="text-sm opacity-90">{`Equipamento: ${translateClassification(
                "RIG_CAR"
              )}  ( ${translateRepairClassification(
                "ENGINE" as RepairClassification
              )})`}</p>
              <p className="text-sm opacity-90">Sonda: spt 100</p>
            </div> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 justify-center items-center">
            <div className="space-y-2 flex-1">
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
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <Button
              type="button"
              className="flex items-center"
              onClick={openUploadFilesModal}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              Anexar Arquivo
            </Button>
          </div>

          {filesArray.length > 0 && (
            <div className="flex flex-col gap-2 ">
              {" "}
              <span className="text-gray-700">Arquivo(s) anexado(s):</span>
              {filesArray.map((file) => (
                <div className="flex  gap-2 items-center">
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {" "}
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
                name={`isFinished`}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Switch checked={value} onCheckedChange={onChange} />
                )}
              />
            </div>
            {watch(`isFinished`) && (
              <div className="w-full">
                <Controller
                  control={control}
                  name={`finishedAt`}
                  shouldUnregister={true}
                  render={({ field: { onChange, value } }) => (
                    <DatePickerInput
                      value={value}
                      placeholder="Finalizado em:"
                      onChange={(value) => onChange(value)}
                      error={errors.finishedAt?.message}
                    />
                  )}
                />
              </div>
            )}
          </div>

          <div className="space-y-4 border-t border-gray-500 pt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-black font-semibold">Itens do Plano de Ação</h4>
              <Button
                type="button"
                onClick={() =>
                  append({
                    sequenceNumber: fields.length + 1,
                    task: "",
                    assignee: "",
                    dueDate: new Date(),
                    reason: "",
                    instructions: "",
                    notes: "",
                    isFinished: false,
                    finishedAt: new Date(),
                  })
                }
                className="flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Item
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="p-4 space-y-4 bg-gray-100">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Item {field.sequenceNumber}</h4>
                  {fields.length - 1 === index && (
                    <ShadcnButton
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </ShadcnButton>
                  )}
                </div>

                <div className="flex gap-2">
                  {" "}
                  <div className="space-y-2 flex-1">
                    <Controller
                      name={`periodActionPlanItems.${index}.task`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          variant="modal"
                          required
                          name={`periodActionPlanItems.${index}.task`}
                          error={errors.periodActionPlanItems?.[index]?.task?.message}
                          placeholder="O que fazer?"
                          maxLength={60}
                          value={value}
                          onChange={(value) => onChange(value)}
                        />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.task && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].task?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <Controller
                      name={`periodActionPlanItems.${index}.assignee`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Quem?"
                          variant="modal"
                          id={`assignee-${index}`}
                          {...field}
                          required
                        />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.assignee && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].assignee?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {" "}
                  <div className="space-y-2 flex-1">
                    <Controller
                      name={`periodActionPlanItems.${index}.dueDate`}
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          placeholder="Quando?"
                        />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.dueDate && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].dueDate?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <Controller
                      name={`periodActionPlanItems.${index}.reason`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          variant="modal"
                          required
                          error={errors.periodActionPlanItems?.[index]?.reason?.message}
                          placeholder="Porquê?"
                          maxLength={60}
                          {...field}
                        />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.reason && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].reason?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`instructions-${index}`}>Como fazer?</Label>
                  <Controller
                    name={`periodActionPlanItems.${index}.instructions`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id={`instructions-${index}`}
                        {...field}
                        required
                        className="bg-white"
                      />
                    )}
                  />
                  {errors.periodActionPlanItems?.[index]?.instructions && (
                    <p className="text-red-500">
                      {errors.periodActionPlanItems[index].instructions?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`notes-${index}`}>Observações</Label>
                  <Controller
                    name={`periodActionPlanItems.${index}.notes`}
                    control={control}
                    render={({ field }) => <TextArea id={`notes-${index}`} {...field} />}
                  />
                </div>

                <div className="flex gap-2">
                  {" "}
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
                      name={`periodActionPlanItems.${index}.isFinished`}
                      defaultValue={false}
                      render={({ field: { onChange, value } }) => (
                        <Switch checked={value} onCheckedChange={onChange} />
                      )}
                    />
                  </div>
                  {watch(`periodActionPlanItems.${index}.isFinished`) && (
                    <div className="w-full">
                      <Controller
                        control={control}
                        name={`periodActionPlanItems.${index}.finishedAt`}
                        shouldUnregister={true}
                        render={({ field: { onChange, value } }) => (
                          <DatePickerInput
                            value={value}
                            placeholder="Finalizado em:"
                            onChange={(value) => onChange(value)}
                            error={
                              errors.periodActionPlanItems?.[index]?.finishedAt?.message
                            }
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            isLoading={isPending}
          >
            Salvar Plano de Ação
          </Button>
        </form>
      </div>
    </Modal>
  );
};
