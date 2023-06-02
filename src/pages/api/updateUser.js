import User from 'models/user.model';
import { connectDB } from 'setup/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    let {uid} = req.query;
    try {
      await connectDB();
      let user = await User.findOne({_id: uid});
      if(req.body.address) {
        if(typeof user.address === 'undefined') {
          user.address = req.body.address;
        }
        else {
          user.address = [...user.address, req.body.address];
        }
        if(!user.currentAddress) {
          user.currentAddress = req.body.address;
        }
      }
      await User.findOneAndUpdate({_id:uid}, user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  res.status(400).send('Method not allowed');
}