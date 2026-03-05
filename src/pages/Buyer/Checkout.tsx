import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Loader2, TruckElectricIcon, Tag } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export const Checkout = () => {
  const { user } = useAuth();
  const {
    cartItems,
    getCartTotal,
    clearCart,
    handlePayment,
    loadingPayment,
    SHIPMENT_COST,
    MAX_PAYMENT,
    discountContent,
  } = useCart();
  const { updatePartialInformation } = useUser();

  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    // Shipping Info
    firstName: user?.name || "",
    lastName: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: "",
    zipCode: user?.postal_code || "",
    country: user?.country || "",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateShipping = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Requerido";
    if (!formData.email.trim()) newErrors.email = "Requerido";
    if (!formData.phone.trim()) newErrors.phone = "Requerido";
    if (!formData.address.trim()) newErrors.address = "Requerido";
    if (!formData.city.trim()) newErrors.city = "Requerido";
    if (!formData.state.trim()) newErrors.state = "Requerido";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Requerido";
    return newErrors;
  };

  const validatePayment = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Requerido";
    if (!formData.cardName.trim()) newErrors.cardName = "Requerido";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Requerido";
    if (!formData.cvv.trim()) newErrors.cvv = "Requerido";
    return newErrors;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const newErrors = validateShipping();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(2);

      if (!formData.address || !formData.phone || !formData.state) {
        updatePartialInformation(formData);
      }
    } else if (step === 2) {
      const newErrors = validatePayment();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/order-confirmation", {
      state: {
        orderNumber: Math.floor(Math.random() * 1000000),
        total: (getCartTotal() * 1.1).toFixed(2),
      },
    });
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8 text-center">
          Finalizar Compra
        </h1>

        {/* Progress Steps */}
        <div className="bg-white border border-[#E0D6CC] p-6 mb-8">
          <div className="flex justify-between items-center">
            <div
              className={`flex-1 text-center ${step >= 1 ? "text-[#2C2420]" : "text-[#C5C5C5]"
                }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${step >= 1
                    ? "bg-[#2C2420] border-[#2C2420] text-white"
                    : "border-[#E0D6CC] text-[#7A6B5A]"
                  } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                1
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">
                Envío
              </p>
            </div>
            <div
              className={`flex-1 h-px ${step >= 2 ? "bg-[#2C2420]" : "bg-[#E0D6CC]"
                }`}
            ></div>
            <div
              className={`flex-1 text-center ${step >= 2 ? "text-[#2C2420]" : "text-[#C5C5C5]"
                }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${step >= 2
                    ? "bg-[#2C2420] border-[#2C2420] text-white"
                    : "border-[#E0D6CC] text-[#7A6B5A]"
                  } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                2
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">
                Pago
              </p>
            </div>
            <div
              className={`flex-1 h-px ${step >= 3 ? "bg-[#2C2420]" : "bg-[#E0D6CC]"
                }`}
            ></div>
            <div
              className={`flex-1 text-center ${step >= 3 ? "text-[#2C2420]" : "text-[#C5C5C5]"
                }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${step >= 3
                    ? "bg-[#2C2420] border-[#2C2420] text-white"
                    : "border-[#E0D6CC] text-[#7A6B5A]"
                  } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                3
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">
                Revisar
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E0D6CC] p-8">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">
                    Información de Envío
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="Nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      name="lastName"
                      label="Apellido"
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
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    name="phone"
                    label="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                  <Input
                    name="address"
                    label="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      label="Ciudad"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                    />
                    <Input
                      name="state"
                      label="Departamento"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="zipCode"
                      label="Código Postal"
                      value={formData.zipCode}
                      onChange={handleChange}
                      error={errors.zipCode}
                      required
                    />
                    <Input
                      name="country"
                      label="País"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleNextStep}
                    className="w-full mt-4"
                  >
                    Continuar al Pago
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">
                    Método de Pago
                  </h2>

                  <div id="wallet_container" className="my-4">
                    <button
                      onClick={() => handlePayment({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country,
                      })}
                      className="w-full py-2 text-black font-semibold font-sans-elegant text-xs tracking-[0.15em] uppercase border outline-border outline-offset-2 hover:bg-[#FFE600] hover:outline transition-all duration-300"
                      disabled={loadingPayment}
                    >
                      {loadingPayment ? (
                        <span className="flex gap-2 items-center justify-center h-10">
                          <Loader2 className="animate-spin w-4 h-4" />{" "}
                          Procesando...
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center justify-center">
                          Continuar con
                          <img
                            src="/assets/Mercado_Pago_Logo.svg"
                            width={100}
                            height={20}
                          />
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border bg-[#2C2420] border-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">
                    Revisar Pedido
                  </h2>
                  <div className="space-y-4">
                    <div className="border border-[#E0D6CC] p-5">
                      <h3 className="font-sans-elegant text-xs uppercase tracking-wide text-[#2C2420] mb-3">
                        Dirección de Envío
                      </h3>
                      <p className="text-sm text-[#7A6B5A] font-sans-elegant leading-relaxed">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="border border-[#E0D6CC] p-5">
                      <h3 className="font-sans-elegant text-xs uppercase tracking-wide text-[#2C2420] mb-3">
                        Método de Pago
                      </h3>
                      <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                        Tarjeta terminada en {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300"
                    >
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E0D6CC] p-8 sticky top-4">
              <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">
                Resumen
              </h2>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm font-sans-elegant"
                  >
                    <span className="text-[#7A6B5A]">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-[#2C2420]">
                      ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E0D6CC] pt-4 space-y-3">
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#7A6B5A]">Subtotal:</span>
                  <span className="text-[#2C2420]">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#7A6B5A]">Envío:</span>
                  <span className="text-[#2C2420]">
                    {getCartTotal() < MAX_PAYMENT ? (
                      `$${SHIPMENT_COST.toLocaleString("es-CL")}`
                    ) : (
                      <small className="flex gap-1.5 items-center px-2 py-0.5 rounded-full border border-green-400/25 bg-green-400/20 w-fit">
                        <TruckElectricIcon size={14} />
                        Envío gratis
                      </small>
                    )}
                  </span>
                </div>

                {discountContent?.discount_is_active && Number(discountContent?.discount) > 0 && (
                  <div className="flex justify-between text-sm font-sans-elegant">
                    <span className="text-[#7A6B5A] flex gap-1 items-center">
                      <Tag size={14} />
                      {Number(discountContent?.discount)}% OFF
                    </span>
                    <span className="text-[#2C2420]">
                      $
                      {(
                        (getCartTotal() *
                          Number(discountContent?.discount)) /
                        100
                      ).toLocaleString("es-CL")}
                    </span>
                  </div>
                )}

                <div className="border-t border-[#E0D6CC] pt-4">
                  <div className="flex justify-between">
                    <span className="font-sans-elegant text-sm uppercase tracking-wide text-[#2C2420]">
                      Total:
                    </span>
                    <span className="font-sans-elegant text-xl text-[#2C2420]">
                      $
                      {Number(discountContent?.discount) > 0
                        ? Math.floor(
                          getCartTotal() -
                          (getCartTotal() *
                            Number(discountContent?.discount)) /
                          100,
                        ).toLocaleString("es-CL")
                        : getCartTotal().toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
