import User from 'models/user.model';
import { connectDB } from 'setup/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let {userId} = req.query;
    try {
      await connectDB();
      const user = await User.findOne({userId: userId});
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  res.status(400).send('Method not allowed');
}