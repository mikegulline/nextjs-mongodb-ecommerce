import nc from 'next-connect';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDB();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
