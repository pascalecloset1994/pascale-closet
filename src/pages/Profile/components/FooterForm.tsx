import { Image, ImageUp, MapPin, Clock, Type } from "lucide-react";
import { useRef } from "react";

interface FooterFormProps {
  formData: {
    title: string;
    location: string;
    schedule: string;
    footerUrlImage: string | File;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  footerImagePreview: string | null;
}

export const FooterForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleChangeImage,
  footerImagePreview,
}: FooterFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className="md:border-t border-[#E0D6CC] md:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white md:border border-[#E0D6CC] md:p-6 p-4"
        >
          <h3 className="text-xs font-sans-elegant font-medium text-[#2C2420] mb-6 uppercase tracking-wider flex items-center gap-2">
            <Image size={16} className="text-[#7A6B5A]" />
            Sección Footer del Sitio
          </h3>

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Type size={14} />
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Visítanos en nuestra tienda"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <MapPin size={14} />
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Santiago, Chile"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Clock size={14} />
                Horario
              </label>
              <input
                type="text"
                name="schelude"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Ej: Lunes a Viernes de 9:00 a 18:00"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2">
                Vista Previa del Footer
              </label>
              <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                  {(footerImagePreview || formData.footerUrlImage) ? (
                    <img
                      src={footerImagePreview || (typeof formData.footerUrlImage === 'string' ? formData.footerUrlImage : '')}
                      alt="Footer Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2C2420] rounded" />
                  )}
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-3xl md:text-5xl uppercase font-serif-display text-white mb-4 tracking-wide">
                    {formData.title || "Visítanos"}
                  </h2>
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <MapPin size={16} />
                    <p className="font-sans-elegant text-sm">
                      {formData.location || "Santiago, Chile"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock size={16} />
                    <p className="font-sans-elegant text-sm">
                      {formData.schedule || "Lunes a Viernes de 9:00 a 18:00"}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-6 gap-2 flex flex-col">
            <small>SUBIR ARCHIVO</small>
            <span
              onClick={() => inputRef.current!.click()}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200 cursor-pointer"
            >
              <ImageUp size={20} />
              Cargar Imagen Footer
            </span>
            <input
              ref={inputRef}
              type="file"
              onChange={handleChangeImage}
              accept="image/*"
              className="hidden"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200"
            >
              Modificar Footer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
