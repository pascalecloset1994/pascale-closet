import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { Loader2 } from "lucide-react";
import Input from "../../components/common/Input";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, login, isLoading, error, refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";

    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await login({ email: formData.email, password: formData.password });
    setTimeout(async() => {
      await refreshUser()
    }, 300)
  };

  if (user !== null && user && user.role === "seller") {
    return navigate("/seller/dashboard");
  } else if (user && user.role === "buyer") {
    return navigate("/buyer/orders");
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E0D6CC] p-10">
          <div className="text-center mb-10">
            <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-[#7A6B5A] mb-3">
              Bienvenida
            </p>
            <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-3">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant">
              Accede a tu cuenta de Pascale Closet
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="w-full flex text-[#2C2420] p-3 bg-[#F5F0EB] border border-[#E0D6CC] justify-center mb-6 font-sans-elegant text-sm">
                {error}
              </div>
            )}
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-[#7A6B5A] hover:text-[#2C2420] font-sans-elegant transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300 mb-6"
            >
              {isLoading ? (
                <span className="flex gap-2 items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                  Iniciando
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="text-[#2C2420] hover:underline font-medium"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
