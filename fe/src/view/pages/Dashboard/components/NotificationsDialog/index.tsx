import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotificationDialogProps {
  isOpen: boolean;
  count: number;
}

export default function NotificationDialog({ count, isOpen }: NotificationDialogProps) {
  const [open, setOpen] = useState(isOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-800">Notificações Pendentes</DialogTitle>
          <DialogDescription>
            Você tem {count}{" "}
            {count === 1 ? "notificação pendente" : "notificações pendentes"}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-gray-700">
          <p>Por favor, verifique suas notificações para se manter atualizado.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
