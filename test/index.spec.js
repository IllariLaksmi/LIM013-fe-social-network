import { describe, it } from '@jest/globals';
import { signUpUser, signInUser, signInGoogle } from '../src/lib/firebase/auth.js';
import { savePosts } from '../src/lib/firebase/firestore.js';
// Importamos la función de registro
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('se crea un usuario', () => {
  it('Debería poder registrarse un usuario', () => signUpUser('pepita@gmail.com', 'abc1d')
    .then((res) => {
      expect(res.email).toBe('pepita@gmail.com');
    }));
  it('Debería poder ingresar un usuario', () => signInUser('pepita@gmail.com', 'abc1d')
    .then((res) => {
      expect(res.email).toBe('pepita@gmail.com');
    }));
  it('Debería poder ingresar con google', () => signInGoogle()
    .then((res) => {
      expect(res.isAnonymous).toBe(false);
    }));
  it('Debería poder salir de la cuenta', () => signInGoogle()
    .then((res) => {
      expect(res.isAnonymous).toBe(false);
    }));
});

// Crear post, cambiar post, eliminar post

describe('Se crea un post', () => {
  it('debería poder crear un post', (done) => {
    const data = {
      text: 'hola',
      status: 'privado',
    };
    // en firestore  no existe un post con el texto hola
    firebase.firestore().collection('posts').get()
      .then((result) => {
        console.log(result.data);
        expect(Object.values(result.data).filter((p) => p.status === data.status)).toHaveLength(0);
        return savePosts(data);
      })
      .then(() => firebase.firestore().collection('posts').get())
      .then((result2) => {
        expect(Object.values(result2.data).filter((p) => p.status === data.status)).toHaveLength(1);
        done();
      });
  });
  it('debería poder editar un post', () => {

  });
  it('debería poder eliminar un post', () => {

  });
});
