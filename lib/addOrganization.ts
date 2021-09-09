import { db } from '../firebase/config';
import { OrgFormData } from '../utilities/organization/types';

export const addOrganization = async (data: OrgFormData) => {
  let orgId = null;
  try {
    const docRef = await db.collection('organizations').add(data);
    orgId = docRef.id;
  } catch (err) {
    console.log(err);
    orgId = null;
  }
  return orgId;
};

export const addOrganizationIdtoAdminUser = async (
  uid: string,
  orgName: string,
  orgId: string
) => {
  await db
    .collection('users')
    .doc(uid)
    .update({ linkedOrganizationId: orgId, linkedOrganizationName: orgName });
};
