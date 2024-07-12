import { Modal } from "@/view/components/Modal";
import { useEditOccurrenceModal } from "./useEditOccurrenceModal";
import { Button } from "@/view/components/Button";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { TimePicker } from "antd";
import { Select } from "@/view/components/Select";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

export const EditOccurrenceModal = () => {
  const {
    closeEditOccurrenceModal,
    isEditOccurrenceModalOpen,
    isFetchingBases,
    bases,
    handleSubmit,
    occurrenceTypeSelectOptions,
    natureSelectOptions,
    control,
    handleHourChange,
    errors,
    isLoadingNewOccurrence,
    selectedHour,
  } = useEditOccurrenceModal();

  return (
    <Modal
      title="Ocorrência"
      open={isEditOccurrenceModalOpen}
      onClose={closeEditOccurrenceModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-full">
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <DatePickerInput
                    value={value}
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
                defaultValue={dayjs(selectedHour, "HH:mm")}
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
            <div className="w-full">
              <Controller
                control={control}
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
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Controller
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
            <div className="w-full">
              <Controller
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
          </div>

          <Controller
            control={control}
            name="description"
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
