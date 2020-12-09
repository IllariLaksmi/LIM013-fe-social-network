const firestore = () => firebase.firestore();
const db = firestore;

export const createUserDB = (email, name, userUid, photo) => {
  const data = {
    name,
    email,
    userUid,
    photo,
  };
  return db().collection('users').doc(userUid).set(data)
    .then((response) => console.log(response))
    .catch((error) => console.log('Hubo un error', error));
};

export const savePost = (textValue, photoValue, statusValue, date, id) => {
  firestore().collection('posts').doc(id).set({
    text: textValue,
    photo: photoValue,
    uid: id,
    date,
    status: statusValue,
  });
};

export const savePosts = (textValue, photoValue, statusValue) => {
  const user = firebase.auth().currentUser;
  const date = new Date();
  if (!user) {
    console.log('No hay user');
    return;
  }
  savePost(textValue, photoValue, statusValue, date, user.uid);
};
