const authenticateUser = (req, res, next) => {
  const cookie = req.cookies.token;
  if (!token) throw new CustomError(401, "Unauthenticated");
  next();
};
