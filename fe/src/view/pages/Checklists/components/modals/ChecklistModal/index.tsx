import { format } from "date-fns";
import { FileImage } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useChecklistsContext } from "../../ChecklistsContext/useChecklistsContext";

export const ChecklistModal = () => {
  const { isChecklistModalOpen, closeChecklistModal, checklistBeingSeen } =
    useChecklistsContext();

  return (
    <Dialog open={isChecklistModalOpen} onOpenChange={closeChecklistModal}>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen bg-white"}
      >
        <DialogHeader>
          <DialogTitle className="text-black">
            {checklistBeingSeen?.title}
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="relative">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-black">
              <div>
                <h3 className="font-semibold">Data</h3>
                <p>{format(checklistBeingSeen?.date!, "dd/MM/yyyy")}</p>
              </div>
              <div>
                <h3 className="font-semibold">Sonda</h3>
                <p>{checklistBeingSeen?.rig.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Poço</h3>
                <p>{checklistBeingSeen?.well.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Encarregado</h3>
                <p>{checklistBeingSeen?.supervisor}</p>
              </div>
              <div>
                <h3 className="font-semibold">Turma</h3>
                <p>{checklistBeingSeen?.team}</p>
              </div>
              <div>
                <h3 className="font-semibold">Pontuação Total</h3>
                <p>{checklistBeingSeen?.score}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-semibold mb-4">Itens Avaliados</h3>
            <Table className="text-black">
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Pontuação</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead>Evidência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistBeingSeen?.evaluations.map((item, index) => (
                  <TableRow key={item.id} className="h-24">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {item.checklistItem.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-20">
                      {item.checklistItem.description}
                    </TableCell>
                    <TableCell>{item.checklistItem.weight}</TableCell>
                    <TableCell>{item.score}</TableCell>
                    <TableCell className="min-w-20">
                      {item.comment || "-"}
                    </TableCell>
                    <TableCell>
                      {item.files && item.files?.length! > 0 ? (
                        <a
                          href={item.files[0].path}
                          target="_blank"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                        >
                          <FileImage className="mr-2 h-4 w-4" />
                          Ver Evidência
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
