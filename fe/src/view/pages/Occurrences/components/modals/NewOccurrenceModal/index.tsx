import { Modal } from "@/view/components/Modal";
import { useNewOccurrenceModal } from "./useNewOccurrenceModal";
import { Button } from "@/view/components/Button";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { TimePicker } from "antd";
import { Select } from "@/view/components/Select";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";
import { FileUp, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { UF } from "@/app/entities/Rig";

export const NewOccurrenceModal = () => {
  const {
    closeNewOccurrenceModal,
    isNewOccurrenceModalOpen,
    isFetchingBases,
    bases,
    handleSubmit,
    occurrenceTypeSelectOptions,
    natureSelectOptions,
    control,
    handleHourChange,
    errors,
    isLoadingNewOccurrence,
    handleFileSelected,
    handleDragOver,
    handleDrop,
    isDragging,
    file,
    handleDragLeave,
  } = useNewOccurrenceModal();

  return (
    <Modal
      title="Novo registro"
      open={isNewOccurrenceModalOpen}
      onClose={closeNewOccurrenceModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-full">
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange } }) => (
                  <DatePickerInput
                    //value={value}
                    onChange={(value) => onChange(value)}
                    error={errors.date?.message}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <TimePicker
                placeholder="Hora do ocorrido"
                className="bg-white border px-3 border-gray-500 rounded-lg  text-black w-full h-[52px] hover:border-primary"
                //defaultValue={dayjs("00:00", "HH:mm")}
                onChange={(_time, timeString) =>
                  handleHourChange(timeString as string)
                }
                format={"HH:mm"}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Controller
                control={control}
                name="type"
                defaultValue={undefined}
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={errors.type?.message}
                    placeholder="Tipo"
                    value={value}
                    isLoading={isFetchingBases}
                    onChange={onChange}
                    options={occurrenceTypeSelectOptions}
                  />
                )}
              />
            </div>
            <div className="w-full flex gap-2">
              <div className="flex-1">
                <Controller
                  control={control}
                  defaultValue=""
                  name="baseId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      error={errors.baseId?.message}
                      placeholder="Base"
                      value={value}
                      isLoading={isFetchingBases}
                      onChange={onChange}
                      options={bases.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                    />
                  )}
                />
              </div>

              <div className="flex-1">
                <Controller
                  control={control}
                  defaultValue={UF.BA}
                  name="state"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value}
                      placeholder="Estado"
                      onChange={onChange}
                      options={Object.values(UF).map((uf) => ({
                        value: uf,
                        label: uf,
                      }))}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Controller
                defaultValue={undefined}
                control={control}
                name="nature"
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={errors.nature?.message}
                    placeholder="Natureza"
                    value={value}
                    isLoading={isFetchingBases}
                    onChange={onChange}
                    options={natureSelectOptions}
                  />
                )}
              />
            </div>
            <div className="w-full flex gap-2">
              <div className="flex-1">
                <Controller
                  defaultValue=""
                  control={control}
                  name="isAbsent"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      error={errors.isAbsent?.message}
                      placeholder="Com afastamento"
                      value={value}
                      isLoading={isFetchingBases}
                      onChange={onChange}
                      options={[
                        {
                          value: "true",
                          label: "Sim",
                        },
                        {
                          value: "false",
                          label: "Não",
                        },
                      ]}
                    />
                  )}
                />
              </div>

              <div className="flex-1">
                <Controller
                  defaultValue=""
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      error={errors.category?.message}
                      placeholder="Classificação"
                      value={value}
                      isLoading={isFetchingBases}
                      onChange={onChange}
                      options={[
                        {
                          value: "TOR",
                          label: "TOR",
                        },
                        {
                          value: "TAR",
                          label: "TAR",
                        },
                        {
                          value: " ",
                          label: "Sem classificação",
                        },
                      ]}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextArea
                maxLength={5000}
                style={{
                  height: 200,
                  resize: "vertical",
                  // border: "none",
                }}
                onChange={onChange}
                className="bg-white borderpx-3  rounded-lg  border-gray-500  text-black w-full h-[52px] hover:border-primary placeholder:text-gray-800"
                value={value}
                //onChange={(e) => handleDescription(id, e.target.value)}
                placeholder="Descrição do ocorrido"
              />
            )}
          />

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

        <Button
          type="submit"
          className="w-full mt-6"
          isLoading={isLoadingNewOccurrence}
        >
          Criar
        </Button>
      </form>
    </Modal>
  );
};
