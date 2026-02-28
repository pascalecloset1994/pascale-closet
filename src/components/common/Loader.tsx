import { useEffect } from "react";

export const Loader = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [])
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#E0D6CC] border-t-[#2C2420] rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-[#7A6B5A] font-sans-elegant tracking-wider uppercase text-xs">Cargando...</p>
      </div>
    </div>
  );
};
