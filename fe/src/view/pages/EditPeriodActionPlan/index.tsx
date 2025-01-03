import React from "react";
import { Controller } from "react-hook-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from "lucide-react";
import { Input } from "@/view/components/Input";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import TextArea from "antd/es/input/TextArea";
import { translateClassification } from "@/app/utils/translateClassification";
import { translateRepairClassification } from "@/app/utils/translateRepairClassification";
import { RepairClassification } from "@/app/entities/RepairClassification";
import { Button } from "@/view/components/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import { useEditPeriodActionPlan } from "./useEditPeriodActionPlan";
import { cn } from "@/app/utils/cn";
import { Switch } from "@/components/ui/switch";

export default function EditPeriodActionPlan(): React.ReactElement {
  const {
    append,
    control,
    errors,
    fields,
    handleSubmit,
    isPending,
    remove,
    equipment,
    repairClassification,
    rigName,
    watch,
  } = useEditPeriodActionPlan();
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 mix-blend-multiply" />
          <div className="relative z-10 p-6 text-white">
            <CardTitle className="text-2xl font-bold mb-2">
              Editar Plano de Ação
            </CardTitle>
            <p className="text-sm opacity-90">{`Equipamento: ${translateClassification(
              equipment!
            )}  ( ${translateRepairClassification(
              repairClassification as RepairClassification
            )})`}</p>
            <p className="text-sm opacity-90">Sonda: {rigName}</p>
          </div>
        </div>
        <CardContent className="p-6 bg-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
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

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Itens do Plano de Ação</h3>
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
                <Card key={field.id} className="p-4 space-y-4 bg-gray-300">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Item {field.sequenceNumber}</h4>
                    <ShadcnButton
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </ShadcnButton>
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
                        <TextArea id={`instructions-${index}`} {...field} required />
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
                      render={({ field }) => (
                        <TextArea id={`notes-${index}`} {...field} />
                      )}
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
        </CardContent>
      </Card>
    </div>
  );
}
