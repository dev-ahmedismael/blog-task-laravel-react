import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
export default function CustomDialog({
  open,
  title,
  onClose,
  children,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
