import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export interface ToastProps {
  message: ReactNode;
  timer?: number;
  tunner?: number;
}

export const toast = ({ message, timer = 6, tunner = 20 }: ToastProps) => {
  const toastContainer = document.createElement("div");
  toastContainer.className = "fixed top-20 md:top-6 right-6 z-50";
  const root = createRoot(toastContainer);
  document.body.appendChild(toastContainer);

  const controller = new AbortController();

  const closeToast = () => {
    toastContainer.style.animation = "sliderBack 300ms ease-in-out";

    toastContainer.addEventListener(
      "animationend",
      () => {
        toastContainer.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal },
    );
  };

  let counter = 0;
  const interval = setInterval(
    () => {
      root.render(
        <div className="w-fit py-4 bg-foreground text-background overflow-hidden toast">
          <article className="flex px-4 gap-2 items-center relative">
            {message}
            <div
              style={{ width: `${Math.floor((counter * 1000) / tunner)}px` }}
              className="h-1 bg-primary absolute -bottom-4 left-0"
            />
          </article>
        </div>,
      );
      counter++;

      if (counter > timer) {
        clearInterval(interval);
        closeToast();
      }
    },
    1000,
    { signal: controller.signal },
  );
};
