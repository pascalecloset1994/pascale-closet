import { Tag, Ticket } from "lucide-react";
import { Switch } from "../../../components/common/Switch";
import { type ChangeEvent, type FormEvent } from "react";
import type { DiscountContentProps } from "../../../types/global";

interface DiscountFormProps {
  formData: DiscountContentProps;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChecked: (checked: boolean) => void;
  isLoading?: boolean;
}

export const DiscountForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleChecked,
  isLoading = false,
}: DiscountFormProps) => {
  return (
    <div>
      <div className="md:border-t border-border md:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-card md:border border-border md:p-6 p-4"
        >
          <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-6 uppercase tracking-wider flex items-center gap-2">
            <Tag size={16} className="text-muted-foreground" />
            Personalizar Tarjeta de Descuento
          </h3>

          <div className="grid grid-cols-1 gap-5">
            <div className="bg-background p-4 rounded flex items-center justify-between border border-border">
              <div>
                <label className="block text-xs font-sans-elegant text-foreground font-bold uppercase tracking-wide mb-1">
                  Activar Descuento
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Habilita o deshabilita la visualización del cupón
                </p>
              </div>
              <Switch
                checked={formData.discount_is_active}
                setChecked={(val) => handleChecked(Boolean(val))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Ticket size={14} />
                  Porcentaje (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="Ej: 10"
                  className="w-full px-4 py-3 border border-border bg-card font-sans-elegant text-foreground focus:border-foreground focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2">
                  Descripción Corta
                </label>
                <input
                  type="text"
                  name="discount_description"
                  value={formData.discount_description}
                  onChange={handleChange}
                  placeholder="Ej: En tu primera compra"
                  className="w-full px-4 py-3 border border-border bg-card font-sans-elegant text-foreground focus:border-foreground focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-4 mt-2">
                Vista Previa del Cupón
              </label>
              
              <div className="relative w-full max-w-md mx-auto overflow-hidden">
                <div className={`
                  relative bg-foreground text-background p-6 
                  border-t-4 border-[#C4A574] 
                  shadow-xl transition-all duration-300
                  ${!formData.discount_is_active ? 'opacity-50 grayscale' : 'opacity-100'}
                `}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#C4A574]/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#C4A574]/10 rounded-tr-full"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="shrink-0">
                      <div className="w-20 h-20 rounded-full border-2 border-[#C4A574] flex items-center justify-center bg-foreground">
                        <span className="text-2xl font-serif-display font-bold text-[#C4A574]">
                          {formData.discount || 0}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-[#C4A574] text-[10px] uppercase tracking-[0.2em] font-sans-elegant mb-1">
                        Oferta Especial
                      </p>
                      <h3 className="text-xl font-serif-display tracking-wide uppercase mb-1">
                        Descuento
                      </h3>
                      <p className="text-white/70 text-xs font-sans-elegant">
                        {formData.discount_description || "Descripción del descuento"}
                      </p>
                    </div>

                    <div className="shrink-0 mt-2 sm:mt-0">
                      <span className="px-4 py-2 bg-[#C4A574] text-foreground text-[10px] font-bold uppercase tracking-wider inline-block">
                        Obtener
                      </span>
                    </div>
                  </div>
                </div>
                
                {!formData.discount_is_active && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/70 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                      Descuento Inactivo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-foreground text-background font-sans-elegant text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
