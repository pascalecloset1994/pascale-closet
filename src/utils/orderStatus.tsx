import { CheckCircle, AlertCircle, Package, Truck, Clock, XCircle } from "lucide-react"

export const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-300 border-foreground text-foreground dark:text-green-600";
      case "En Tránsito":
        return "bg-secondary border-foreground text-foreground";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-200 border-foreground text-foreground dark:text-yellow-600";
      case "cancelled":
        return "bg-red-100 dark:bg-red-200 border-foreground text-foreground dark:text-red-600";
      default:
        return "bg-secondary border-border text-muted-foreground";
    }
  };

   export const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1">
            <CheckCircle size={14} /> Pago aprobado
          </span>
        );
      case "En Tránsito":
        return (
          <span className="flex items-center gap-1">
            <Truck size={14} /> En Tránsito
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1">
            <Clock size={14} /> Pendiente de pago
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1">
            <XCircle size={14} /> Pago Cancelado
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1">
            <Package size={14} />
          </span>
        );
    }
  };

  export const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Pago Aprobado";
      case "pending":
        return "Pendiente de Pago";
      case "cancelled":
      case "Cancelado":
        return "Cancelado";
      case "En Tránsito":
        return "En Tránsito";
      default:
        return status;
    }
  };