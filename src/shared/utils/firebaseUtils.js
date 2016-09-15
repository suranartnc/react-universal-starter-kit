import firebase from 'firebase'

export class FirebaseAPI {

  static get({ path, sortBy = 'id' }) {
    return firebase
      .database()
      .ref(path)
      .orderByChild(sortBy)
      .once('value')
  }

  static set({ path, value }) {
    return firebase
      .database()
      .ref(path)
      .set(value)
  }

  static update({ updates }) {
    return firebase
      .database()
      .ref()
      .update(updates)
  }

  static createNewKey(entity) {
    return firebase
      .database()
      .ref()
      .child(entity)
      .push()
      .key
  }

  static getCurrentUser() {
    return firebase.auth().currentUser
  }

  static getCurrentUserToken(forceRefresh = true) {
    return firebase.auth().currentUser.getToken(forceRefresh)
  }

  static initAuth() {
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static getAuthProvider(provider) {
    switch (provider) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider()
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
      case 'github':
        return new firebase.auth.GithubAuthProvider()
      default:
        return new firebase.auth.FacebookAuthProvider() 
    }
  }

  static signInWithPopup(providerName) {
    const provider = this.getAuthProvider(providerName)
    return firebase.auth().signInWithPopup(provider)
  }

  static signOut() {
    return firebase.auth().signOut()
  }
}

export function normalize(snapshot, schema) {
  
  let response = null
  let result = []

  if (snapshot.val() !== null) {
    if (schema.type === 'list') {
      snapshot.forEach((childSnapshot) => {
        result.push(childSnapshot.key)
      })
      response = {
        entities: {
          [schema.entities]: snapshot.val()
        }
      }
    } else {
      result = snapshot.key
      response = {
        entities: {
          [schema.entities]: {
            [result]: snapshot.val()
          }
        }
      }
    }
    response.result = result
  }
  return response
}

export function extractUserProperties(firebaseUser) {
  const user = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin'
  ];
  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      user[prop] = firebaseUser[prop];
    }
  });
  return user;
}