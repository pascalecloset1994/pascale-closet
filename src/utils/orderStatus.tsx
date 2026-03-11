import { CheckCircle, AlertCircle, Package, Truck, Clock } from "lucide-react"

export const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-foreground text-foreground";
      case "pending":
        return "bg-yellow-50 border-foreground text-foreground";
      case "cancelled":
      case "Cancelado":
        return "bg-red-50 border-foreground text-foreground";
      case "En Tránsito":
        return "bg-secondary border-foreground text-foreground";
      default:
        return "bg-secondary border-border text-muted-foreground";
    }
  };

  export const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="mr-2" />;
      case "pending":
        return <Clock size={16} className="mr-2" />;
      case "cancelled":
      case "Cancelado":
        return <AlertCircle size={16} className="mr-2" />;
      case "En Tránsito":
        return <Truck size={16} className="mr-2" />;
      default:
        return <Package size={16} className="mr-2" />;
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