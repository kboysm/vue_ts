// var admin = require("firebase-admin");
import * as admin from "firebase-admin"
import serviceAccount from "../../src/key.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});


export const db = admin.firestore()
export default admin