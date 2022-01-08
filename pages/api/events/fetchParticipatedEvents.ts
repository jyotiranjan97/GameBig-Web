import { connectToDatabase } from '../../../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: any, res: any) {
  try {
    const { postId, likedBy, unLikedBy } = req.query;
    // connect to the database
    let { db } = await connectToDatabase();
    console.log('>>>>>>>>>>>>>');

    let events = await db
      .collection('events')
      .aggregate([
        {
          $lookup: {
            from: 'participants',
            localField: '_id',
            foreignField: '_eventId',
            as: 'likedBy',
          },
        },
      ])
      .toArray();
    console.log({ events });

    // return a message
    return res.json({
      message: 'Post updated successfully',
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
