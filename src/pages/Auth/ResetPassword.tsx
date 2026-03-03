import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, Lock, CheckCircle } from "lucide-react";
import Input from "../../components/common/Input";
import { useAuth } from "../../contexts/AuthContext";

export const ResetPassword = () => {
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(formData.password);
      setIsSubmitted(true);
    } catch (err: unknown) {
      newErrors.resetPassword = err instanceof Error ? err.message : "Error desconocido";
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E0D6CC] p-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-10">
                <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-[#7A6B5A] mb-3">
                  Restablecer Acceso
                </p>
                <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-3">
                  Nueva Contraseña
                </h1>
                <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                  Ingresa y confirma tu nueva contraseña para restablecer el
                  acceso a tu cuenta.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  type="password"
                  name="password"
                  label="Nueva Contraseña"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />

                {formData.password &&
                  formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-600 font-sans-elegant mb-4 flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      Las contraseñas coinciden
                    </p>
                  )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex gap-2 items-center justify-center">
                      <Loader2 size={18} className="animate-spin" />
                      Restableciendo
                    </span>
                  ) : (
                    "Restablecer Contraseña"
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-[#7A6B5A] hover:text-[#2C2420] font-sans-elegant transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Volver a Iniciar Sesión
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#F5F0EB] flex items-center justify-center mx-auto mb-6">
                <Lock size={28} className="text-[#8B7355]" />
              </div>
              <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-[#7A6B5A] mb-3">
                Contraseña Actualizada
              </p>
              <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
                ¡Todo listo!
              </h2>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-8">
                Tu contraseña ha sido restablecida correctamente. Ya puedes
                iniciar sesión con tu nueva contraseña.
              </p>

              <Link
                to="/login"
                className="inline-block w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
