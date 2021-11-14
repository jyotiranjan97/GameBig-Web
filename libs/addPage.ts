import { db } from '../firebase/firebaseClient';
import { PageFormData } from '../utilities/page/types';

export const addPage = async (data: PageFormData) => {
  let pageId = null;
  try {
    const docRef = await db.collection('pages').add(data);
    pageId = docRef.id;
  } catch (err) {
    console.log(err);
    pageId = null;
  }
  return pageId;
};

export const updatePage = async (data: PageFormData, pageId: string) => {
  await db.collection('pages').doc(pageId).update(data);
};

export const addPageIdtoAdminUser = async (
  docId: string | undefined,
  pageName: string,
  pageId: string
) => {
  try {
    await db
      .collection('users')
      .doc(docId)
      .update({ linkedPageId: pageId, linkedPageName: pageName });
  } catch (err) {
    console.log("Error adding page data to Admin's collection - ", err);
  }
};