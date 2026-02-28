import { type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { X } from "lucide-react";

export interface ShowDialogProps {
  content: ReactNode;
  title?: string;
}

export const showDialog = ({ content, title }: ShowDialogProps) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);

  const root = createRoot(dialog);
  const controller = new AbortController();

  dialog.style.animation = "slideIn 120ms ease-out";
  dialog.showModal();
  document.body.style.overflow = "hidden";

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOut 100ms ease-in";
    document.body.style.overflow = "auto";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal },
    );
  };

  root.render(
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-[#E0D6CC] bg-white">
        <h3 className="font-sans-elegant text-sm uppercase tracking-wider text-[#2C2420]">
          {title || "Pascale Closet"}
        </h3>
        <button
          onClick={closeDialogWithAnimation}
          className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors duration-200"
          title="Cerrar"
        >
          <X size={18} className="text-[#7A6B5A] hover:text-[#2C2420]" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6 font-sans-elegant text-[#2C2420]">
        {content}
      </div>
    </div>,
  );

  dialog.addEventListener(
    "click",
    (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!isInDialog) {
        closeDialogWithAnimation();
      }
    },
    { signal: controller.signal },
  );
};

export const closeDialog = () => {
  const dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.style.animation = "slideOut 100ms ease-in";
    document.body.style.overflow = "auto";
    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
      },
      { once: true },
    );
  }
};
