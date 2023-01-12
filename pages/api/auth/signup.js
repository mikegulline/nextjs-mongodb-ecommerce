import nc from 'next-connect';
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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
