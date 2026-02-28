# E-commerce: Plataforma de Comercio Electrónico

Un proyecto de e-commerce completo y moderno, construido con el stack PERN (PostgreSQL, Express, React, Node.js) e integración con Mercado Pago.

## Descripción del Proyecto

E-commerce es una plataforma de comercio electrónico versátil y escalable que conecta a compradores y vendedores en un ecosistema seguro y fácil de usar. La plataforma permite a los usuarios actuar en ambos roles según sus necesidades, facilitando tanto la compra como la venta de productos.

El proyecto se caracteriza por su arquitectura robusta, diseño moderno y funcionalidades completas que cubren todo el ciclo de comercio electrónico, desde la publicación de productos hasta la gestión de pagos y envíos.

## Características de Diseño

La plataforma cuenta con un diseño moderno y responsivo que prioriza la experiencia de usuario:

- **Paleta de colores:** Colores vibrantes y tonos institucionales con una jerarquía visual clara
- **Tipografía:** Fuentes sans-serif modernas y legibles (Arial, Verdana, Tahoma)
- **Elementos visuales:** Bordes bien definidos, sombras sutiles y componentes interactivos
- **Layout:** Diseño responsivo implementado con tecnologías modernas (Flexbox/Grid)

El enfoque de diseño garantiza una navegación intuitiva y una experiencia de compra fluida en cualquier dispositivo.

## Arquitectura de Páginas

### Páginas Públicas
- **Home:** Página de inicio con productos destacados y categorías
- **Catálogo de Productos:** Listado completo con sistema de búsqueda y filtros
- **Detalle de Producto:** Vista individual con galería, especificaciones y valoraciones
- **Login/Registro:** Sistema de autenticación dual para buyers y sellers
- **Acerca de:** Información sobre la plataforma
- **Contacto:** Formulario de comunicación

### Área del Comprador
- **Carrito de Compras:** Gestión completa de productos seleccionados
- **Checkout:** Proceso de compra en 3 pasos (Envío → Pago → Revisión)
- **Historial de Pedidos:** Registro completo de compras realizadas
- **Perfil de Usuario:** Gestión de datos personales y preferencias

### Área del Vendedor
- **Dashboard:** Panel de control con métricas y estadísticas de ventas
- **Gestión de Inventario:** CRUD completo de productos
- **Gestión de Pedidos:** Visualización y administración de órdenes recibidas
- **Perfil de Vendedor:** Configuración de cuenta y datos comerciales

## Funcionalidades Principales

### Para Compradores

**Sistema de Búsqueda Avanzado:**
- Búsqueda por nombre, descripción y categoría con normalización de acentos
- Filtrado por categorías personalizables según el tipo de negocio
- Sistema de búsqueda tolerante que mejora la experiencia de usuario

**Carrito de Compras Inteligente:**
- Validación automática de stock en tiempo real
- Cálculo dinámico de impuestos (10%)
- Envío gratuito para compras superiores a $45,000
- Persistencia de datos mediante localStorage

**Proceso de Checkout Seguro:**
- Flujo de compra en 3 pasos claramente definidos
- Integración con Mercado Pago para pagos seguros
- Resumen detallado antes de confirmar la compra

**Información Detallada de Productos:**
- Galerías de imágenes múltiples
- Especificaciones técnicas completas
- Sistema de valoraciones
- Historial del vendedor

### Para Vendedores

**Dashboard Completo:**
- Estadísticas de ventas en tiempo real
- Visualización de pedidos pendientes
- Seguimiento de productos activos
- *Análisis detallado de ventas (a implementar)*

**Gestión de Inventario:**
- Formulario completo para creación de productos
- Campos: nombre, descripción, precio, stock, condición, marca, año, talla, color
- Carga de múltiples imágenes
- Edición y eliminación de productos propios
- Configuración flexible de envíos

**Administración de Pedidos:**
- Visualización de órdenes recientes
- Actualización de estados de envío
- *Integración con API de Andreani para logística (a implementar)*

### Características Generales

**Sistema de Condiciones de Productos:**
- Nuevo
- Usado (Excelente/Muy Bueno/Bueno)
- Réplica
- Coleccionable

**Seguridad y Autenticación:**
- Sistema de login/registro con validación de credenciales
- Cookies HTTPOnly para almacenamiento seguro de tokens
- Encriptación SSL para datos en tránsito
- Protección de rutas según rol de usuario (buyer/seller)
- Validación de formularios en frontend y backend

**Marco Legal:**
- Política de privacidad completa
- Términos y condiciones de uso
- Documentación legal transparente

## Stack Tecnológico

