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
import { formatDate } from "@/app/utils/formatDate";
import { Button } from "@/view/components/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import { usePeriodActionPlan } from "./usePeriodActionPlan";

export default function PeriodActionPlan(): React.ReactElement {
  const {
    append,
    control,
    errors,
    fields,
    handleSubmit,
    isPending,
    remove,
    date,
    equipment,
    repairClassification,
    rigName,
  } = usePeriodActionPlan();
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 mix-blend-multiply" />
          <div className="relative z-10 p-6 text-white">
            <CardTitle className="text-2xl font-bold mb-2">Novo Plano de Ação</CardTitle>
            <p className="text-sm opacity-90">{`Equipamento: ${translateClassification(
              equipment
            )}  ( ${translateRepairClassification(
              repairClassification as RepairClassification
            )})`}</p>
            <p className="text-sm opacity-90">Sonda: {rigName}</p>
            <p className="text-sm opacity-90">Data: {formatDate(new Date(date))}</p>
          </div>
        </div>
        <CardContent className="p-6 bg-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Plano de Ação</Label>
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
                  {/*  <Controller
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
                  /> */}

                  <div className="space-y-2">
                    <Label htmlFor={`task-${index}`}>O que fazer?</Label>
                    <Controller
                      name={`periodActionPlanItems.${index}.task`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          variant="modal"
                          required
                          name={`periodActionPlanItems.${index}.task`}
                          error={errors.periodActionPlanItems?.[index]?.task?.message}
                          placeholder=""
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

                  <div className="space-y-2">
                    <Label htmlFor={`assignee-${index}`}>Quem?</Label>
                    <Controller
                      name={`periodActionPlanItems.${index}.assignee`}
                      control={control}
                      render={({ field }) => (
                        <Input
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

                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Quando?</Label>
                    <Controller
                      name={`periodActionPlanItems.${index}.dueDate`}
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          placeholder="Prazo da ação"
                        />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.dueDate && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].dueDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`reason-${index}`}>Porquê?</Label>
                    <Controller
                      name={`periodActionPlanItems.${index}.reason`}
                      control={control}
                      render={({ field }) => (
                        <TextArea id={`reason-${index}`} {...field} required />
                      )}
                    />
                    {errors.periodActionPlanItems?.[index]?.reason && (
                      <p className="text-red-500">
                        {errors.periodActionPlanItems[index].reason?.message}
                      </p>
                    )}
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
