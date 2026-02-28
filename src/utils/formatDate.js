export const formatDate = (str, fullDate) => {
  return fullDate
    ? new Date(str).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : new Date(str).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
};
