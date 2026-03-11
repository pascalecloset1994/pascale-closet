import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/common/Input";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, "El nombre solo puede contener letras"),
  lastName: z.string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, "El apellido solo puede contener letras"),
  email: z.string()
    .min(1, "El email es requerido")
    .email("Ingresa un email válido")
    .max(100, "El email no puede exceder 100 caracteres"),
  password: z.string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string()
    .min(1, "Debes confirmar la contraseña"),
  role: z.enum(["buyer", "seller"]),
  acceptTerms: z.literal(true, "Debes aceptar los términos y condiciones"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading, refreshUser, error, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    try {
      registerSchema.parse(formData);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          if (field && !newErrors[field]) {
            newErrors[field] = err.message;
          }
        });
        return newErrors;
      }
      return {};
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...sendData } = formData;
    
    await register({ ...sendData, lastname: sendData.lastName });
    await refreshUser();
  };

  if (user !== null && user.role === "seller") {
    navigate("/seller/dashboard");
    return null;
  } else if (user && user.role === "buyer") {
    navigate("/buyer/orders");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-card border border-border p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Únete
            </p>
            <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-3">
              Crear Cuenta
            </h1>
            <p className="text-sm text-muted-foreground font-sans-elegant">
              Únete a la comunidad de Pascale Closet
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="w-full flex text-foreground p-3 bg-secondary border border-border justify-center mb-6 font-sans-elegant text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                label="Nombre"
                placeholder="María"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="García"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>

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

            <Input
              type="password"
              name="confirmPassword"
              label="Repetir Contraseña"
              placeholder="••••••••"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            {/* Tipo de cuenta */}
            <div className="mb-6">
              <label className="block text-xs font-sans-elegant font-medium mb-3 text-foreground tracking-wide uppercase">
                Tipo de cuenta <span className="text-foreground">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-border hover:border-foreground cursor-pointer transition-colors duration-200">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                    className="mr-3 accent-[#2C2420]"
                  />
                  <span className="text-sm font-sans-elegant text-foreground">
                    👗 Compradora - Quiero comprar prendas
                  </span>
                </label>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mr-3 mt-1 accent-[#2C2420]"
                />
                <span className="text-xs text-muted-foreground font-sans-elegant leading-relaxed">
                  Acepto los{" "}
                  <Link to="/terms" className="text-foreground hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-foreground hover:underline">
                    política de privacidad
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-foreground text-xs mt-2 font-sans-elegant">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-background dark:text-zinc-900 font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300 mb-6"
            >
              {isLoading ? (
                <span className="flex gap-2 items-center justify-center">
                  <Loader2 size={18} className="animate-spin" />
                  Creando
                </span>
              ) : (
                "Crear Cuenta"
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-sans-elegant">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-foreground hover:underline font-medium"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
