import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../utils/s3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { title, filename } = await readBody(event);

  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: "`filename` not set!",
    });
  }

  const key = `uploads/${Date.now()}-${crypto.randomUUID()}-${filename}`; // Presigned URL key

  await prisma.dvd.create({
    data: {
      title,
      userId: event.context.session.user.id,
      imageUrl: `/api/images/${key}`,
    },
  });

  const command = new PutObjectCommand({
    Bucket: config.s3BucketName,
    Key: key,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return { key, uploadUrl };
});