### Backend
- **Node.js & Express:** Servidor y API REST
- **PostgreSQL:** Base de datos relacional con modelos robustos
- **Middleware personalizado:** Para autenticación y autorización

### Frontend
- **React:** Librería para construcción de interfaces
- **Tailwind CSS:** Framework utility-first para estilos
- **React Router:** Navegación entre páginas
- **Context API:** Gestión de estado global (AuthContext, CartContext)
- **Axios:** Comunicación con el backend

### Servicios Externos
- **Mercado Pago:** Procesamiento de pagos
- *Andreani API (a implementar):* Gestión de envíos y logística

## Arquitectura del Código

### Backend
```
backend/
├── src/
│   ├── routes/          # Definición de endpoints de la API
│   ├── controllers/     # Lógica de negocio
│   ├── models/          # Modelos de datos (PostgreSQL)
│   ├── middleware/      # Autenticación y validación
│   └── config/          # Configuración de la aplicación
```

### Frontend
```
frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── context/        # Contextos globales (Auth, Cart)
│   └── services/       # Servicios para llamadas a la API
```

## Flujo de Autenticación

1. **Registro:** El usuario se registra con email, contraseña y rol (buyer/seller)
2. **Validación:** El backend valida los datos y almacena la contraseña encriptada en PostgreSQL
3. **Generación de Token:** Se genera una cookie HTTPOnly con token de sesión
4. **Acceso Controlado:** El usuario accede a rutas protegidas según su rol asignado

## Sistema de Carrito (CartContext)

El carrito de compras es manejado mediante Context API con las siguientes características:

**Métodos Principales:**
- `addToCart(product, quantity)` - Agregar producto con validación de stock
- `removeFromCart(productId)` - Eliminar producto del carrito
- `updateQuantity(productId, quantity)` - Actualizar cantidad con validación
- `getCartTotal()` - Calcular total con impuestos y envío
- `clearCart()` - Vaciar carrito después de compra

**Validaciones:**
- Stock dinámico en tiempo real (previene sobre-venta)
- Cálculo automático de impuestos del 10%
- Aplicación de envío gratuito para compras mayores a $45,000
- Persistencia mediante localStorage para no perder el carrito al cerrar el navegador

## Estructura de Productos

Cada producto en la plataforma contiene la siguiente información:

```javascript
{
  id: UUID,
  name: string,
  description: string,
  price: number,
  originalPrice: number (opcional - para mostrar descuentos),
  stock: number,
  category: string (configurable según el negocio),
  condition: 'nuevo' | 'usado-excelente' | 'usado-muy-bueno' | 
             'usado-bueno' | 'replica' | 'coleccionable',
  brand: string,
  year: string,
  size: string,
  color: string,
  images: string[] (array de URLs),
  shipping: 'free' | number (costo de envío),
  seller: string (nombre del vendedor),
  seller_id: UUID
}
```

## Consideraciones Técnicas Importantes

1. **Autenticación:** Las credenciales se manejan mediante cookies HTTPOnly seguras que no son accesibles desde JavaScript
2. **Persistencia:** El carrito se almacena en localStorage del navegador para mantener la sesión del usuario
3. **Validación Dual:** Toda validación crítica se realiza tanto en frontend (UX) como en backend (seguridad)
4. **Gestión de Imágenes:** Se almacenan URLs de imágenes en la base de datos, no archivos binarios directos
5. **Búsqueda Optimizada:** El sistema normaliza acentos y caracteres especiales para mejorar los resultados de búsqueda

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL
- Cuenta de desarrollador en Mercado Pago

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone [URL del repositorio]
cd frontend-e-commerce
```

2. **Configurar Backend:**
```bash
cd backend
npm install
```

3. **Configurar Base de Datos:**
- Crear base de datos PostgreSQL
- Configurar archivo `.env` con las credenciales de conexión

4. **Configurar Frontend:**
```bash
cd ../frontend
npm install
```

5. **Iniciar Servidores:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

## Funcionalidades a Implementar

- **Análisis Avanzado de Ventas:** Sistema de reportes y métricas detalladas para vendedores con gráficos y estadísticas de rendimiento
- **Integración con Andreani:** Implementación completa de la API de Andreani para gestión profesional de envíos, tracking en tiempo real y cálculo automático de costos de logística

## Conclusión

Esta plataforma de e-commerce representa un proyecto completo y moderno que combina tecnologías robustas con una excelente experiencia de usuario. La arquitectura PERN proporciona una base sólida y escalable, mientras que las funcionalidades implementadas cubren las necesidades tanto de compradores como de vendedores, adaptándose a diferentes tipos de negocios y mercados.