import * as jwt from 'jsonwebtoken';

const secret = 'ma-super-clé-de-déchiffrage_basée-sur-une-phrase-sans-sens';

const payload = {
  sub: 'user123',
  email: 'jbbalmont@gmail.com',
  iat: Math.floor(Date.now() / 1000),
  // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 jours
};

const token = jwt.sign(payload, secret, {
  algorithm: 'HS256',
});

console.log('✅ JWT généré :\n');
console.log(token);
