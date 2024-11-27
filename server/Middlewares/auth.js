import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Extract the token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');  // This removes 'Bearer ' from the token
  console.log('Token:', token);
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT_SECRET key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user from token:', decoded.user);


    // Attach user object to the request object for further use in controller
    req.user = decoded.user;  // This will include userId and other information in req.user

    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
