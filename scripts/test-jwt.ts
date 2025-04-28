import * as jwt from 'jsonwebtoken';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiZW1haWwiOiJqYmJhbG1vbnRAZ21haWwuY29tIiwiaWF0IjoxNzEyODEyNTIwfQ.SdloN_KPfO5dn3lAZBBN77rl9akbRkeZj_3rPzt_CXE';
const secret = 'ma-super-clé-de-déchiffrage_basée-sur-une-phrase-sans-sens';

try {
  jwt.verify(token, secret);
} catch (err) {
  console.error('❌ Token rejected :', err.message);
}
