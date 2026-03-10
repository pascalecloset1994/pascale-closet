import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false, // Necesario para recibir el archivo raw
  },
};

function getRawBody(req: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    req.on("data", (chunk: any) => chunks.push(chunk));
    req.on("end", () => {
      resolve(new Blob(chunks));
    });
    req.on("error", reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const filename = req.headers["x-filename"] as string;
    const contentType = req.headers["content-type"] as string;

    if (!filename) {
      return res.status(400).json({ error: "Falta el header x-filename" });
    }

    const body = await getRawBody(req);

    const blob = await put(`products/${Date.now()}-${decodeURIComponent(filename)}`, body, {
      access: "public",
      contentType: contentType || "image/jpeg",
    });

    return res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error("Error en blob-upload:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
