import { SetStateAction } from "react";
import { Dispatch } from "react";

interface SwitchProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean | undefined>>;
}

export function Switch({ checked = false, setChecked }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200
          ${checked ? "bg-[#2C2420]" : "bg-zinc-300"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
    </label>
  );
}
