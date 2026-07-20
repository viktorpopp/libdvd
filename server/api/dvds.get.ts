export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const dvds = await prisma.dvd.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return dvds;
});
