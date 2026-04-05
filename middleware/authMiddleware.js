const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.headers.role; // getting role from request
  
      if (!userRole) {
        return res.status(401).json({ message: "No role provided" });
      }
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access Denied ❌" });
      }
  
      next();
    };
  };
  
  module.exports = checkRole;