import jwt from 'jsonwebtoken'

const GenrateToken = async (data) => {
  return jwt.sign({data}, process.env.JWT_SECRET || 'JWT_SECRET');
};

export default GenrateToken;