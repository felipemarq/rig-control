import { Modal } from "@/view/components/Modal";
import { useNewPeriodActionPlanModal } from "./useNewChecklistModal";
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
import { UploadFileModal } from "@/view/components/UploadFileModal";
import { Select } from "@/view/components/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for evaluation items
const evaluationItems = [
  { id: 1, numero: 1, area: "Segurança", desc: "Uso adequado de EPI", peso: 3 },
  { id: 2, numero: 2, area: "Segurança", desc: "Área de trabalho sinalizada", peso: 2 },
  { id: 3, numero: 3, area: "Operacional", desc: "Equipamentos em bom estado", peso: 3 },
  {
    id: 4,
    numero: 4,
    area: "Operacional",
    desc: "Procedimentos seguidos corretamente",
    peso: 4,
  },
];

export const NewChecklistModal = () => {
  const {
    isNewChecklistModalOpen,
    closeNewChecklistModal,
    append,
    remove,
    control,
    errors,
    watch,
    fields,
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
    primaryColor,
    evaluations,
    rigs,
  } = useNewPeriodActionPlanModal();

  if (isUploadingFile) {
    return (
      <UploadFileModal
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
      title="Criar Checklist"
      open={isNewChecklistModalOpen}
      onClose={closeNewChecklistModal}
      overflow
      maxWidth="1000px"
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

        <form onSubmit={() => alert("submit")} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.title?.message}
                    placeholder="Título"
                    maxLength={60}
                    variant="modal"
                    name="title"
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                control={control}
                name="rigId"
                defaultValue={undefined}
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={errors.rigId?.message}
                    placeholder="Sonda"
                    value={value}
                    onChange={onChange}
                    options={rigs.map(({ id, name }) => ({
                      value: id ?? "",
                      label: name ?? "",
                    }))}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name={`date`}
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Quando?"
                  />
                )}
              />
              {errors.date && <p className="text-red-500">{errors.date?.message}</p>}
            </div>

            <div>
              <Controller
                control={control}
                name="well"
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.well?.message}
                    placeholder="Poço"
                    maxLength={60}
                    variant="modal"
                    name="well"
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                control={control}
                name="supervisor"
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.supervisor?.message}
                    placeholder="Encarregado"
                    maxLength={60}
                    variant="modal"
                    name="supervisor"
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                control={control}
                name="team"
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.team?.message}
                    placeholder="Turma"
                    maxLength={60}
                    variant="modal"
                    name="team"
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-500 pt-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Itens de Avaliação
              </h3>
              <div className="space-y-6">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
                            {item.category}
                          </span>
                          <span className="text-sm text-gray-500">Item {index + 1}</span>
                        </div>
                        <div className="mt-2 block text-base font-medium text-gray-900">
                          {item.description}
                        </div>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex gap-2">
                        <span> Peso:</span> <span>{item.weight}</span>
                      </div>
                    </div>
                    <Controller
                      name={`evaluations.${index}.rating`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <RadioGroup
                          onValueChange={(val) => onChange(parseFloat(val))} // Converte para número
                          value={value?.toString()} // Garante que o value seja string
                          className="flex flex-wrap gap-2"
                        >
                          {[
                            { value: 0, label: 0 },
                            { value: 0.25, label: 1 },
                            { value: 0.5, label: 2 },
                            { value: 0.75, label: 3 },
                            { value: 1, label: 4 },
                          ].map((item) => (
                            <div key={item.value} className="relative">
                              <RadioGroupItem
                                value={item.value.toString()} // Garante que seja string
                                id={`radio-${index}-${item.value}`}
                                className="peer hidden"
                              />

                              <label
                                htmlFor={`radio-${index}-${item.value}`} // Corrigido para corresponder ao ID do input
                                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 "
                                style={{
                                  backgroundColor:
                                    item.value === value ? primaryColor : undefined,
                                  color: item.value === value ? "white" : undefined,
                                }}
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    />

                    <div className="mt-4 space-y-4">
                      <Controller
                        control={control}
                        name={`evaluations.${index}.comment`}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <TextArea
                            maxLength={5000}
                            style={{
                              height: 100,
                              resize: "vertical",
                              // border: "none",
                            }}
                            onChange={onChange}
                            className="bg-white borderpx-3  rounded-lg  border-gray-500  text-black w-full h-[52px] hover:border-primary placeholder:text-gray-800"
                            value={value}
                            //onChange={(e) => handleDescription(id, e.target.value)}
                            placeholder="Comentários. (Opcional)"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            isLoading={isPending}
          >
            Criar Checklist
          </Button>
        </form>
      </div>
    </Modal>
  );
};
