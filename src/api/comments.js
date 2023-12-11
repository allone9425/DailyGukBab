import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db } from '../firebase';

export const getComments = async (postId) => {
  const q = query(collection(db, 'comments'), where('postId', '==', postId));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ commentId: doc.id, ...doc.data() });
  });
  return data;
};

export const addComment = async (comment) => {
  await addDoc(collection(db, 'comments'), comment);
};

export const updateComment = async (data) => {
  const { commentId, updateContent } = data;
  const docRef = doc(db, 'comments', commentId);
  await updateDoc(docRef, updateContent);
};

export const deleteComment = async (commentId) => {
  await deleteDoc(doc(db, 'comments', commentId));
};
