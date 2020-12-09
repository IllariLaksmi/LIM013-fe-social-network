import { savePost } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;
// eslint-disable-next-line import/no-cycle

export const post = (text, status, photo) => {
  // const photo = 'photo';
  savePost(text, photo, status);
};

export const createPost = (showPosts, containerPost) => db().collection('posts').where('status', '==', 'publico').onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
      // console.log('change', change);
      /*
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.prepend(thisPost);
      */
    } else if (change.type === 'removed') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
    } else if (change.type === 'modified') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
      showPosts(change.doc);
    }
  });
});

export const myownPosts = (showPosts, containerPost, user) => db().collection('posts').where('uid', '==', user).onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
      // console.log('change', change);
      /*
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.prepend(thisPost);
      */
    } else if (change.type === 'removed') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
    } else if (change.type === 'modified') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
      showPosts(change.doc);
    }
  });
});

export const deletePosts = (idPost) => {
  db().collection('posts').doc(idPost).delete();
};

export const updatePost = (id, updatedText) => {
  db().collection('posts').doc(id).update(updatedText);
};
