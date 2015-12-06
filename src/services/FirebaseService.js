const app = 'https://blazing-heat-9673.firebaseIO.com';
import Firebase from 'firebase';
import Fireproof from 'fireproof';

let ref = new Firebase(app);

export default new Fireproof(ref);