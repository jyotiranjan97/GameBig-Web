import {
  getParticipantsByEventId,
  addParticipant,
  deleteParticipant,
  updateParticipant,
  getParicipantByUidInEvent,
} from '../../../libs/participants';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      const { uid } = req.query;
      if (uid) {
        return getParicipantByUidInEvent(req, res);
      } else {
        return getParticipantsByEventId(req, res);
      }
    }

    case 'POST': {
      return addParticipant(req, res);
    }

    case 'PUT': {
      return updateParticipant(req, res);
    }

    case 'DELETE': {
      return deleteParticipant(req, res);
    }
  }
}
