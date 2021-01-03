import firebase, { db } from '@/plugins/firebase';
export class User {
    constructor(name, createdAt, updatedAt) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
export const converter = {
    toFirestore: (model, setOptions) => {
        if (setOptions?.merge) {
            const m = Object.assign(model, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            console.log(m);
            return m;
        }
        return {
            name: model.name,
            createdAt: model.createdAt || firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: model.updatedAt || firebase.firestore.FieldValue.serverTimestamp()
        };
    },
    fromFirestore: (snapshot) => {
        const data = snapshot.data();
        return new User(data.name, data.createdAt.toDate(), data.updatedAt.toDate());
    }
};
export default db.collection('users').withConverter(converter);
//# sourceMappingURL=users.js.map