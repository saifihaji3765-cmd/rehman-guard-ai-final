import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, action } = req.body;

  if (!email || !password || !action) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (action === "signup" || action === "login") {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      email
    });
  }

  return res.status(400).json({ message: "Invalid action" });
}
