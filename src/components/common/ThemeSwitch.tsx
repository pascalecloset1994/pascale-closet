import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="w-full flex justify-between items-center">
            <span>Apariencia</span>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-[58px] border dark:border-zinc-800 border-zinc-300 rounded-2xl flex items-center bg-[#eee] dark:bg-[#111111]"
            >
                <span className="p-1 rounded-full bg-background border border-zinc-300 dark:border-zinc-800 text-muted-foreground m-0.5 transition-transform duration-300 shadow-2xs"
                    style={{ transform: `${theme === "dark" ? "translateX(0)" : "translateX(100%)"}` }}
                >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </span>
            </button>
        </div>
    )
}