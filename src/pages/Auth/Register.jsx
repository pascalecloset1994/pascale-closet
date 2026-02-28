import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/common/Input";
import { Loader2 } from "lucide-react";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [errors, setErrors] = useState({});
  const { register, isLoading, refreshUser, error, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
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
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    await register(formData);
    await refreshUser();
  };

  if (user !== null && user.role === "seller") {
    return navigate("/seller/dashboard");
  } else if (user && user.role === "buyer") {
    return navigate("/buyer/orders");
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E0D6CC] p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-[#7A6B5A] mb-3">
              Únete
            </p>
            <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-3">
              Crear Cuenta
            </h1>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant">
              Únete a la comunidad de Pascale Closet
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="w-full flex text-[#2C2420] p-3 bg-[#F5F0EB] border border-[#E0D6CC] justify-center mb-6 font-sans-elegant text-sm">
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
              error={errors.password}
              required
            />

            {/* Tipo de cuenta */}
            <div className="mb-6">
              <label className="block text-xs font-sans-elegant font-medium mb-3 text-[#2C2420] tracking-wide uppercase">
                Tipo de cuenta <span className="text-[#2C2420]">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-[#E0D6CC] hover:border-[#2C2420] cursor-pointer transition-colors duration-200">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                    className="mr-3 accent-[#2C2420]"
                  />
                  <span className="text-sm font-sans-elegant text-[#2C2420]">
                    👗 Compradora - Quiero comprar prendas
                  </span>
                </label>
                <label className="flex items-center p-3 border border-[#E0D6CC] hover:border-[#2C2420] cursor-pointer transition-colors duration-200">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={handleChange}
                    className="mr-3 accent-[#2C2420]"
                  />
                  <span className="text-sm font-sans-elegant text-[#2C2420]">
                    ✨ Vendedora - Quiero vender prendas
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
                <span className="text-xs text-[#7A6B5A] font-sans-elegant leading-relaxed">
                  Acepto los{" "}
                  <Link to="/terms" className="text-[#2C2420] hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-[#2C2420] hover:underline">
                    política de privacidad
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-[#2C2420] text-xs mt-2 font-sans-elegant">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300 mb-6"
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
              <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-[#2C2420] hover:underline font-medium"
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
