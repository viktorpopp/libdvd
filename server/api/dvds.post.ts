import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);

  if (!body) {
    throw createError({
      status: 400,
      statusMessage: "No request body found!",
    });
  }

  const title = body.find((item) => item.name == "title")?.data.toString();
  const imageField = body.find((item) => item.name == "image");

  const image = await sharp(imageField?.data).webp().toBuffer(); // Used AI to find .toBuffer()

  if (!imageField?.filename) {
    throw createError({
      status: 400,
      statusMessage: "No image found!",
    });
  }

  if (!title) {
    throw createError({
      status: 400,
      statusMessage: "No title found!",
    });
  }

  const filename = imageField?.filename.replace(/(\.[^/.]+)?$/, ".webp"); // AI...
  const fileKey = `uploads/${crypto.randomUUID()}-${filename}`;

  console.log("Uploading movie: %s (%s)", title, fileKey);

  const config = useRuntimeConfig();

  const s3Command = new PutObjectCommand({
    Bucket: config.s3BucketName,
    Key: fileKey,
    Body: image,
    ContentType: "image/webp",
  });

  await s3Client.send(s3Command);

  await prisma.dvd.create({
    data: {
      title,
      userId: event.context.session.user.id,
      imageUrl: `/api/images/${fileKey}`,
    },
  });

  return;
});
