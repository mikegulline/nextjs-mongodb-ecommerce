import { connectDB } from '../../utils/db';

export default function handler(req, res) {
  connectDB();
  res.status(200).json({ name: 'John Doe' });
}
