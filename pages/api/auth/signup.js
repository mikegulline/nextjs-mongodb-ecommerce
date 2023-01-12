import nc from 'next-connect';
import bcrypt from 'bcrypt';
import db from '../../../utils/db';
import { validateEmail } from '../../../utils/validation';
import User from '../../../models/User';
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDB();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: `The email ${email} has already been registered.`,
      });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long.' });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: encryptedPassword });
    const addedUser = await newUser.save();

    res.status(200).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
