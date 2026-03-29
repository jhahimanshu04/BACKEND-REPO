import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "500d", // Token expiration time
  });
  res.cookie("jwt", token, {
    httpOnly:true, //xss
    secure: false,
    maxAge: 100 * 24 * 60 * 60 * 1000,

    sameSite: "lax", //cslaxrf
     
  });
};

export default createTokenAndSaveCookie;
