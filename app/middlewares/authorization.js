export const IsAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);
  
  if (user.role !== 'admin') return res.sendStatus(403);

  next();
};

export const IsModerator = (req, res, next) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);
  
  if (user.role !== 'moderator') return res.sendStatus(403);

  next();
}