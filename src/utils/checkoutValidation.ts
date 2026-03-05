import { z } from "zod";

/**
 * Schema de validación para los datos de envío
 */
export const shippingSchema = z.object({
  firstName: z.string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  
  lastName: z.string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),
  
  email: z.string()
    .min(1, "El email es requerido")
    .email("Email inválido")
    .max(100, "El email no puede exceder 100 caracteres"),
  
  phone: z.string()
    .min(1, "El teléfono es requerido")
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .max(15, "El teléfono no puede exceder 15 caracteres")
    .regex(/^[0-9+\s()-]+$/, "Formato de teléfono inválido"),
  
  address: z.string()
    .min(1, "La dirección es requerida")
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200, "La dirección no puede exceder 200 caracteres"),
  
  city: z.string()
    .min(1, "La ciudad es requerida")
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres"),
  
  state: z.string()
    .min(1, "El departamento es requerido")
    .min(2, "El departamento debe tener al menos 2 caracteres")
    .max(100, "El departamento no puede exceder 100 caracteres"),
  
  zipCode: z.string()
    .min(1, "El código postal es requerido")
    .min(3, "El código postal debe tener al menos 3 caracteres")
    .max(10, "El código postal no puede exceder 10 caracteres"),
  
  country: z.string().optional(),
});

/**
 * Schema de validación para datos de pago (tarjeta)
 */
export const paymentSchema = z.object({
  cardNumber: z.string()
    .min(1, "El número de tarjeta es requerido")
    .regex(/^[0-9\s]{13,19}$/, "Número de tarjeta inválido")
    .transform(val => val.replace(/\s/g, ""))
    .refine(val => val.length >= 13 && val.length <= 19, "El número de tarjeta debe tener entre 13 y 19 dígitos"),
  
  cardName: z.string()
    .min(1, "El nombre del titular es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  
  expiryDate: z.string()
    .min(1, "La fecha de expiración es requerida")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/YY)")
    .refine(val => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, "La tarjeta ha expirado"),
  
  cvv: z.string()
    .min(1, "El CVV es requerido")
    .regex(/^\d{3,4}$/, "El CVV debe tener 3 o 4 dígitos"),
});

/**
 * Schema completo del checkout (envío + pago)
 */
export const checkoutSchema = shippingSchema.merge(paymentSchema);

/**
 * Tipo TypeScript inferido del schema de envío
 */
export type ShippingFormData = z.infer<typeof shippingSchema>;

/**
 * Tipo TypeScript inferido del schema de pago
 */
export type PaymentFormData = z.infer<typeof paymentSchema>;

/**
 * Tipo TypeScript inferido del schema completo
 */
export type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * Tipo para errores de validación
 */
export type ValidationErrors = Partial<Record<keyof CheckoutFormData, string>>;

/**
 * Función auxiliar para validar datos de envío
 * @param data - Datos del formulario de envío a validar
 * @returns Objeto con errores si la validación falla, undefined si es exitosa
 */
export function validateShippingData(data: unknown): ValidationErrors | undefined {
  try {
    shippingSchema.parse(data);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationErrors = {};
      error.issues.forEach((err) => {
        const path = err.path[0] as keyof CheckoutFormData;
        if (path) {
          errors[path] = err.message;
        }
      });
      return errors;
    }
    return undefined;
  }
}

/**
 * Función auxiliar para validar datos de pago
 * @param data - Datos del formulario de pago a validar
 * @returns Objeto con errores si la validación falla, undefined si es exitosa
 */
export function validatePaymentData(data: unknown): ValidationErrors | undefined {
  try {
    paymentSchema.parse(data);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationErrors = {};
      error.issues.forEach((err) => {
        const path = err.path[0] as keyof CheckoutFormData;
        if (path) {
          errors[path] = err.message;
        }
      });
      return errors;
    }
    return undefined;
  }
}

/**
 * Función auxiliar para validar datos completos del checkout
 * @param data - Datos completos del formulario
 * @returns Objeto con errores si la validación falla, undefined si es exitosa
 */
export function validateCheckoutData(data: unknown): ValidationErrors | undefined {
  try {
    checkoutSchema.parse(data);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationErrors = {};
      error.issues.forEach((err) => {
        const path = err.path[0] as keyof CheckoutFormData;
        if (path) {
          errors[path] = err.message;
        }
      });
      return errors;
    }
    return undefined;
  }
}

/**
 * Función auxiliar para validar un campo específico
 * @param fieldName - Nombre del campo a validar
 * @param value - Valor del campo
 * @param schema - Schema a usar (shipping o payment)
 * @returns Mensaje de error si la validación falla, undefined si es exitosa
 */
export function validateField(
  fieldName: keyof CheckoutFormData,
  value: unknown,
  schema: z.ZodObject<any> = shippingSchema
): string | undefined {
  try {
    const fieldSchema = schema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
    }
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message;
    }
    return undefined;
  }
}
