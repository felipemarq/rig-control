import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, XCircle } from "lucide-react";

import { Input } from "@/view/components/Input";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import TextArea from "antd/es/input/TextArea";
import { useLocation } from "react-router-dom";
import { translateClassification } from "@/app/utils/translateClassification";
import { translateRepairClassification } from "@/app/utils/translateRepairClassification";
import { RepairClassification } from "@/app/entities/RepairClassification";
import { formatDate } from "@/app/utils/formatDate";

interface HeaderInfo {
  equipment: string;
  repairClassification: string;
  date: string;
  well: string;
  rigName: string;
}

interface ActionPlanItem {
  sequenceNumber: number;
  task: string;
  assignee: string;
  dueDate: Date | null;
  reason: string;
  instructions: string;
  notes: string;
  isFinished: boolean;
}

interface ActionPlan {
  title: string;
  periodId: string;
  finishedAt: Date | null;
  isFinished: boolean;
  periodActionPlanItems: ActionPlanItem[];
}

// This would typically come from your app's state or route parameters

export default function PeriodActionPlan(): React.ReactElement {
  const [actionPlan, setActionPlan] = useState<ActionPlan>({
    title: "",
    periodId: "", // This would typically be set based on the pre-selected info
    finishedAt: null,
    isFinished: false,
    periodActionPlanItems: [
      {
        sequenceNumber: 1,
        task: "",
        assignee: "",
        dueDate: null,
        reason: "",
        instructions: "",
        notes: "",
        isFinished: false,
      },
    ],
  });

  const { state } = useLocation();

  const { equipment, repairClassification, date, well, rigName }: HeaderInfo = state;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newItems = [...actionPlan.periodActionPlanItems];
      newItems[index] = { ...newItems[index], [name]: value };
      setActionPlan({ ...actionPlan, periodActionPlanItems: newItems });
    } else {
      setActionPlan({ ...actionPlan, [name]: value });
    }
  };

  const handleDateChange = (date: Date | null, index: number | null = null) => {
    if (index !== null) {
      const newItems = [...actionPlan.periodActionPlanItems];
      newItems[index] = { ...newItems[index], dueDate: date };
      setActionPlan({ ...actionPlan, periodActionPlanItems: newItems });
    } else {
      setActionPlan({ ...actionPlan, finishedAt: date });
    }
  };

  const handleSwitchChange = (checked: boolean, index: number | null = null) => {
    if (index !== null) {
      const newItems = [...actionPlan.periodActionPlanItems];
      newItems[index] = { ...newItems[index], isFinished: checked };
      setActionPlan({ ...actionPlan, periodActionPlanItems: newItems });
    } else {
      setActionPlan({ ...actionPlan, isFinished: checked });
    }
  };

  const addActionItem = () => {
    setActionPlan({
      ...actionPlan,
      periodActionPlanItems: [
        ...actionPlan.periodActionPlanItems,
        {
          sequenceNumber: actionPlan.periodActionPlanItems.length + 1,
          task: "",
          assignee: "",
          dueDate: null,
          reason: "",
          instructions: "",
          notes: "",
          isFinished: false,
        },
      ],
    });
  };

  const removeActionItem = (index: number) => {
    const newItems = actionPlan.periodActionPlanItems.filter((_, i) => i !== index);
    setActionPlan({ ...actionPlan, periodActionPlanItems: newItems });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(actionPlan);
  };

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
              <Input
                variant="modal"
                id="title"
                name="title"
                value={actionPlan.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFinished"
                checked={actionPlan.isFinished}
                onCheckedChange={(checked) => handleSwitchChange(checked)}
              />
              <Label htmlFor="isFinished">Plano Finalizado</Label>
            </div>

            {actionPlan.isFinished && (
              <div className="space-y-2">
                <Label htmlFor="finishedAt">Data de Finalização</Label>
                <DatePickerInput
                  //value={value}
                  placeholder="Prazo da ação"
                  //onChange={(value) => onChange(value)}
                  //error={errors.dueDate?.message}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Itens do Plano de Ação</h3>
                <Button
                  type="button"
                  onClick={addActionItem}
                  className="flex items-center"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </div>

              {actionPlan.periodActionPlanItems.map((item, index) => (
                <Card key={index} className="p-4 space-y-4 bg-gray-300">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Item {item.sequenceNumber}</h4>
                    {actionPlan.periodActionPlanItems.length - 1 === index && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeActionItem(index)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`task-${index}`}>O que fazer?</Label>
                    <Input
                      variant="modal"
                      id={`task-${index}`}
                      name="task"
                      value={item.task}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`assignee-${index}`}>Quem?</Label>
                    <Input
                      variant="modal"
                      id={`assignee-${index}`}
                      name="assignee"
                      value={item.assignee}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dueDate-${index}`}>Quando?</Label>
                    <DatePickerInput
                      //value={value}
                      onChange={(value) => handleDateChange(value, index)}
                      placeholder="Prazo da ação"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`reason-${index}`}>Porquê?</Label>
                    <TextArea
                      id={`reason-${index}`}
                      name="reason"
                      value={item.reason}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`instructions-${index}`}>Como fazer?</Label>
                    <TextArea
                      id={`instructions-${index}`}
                      name="instructions"
                      value={item.instructions}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`notes-${index}`}>Observações</Label>
                    <TextArea
                      id={`notes-${index}`}
                      name="notes"
                      value={item.notes}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`isFinished-${index}`}
                      checked={item.isFinished}
                      onCheckedChange={(checked) => handleSwitchChange(checked, index)}
                    />
                    <Label htmlFor={`isFinished-${index}`}>Item Finalizado</Label>
                  </div>
                </Card>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Salvar Plano de Ação
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
