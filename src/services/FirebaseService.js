const app = 'https://group-foundation-b.firebaseIO.com';
import Firebase from 'firebase';
import Fireproof from 'fireproof';

let ref = new Firebase(app);

export default new Fireproof(ref);