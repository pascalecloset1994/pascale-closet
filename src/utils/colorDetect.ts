export const colorDetect = (color: string) => {
    if (String(color).toLowerCase() === "negro") return "black";
    if (String(color).toLowerCase() === "beige") return "#F5F5DC";
    if (String(color).toLowerCase() === "blanco") return "white";
    if (String(color).toLowerCase() === "azul") return "#A7C7E7";
    if (String(color).toLowerCase() === "rojo") return "tomato";
    if (String(color).toLowerCase() === "marron") return "brown";
    if (String(color).toLowerCase() === "crema") return "#FFFDD0";
    return "";
};