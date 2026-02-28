import { Image } from "lucide-react";
import { ImageUp } from "lucide-react";
import { useRef } from "react";

interface FrontPageHeroProps {
  formData: {
    heroCollection: string;
    heroTitle: string;
    heroSubTitle: string;
    heroUrlImage: string | File;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  heroImagePreview: string | null;
}

export const FrontPageForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleChangeImage,
  heroImagePreview,
}: FrontPageHeroProps) => {
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
            Portada Inicial del sitio
          </h3>

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2">
                Colección
              </label>
              <input
                type="text"
                name="heroCollection"
                value={formData.heroCollection}
                onChange={handleChange}
                placeholder="Ej: Colección 2026, Colección Verano 2026"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2">
                Título Principal
              </label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                placeholder="El título principal del hero"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2">
                Sub Título
              </label>
              <input
                type="text"
                name="heroSubTitle"
                value={formData.heroSubTitle}
                onChange={handleChange}
                placeholder="Ej: Descubrí las últimas tendencias en moda femenina"
                className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-elegant text-[#7A6B5A] uppercase tracking-wide mb-2">
                Imagen Portada
              </label>
              <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={heroImagePreview || (typeof formData.heroUrlImage === 'string' ? formData.heroUrlImage : '')}
                    alt="Pascale Closet Collection"
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                  <p className="text-white/90 font-sans-elegant text-xs tracking-[0.4em] uppercase mb-4">
                    {formData.heroCollection || "Colección 2026"}
                  </p>
                  <h1 className="text-4xl md:text-6xl uppercase lg:text-7xl font-serif-display text-white mb-6 tracking-wide">
                    {formData.heroTitle || "Nueva Temporada"}
                  </h1>
                  <p className="text-white/80 font-sans-elegant text-sm md:text-base mb-8 max-w-md">
                    {formData.heroSubTitle ||
                      "Descubrí las últimas tendencias en moda femenina"}
                  </p>
                  <span className="px-8 py-3 bg-white text-[#2C2420] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#F5E6E0] transition-all duration-300 cursor-default">
                    Ver Colección
                  </span>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-6 gap-2 flex flex-col">
            <small>SUBIR ARCHIVO</small>
            <span
              onClick={() => inputRef.current!.click()}
              className="flex items-center justify-center gap-3 w-full sm:w-autopx-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200 cursor-default"
            >
              <ImageUp size={20} />
              Cargar Imagen
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
              Modificar Portada
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
