// import { describe, it } from '@jest/globals';
import { signUpUser, signInUser, signInGoogle } from '../src/lib/firebase/auth.js';
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
  it('Debería poder registrarse un usuario', (done) => signUpUser('pepita@gmail.com', 'abc1d')
    .then((res) => {
      expect(res.email).toBe('pepita@gmail.com');
      done();
    }));
  it('Debería poder ingresar un usuario', () => signInUser('pepita@gmail.com', 'abc1d')
    .then((res) => {
      expect(res.email).toBe('pepita@gmail.com');
    }));
  it('Debería poder ingresar con google', () => signInGoogle()
    .then((res) => {
      expect(res.isAnonymous).toBe(false);
    }));
});