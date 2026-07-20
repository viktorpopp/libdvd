export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  await prisma.dvd.create({
    data: {
      title: body.title,
      userId: session?.user.id,
    },
  });
});
