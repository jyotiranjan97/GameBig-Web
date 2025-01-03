import { connectToDatabase } from '../../../mongoDB/mongodbClient';

export default async function handler(req: any, res: any) {
  const { pageId } = req.query;
  try {
    var d1 = new Date(),
      d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() - 45);
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let events = await db
      .collection('events')
      .find({
        $and: [
          { pageId: { $eq: pageId } },
          { startTime: { $lte: d2.toISOString() } },
        ],
      })
      .sort({ startTime: -1 })
      .limit(40)
      .toArray();
    // return the events
    return res.json({
      data: JSON.parse(JSON.stringify(events)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      data: new Error(error as string).message,
      success: false,
    });
  }
}
