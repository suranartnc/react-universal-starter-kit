import firebase from 'firebase';

export class FirebaseAPI {

  static get({ path }) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .once('value')
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

  static getCurrentUserID() {
    return firebase.auth().currentUser.uid
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