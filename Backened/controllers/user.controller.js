import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import sendEmail from "../utils/sendemail.js";


// export const signup = async (req, res) => {
//   const { fullname, email, password, confirmPassword } = req.body;
//   try {
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     // Check if already exists
//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Email already in use" });

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
//     //Hashing the password
//     const hash = await bcrypt.hash(password, 10);
//     const newUser = await new User({
//       fullname,
//       email,
//       password: hash,
//       otp,
//       otpExpiry,
//       isVerified: false,
//     });
   


//     await newUser.save();
//      await sendEmail({
//        to: email,
//        subject: "Verify your email",
//        html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
//      });

//      res.status(201).json({ message: "OTP sent to your email" });
//     if (newUser) {
//       createTokenAndSaveCookie(newUser._id, res);

//       res.status(201).json({ message: "User created successfully", newUser });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (user) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullname,
        email,
        password: hash,
        otp,
        otpExpiry,
        isVerified: false,
      });
      await newUser.save();
    }

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "Email verified successfully",
      user: { _id: user._id, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ isVerified check pehle karo
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Cookie set karo
    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
  
    export const logout = async (req, res) => {
      try {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "strict",
        });
   
        res.status(201).json({ message: "Logout successful" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
    };



    export const AllUsers = async (req, res) => {

      console.log(" AllUsers API HIT");
      try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized - no user" });
        }

        const loggedInUser = req.user._id;

        console.log(loggedInUser);

        const filteredUsers = await User.find({
          _id: { $ne: loggedInUser },
        }).select("-password");

        console.log("✅ Backend se bhejne wale users:", filteredUsers);

        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
      } catch (error) {
        console.log("Error in AllUsers Controller:", error);
        res.status(500).json({ message: "Server error" });
      }
    };


    
  

  
