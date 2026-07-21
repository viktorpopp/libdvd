export default defineEventHandler(async (event) => {
  const dvds = await prisma.dvd.findMany({
    where: {
      userId: event.context.session.user.id,
    },
  });

  return dvds;
});
