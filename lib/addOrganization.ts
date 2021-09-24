import firebase from '../firebase/firebaseClient';
import { OrgFormData } from '../utilities/organization/types';

export const addOrganization = async (data: OrgFormData) => {
  let orgId = null;
  try {
    const docRef = await firebase
      .firestore()
      .collection('organizations')
      .add(data);
    orgId = docRef.id;
  } catch (err) {
    console.log(err);
    orgId = null;
  }
  return orgId;
};

export const addOrganizationIdtoAdminUser = async (
  docId: string | undefined,
  orgName: string,
  orgId: string
) => {
  await firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({ linkedOrganizationId: orgId, linkedOrganizationName: orgName });
};
