import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import Input from "../../components/common/Input";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "../../components/common/Toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { recoveryPassword, isLoading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { success } = await recoveryPassword(email);

      if (!success) {
        toast({ message: error });
        return;
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrors({ email: err instanceof Error ? err.message : "Error desconocido" });
    } 
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-card border border-border p-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-10">
                <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Recuperar Acceso
                </p>
                <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-3">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-sm text-muted-foreground font-sans-elegant">
                  Ingresa tu correo electrónico y te enviaremos un enlace para
                  restablecer tu contraseña.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-foreground text-background font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex gap-2 items-center justify-center">
                      <Loader2 size={18} className="animate-spin" />
                      Enviando
                    </span>
                  ) : (
                    "Enviar enlace de recuperación"
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-sans-elegant transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Volver a Iniciar Sesión
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-6">
                <Mail size={28} className="text-primary" />
              </div>
              <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Correo Enviado
              </p>
              <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                Revisa tu bandeja de entrada
              </h2>
              <p className="text-sm text-muted-foreground font-sans-elegant mb-2">
                Hemos enviado un enlace de recuperación a:
              </p>
              <p className="text-sm text-foreground font-sans-elegant font-medium mb-8">
                {email}
              </p>
              <p className="text-xs text-muted-foreground font-sans-elegant mb-8">
                Si no recibes el correo en unos minutos, revisa tu carpeta de
                spam o intenta nuevamente.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full py-4 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Intentar con otro correo
                </button>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground font-sans-elegant transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver a Iniciar Sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
