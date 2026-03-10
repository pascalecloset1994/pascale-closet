import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Aquí podrías validar sesión del usuario si lo necesitas
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/avif",
            "image/heic",
            "image/heif",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB por archivo
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Blob upload completado:", blob.url);
      },
    });

    return new Response(JSON.stringify(jsonResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
