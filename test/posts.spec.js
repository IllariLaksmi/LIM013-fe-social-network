/* eslint-disable indent */
/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
import MockFirebase from 'mock-cloud-firestore';
import { deletePosts, updatePost } from '../src/lib/controllers/home-controller.js';
import { savePost } from '../src/lib/firebase/firestore.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post_1: {
          text: 'HOLA',
          photo: 'no photo',
        },
        post_2: {
          text: 'HELLO',
          photo: 'no photo',
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);

//
describe('Guardar post 3', () => {
  it('Deberia guardar el post en collection posts', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(2);
      })
      .then(() => savePost('Nuevo post', 'no photo', 'no status', 'date', 'id'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find((docPost) => docPost['_data'].text === 'Nuevo post');
        expect(posts._data.length).toBe(3);
        expect(result['_data'].text).toBe('Nuevo post');
        done();
      });
  });
});
/*
describe('Actualizar post_01', () => {
  it('Debería actualizar el post _02', (done) => {
    updatePost('post_1', 'Cambio').then(() => getPosts((data) => {
      const result = data.find((post) => post.id === 'post_1');
      expect(result.text).toBe('cambio');
      done();
    }));
  });
});
*/

describe('Editar post_02', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(3);
      })
      .then(() => {
          updatePost('post_1', { text: 'BYE' });
      })
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find((docPost) => docPost['_data'].text === 'BYE');
        expect(posts._data.length).toBe(3);
        expect(result['_data'].text).toBe('BYE');
        done();
      });
  });
});

describe('Eliminar post_1', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(3);
      })
      .then(() => deletePosts('post_1'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find((docPost) => docPost['_data'].text === 'HOLA');
        expect(posts._data.length).toBe(2);
        expect(result).toBe(undefined);
        done();
      });
  });
});
