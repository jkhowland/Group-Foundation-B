//for saving in firebase
export default {
  escapeEmail: (email) => (email || '').replace('.', ','),
  unescapeEmail: (email) => (email || '').replace(',', '.')
}
