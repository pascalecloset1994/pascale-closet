import { CheckCircle, AlertCircle, Package, Truck, Clock } from "lucide-react"

export const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#F0FFF0] border-[#2C2420] text-[#2C2420]";
      case "pending":
        return "bg-[#FFF9E6] border-[#2C2420] text-[#2C2420]";
      case "cancelled":
      case "Cancelado":
        return "bg-[#FFF0F0] border-[#2C2420] text-[#2C2420]";
      case "En Tránsito":
        return "bg-[#F5F0EB] border-[#2C2420] text-[#2C2420]";
      default:
        return "bg-[#F5F0EB] border-[#E0D6CC] text-[#7A6B5A]";
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