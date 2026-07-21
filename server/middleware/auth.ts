export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname.startsWith("/api/images")) {
    return;
  }

  const publicRoutes = ["/", "/login", "/signup"];
  if (publicRoutes.includes(getRequestURL(event).pathname)) {
    return;
  }
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  event.context.session = session;
});
