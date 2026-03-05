import { useState, useEffect, useRef, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/common/Input";
import { useProducts, type ImagePreview } from "../../contexts/ProductContext";
import { Loader } from "../../components/common/Loader";
import { showDialog } from "../../components/common/Dialog";
import { useAuth } from "../../contexts/AuthContext";
import { processImagesForUpload } from "../../utils/imageConverter";

interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  condition: string;
  images: ImagePreview[] | null;
  description: string;
  brand: string;
  temp: string;
  size: string;
  color: string;
  category: string;
  user_id: string;
  originalPrice?: string;
}

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    getProductById,
    products,
    createNewProduct,
    updateProduct,
    loading: isLoading,
  } = useProducts();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    stock: "",
    condition: "new",
    images: null,
    description: "",
    brand: "",
    temp: "",
    size: "",
    color: "",
    category: "vestidos",
    user_id: user?.user_id ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(isEditing);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<ImagePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      const product = getProductById(id);

      if (product) {
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "futbol",
          price: String(product.price ?? ""),
          originalPrice: "",
          stock: String(product.stock ?? ""),
          condition: product.condition || "new",
          images: [{ file: new File(JSON.parse(product.image || "[]"), ""), id: "", preview: "" }],
          brand: product.brand || "",
          temp: product.temp || "",
          size: product.size || "",
          color: product.color || "",
          user_id: product.user_id || "",
        });

        // Cargar imágenes existentes como previews
        if (product.image) {
          try {
            const urls: string[] = JSON.parse(product.image as string);
            const existingPreviews: ImagePreview[] = urls.map((url, i) => ({
              file: new File([], `existing-${i}`),
              id: `existing-${i}-${Date.now()}`,
              preview: url,
            }));
            setPreviewImages(existingPreviews);
          } catch {
            // image is a single URL string
            setPreviewImages([{
              file: new File([], "existing-0"),
              id: `existing-0-${Date.now()}`,
              preview: product.image as string,
            }]);
          }
        }
      }
      setLoading(false);
    }
  }, [products, id, isEditing, getProductById]);

  const categories = [
    { value: "vestidos-enteritos", label: "Vestidos y Enteritos" },
    { value: "faldas-short", label: "Faldas y Shorts" },
    { value: "jeans-pantalones", label: "Jeans y Pantalones" },
    { value: "poleras-top", label: "Poleras y Tops" },
    { value: "ropa-deportiva", label: "Ropa Deportiva" },
    { value: "accesorios", label: "Accesorios" },
    { value: "otros", label: "Otros" },
  ];

  const conditions = [
    { value: "new", label: "Nuevo" },
    { value: "used", label: "Pre-loved" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const processFiles = async (files: File[]) => {
    const validFiles: ImagePreview[] = [];
    const maxFiles = 3;
    const currentCount = previewImages.length;
    const allowedExtensions = /\.(jpe?g|png|gif|webp|bmp|heic|heif|avif)$/i;

    // Convertir archivos HEIC a JPEG antes de procesar (iPhone 15 usa HEIC por defecto)
    const convertedFiles = await processImagesForUpload(files);

    for (const file of convertedFiles) {
      if (validFiles.length + currentCount >= maxFiles) {
        showDialog({
          content: (
            <div className="p-5">
              <p className="font-sans-elegant text-[#2C2420]">
                Solo puedes subir un máximo de {maxFiles} imágenes.
              </p>
            </div>
          ),
        });
        break;
      }

      // Check by MIME type or by file extension (mobile browsers may not set MIME correctly)
      const isImageByType = file.type.startsWith("image/");
      const isImageByExt = allowedExtensions.test(file.name);

      if (!isImageByType && !isImageByExt) {
        showDialog({
          content: (
            <div className="p-5">
              <p className="font-sans-elegant text-[#2C2420]">
                "{file.name}" no es un archivo de imagen válido.
              </p>
            </div>
          ),
        });
        continue;
      }

      if (file.size > 15 * 1024 * 1024) {
        showDialog({
          content: (
            <div className="p-5">
              <p className="font-sans-elegant text-[#2C2420]">
                "{file.name}" supera el límite de 15MB.
              </p>
            </div>
          ),
        });
        continue;
      }

      validFiles.push({
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        preview: URL.createObjectURL(file),
      });
    }

    if (validFiles.length > 0) {
      setPreviewImages((prev) => {
        const accumulated = [...prev, ...validFiles];
        setFormData((prevForm) => ({ ...prevForm, images: accumulated }));
        return accumulated;
      });
    }
  };

  const handleImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    await processFiles(files);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const removeImage = (imageId: string) => {
    setPreviewImages((prev) => {
      const updated = prev.filter((img) => img.id !== imageId);
      const removed = prev.find((img) => img.id === imageId);
      if (removed) URL.revokeObjectURL(removed.preview);
      setFormData((prevForm) => ({ ...prevForm, images: updated.length > 0 ? updated : null }));
      return updated;
    });
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "El nombre del producto es requerido";
    }

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser 1 o mayor";
    }

    if (!formData.category) {
      newErrors.category = "Debes seleccionar una categoría";
    }

    if (!formData.condition) {
      newErrors.condition = "Debes seleccionar una condición";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing && id) {
      await updateProduct(id, formData);
    } else {
      await createNewProduct(formData);
    }

    navigate("/seller/products");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-1">
            {isEditing ? "Editar" : "Nueva prenda"}
          </p>
          <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420]">
            {isEditing ? "Editar Producto" : "Publicar Producto"}
          </h1>
          <p className="text-[#7A6B5A] font-sans-elegant text-sm mt-1">
            {isEditing
              ? "Actualiza la información del producto"
              : "Añade una nueva prenda a tu colección"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-[#E0D6CC] p-5 mb-4">
            <h2 className="text-xs font-sans-elegant font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Información Básica
            </h2>

            <Input
              name="name"
              label="Nombre del Producto"
              placeholder="Ej: Vestido Elegante de Seda"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <div className="mb-4">
              <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#2C2420] uppercase tracking-wide">
                Descripción <span className="text-[#2C2420]">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe el producto en detalle..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:ring-1 focus:ring-[#2C2420] outline-none transition-all duration-200 text-sm field-sizing-content ${errors.description ? "border-[#2C2420]" : ""
                  }`}
              />
              {errors.description && (
                <p className="text-[#2C2420] text-xs mt-1 font-sans-elegant">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-3">
                <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#2C2420] uppercase tracking-wide">
                  Categoría <span className="text-[#2C2420]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:ring-1 focus:ring-[#2C2420] outline-none transition-all duration-200 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#2C2420] uppercase tracking-wide">
                  Condición <span className="text-[#2C2420]">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:ring-1 focus:ring-[#2C2420] outline-none transition-all duration-200 text-sm"
                >
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E0D6CC] p-5 mb-4">
            <h2 className="text-xs font-sans-elegant font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Precio e Inventario
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                name="price"
                label="Precio"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />
              <Input
                type="number"
                name="stock"
                label="Stock Disponible"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                required
              />
            </div>
          </div>

          <div className="bg-white border border-[#E0D6CC] p-5 mb-4">
            <h2 className="text-xs font-sans-elegant font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Detalles
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="brand"
                label="Marca"
                placeholder="Ej: Zara, H&M"
                value={formData.brand}
                onChange={handleChange}
                error={errors.brand}
              />

              <Input
                name="temp"
                label="Temporada"
                placeholder="Ej: Primavera 2025"
                value={formData.temp}
                onChange={handleChange}
                error={errors.temp}
              />

              <Input
                name="size"
                label="Talla"
                placeholder="Ej: XS, S, M, L, XL (No en números)"
                value={formData.size}
                onChange={handleChange}
                error={errors.size}
                required
              />

              <Input
                name="color"
                label="Color"
                placeholder="Ej: Negro, Crema, Beige"
                value={formData.color}
                onChange={handleChange}
                error={errors.color}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white border border-[#E0D6CC] p-5 mb-4">
            <h2 className="text-xs font-sans-elegant font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Imágenes
            </h2>

            {/* Drop Zone */}
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleDropZoneClick}
              className={`relative border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                  ? "border-[#2C2420] bg-[#F5F0EB] scale-[1.02]"
                  : "border-[#E0D6CC] bg-[#F5F0EB] hover:border-[#2C2420]"
                }`}
            >
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F0EB]">
                  <div className="text-center">
                    <p className="text-[#2C2420] font-sans-elegant font-medium">
                      Suelta las imágenes aquí
                    </p>
                  </div>
                </div>
              )}

              <div
                className={
                  isDragging ? "opacity-0" : "opacity-100 transition-opacity"
                }
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#2C2420]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-[#2C2420] font-sans-elegant text-sm mb-1">
                  Arrastra y suelta tus imágenes aquí
                </p>
                <p className="text-[#7A6B5A] font-sans-elegant text-xs mb-3">
                  o haz clic para seleccionar
                </p>
                <span className="inline-block px-4 py-2 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-wide uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-200">
                  Explorar archivos
                </span>
                <p className="text-[10px] text-[#7A6B5A] font-sans-elegant mt-3">
                  Máximo 3 imágenes · JPG, PNG · 10MB cada una
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageFile}
                className="hidden"
                multiple
                accept="image/*,.heic,.heif"
              />
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#7A6B5A] font-sans-elegant">
                    {previewImages.length} de 3 imágenes
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      previewImages.forEach((img) => {
                        if (img.preview && !img.preview.startsWith("http")) {
                          URL.revokeObjectURL(img.preview);
                        }
                      });
                      setPreviewImages([]);
                      setFormData((prev) => ({ ...prev, images: null }));
                    }}
                    className="text-xs text-[#2C2420] font-sans-elegant hover:underline"
                  >
                    Eliminar todas
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {previewImages.map((img, index) => (
                    <div key={img.id} className="relative group aspect-square">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover border border-[#E0D6CC]"
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-[#2C2420] text-white text-[10px] px-1.5 py-0.5 font-sans-elegant">
                          Principal
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        className="absolute top-1 right-1 w-6 h-6 bg-[#2C2420]/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#2C2420]"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Add more images button */}
                  {previewImages.length < 3 && (
                    <div
                      onClick={handleDropZoneClick}
                      className="aspect-square border-2 border-dashed border-[#E0D6CC] flex items-center justify-center cursor-pointer hover:border-[#2C2420] hover:bg-[#F5F0EB] transition-all duration-200"
                    >
                      <div className="text-center">
                        <svg
                          className="w-6 h-6 mx-auto text-[#7A6B5A]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span className="text-[10px] text-[#7A6B5A] font-sans-elegant mt-1 block">
                          Añadir
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/seller/products")}
              className="flex-1 py-3 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200"
            >
              {isEditing ? "Actualizar" : "Publicar"} {loading ? "..." : ""}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
