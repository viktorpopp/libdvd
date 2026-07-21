import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../utils/s3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const key = getRouterParam(event, "key");

  if (!key) {
    throw createError({ statusCode: 400, statusMessage: "Missing key" });
  }

  const res = await s3Client.send(
    new GetObjectCommand({ Bucket: config.s3BucketName, Key: key }),
  );

  if (!res.Body) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }

  const body = Buffer.from(await res.Body.transformToByteArray());

  setResponseHeader(
    event,
    "Content-Type",
    res.ContentType || "application/octet-stream",
  );
  setResponseHeader(event, "Content-Length", body.length);

  return body;
});
