import * as jwt from "jsonwebtoken";

// Ta clé directement ici :
const secret = "ma-super-clé-de-déchiffrage_basée-sur-une-phrase-sans-sens";

// Payload à signer
const payload = {
    sub: "user123",
    email: "jbbalmont@gmail.com",
    iat: Math.floor(Date.now() / 1000),
    // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // pour 7 jours, si tu veux
};

// Signature du token
const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
});

console.log("✅ JWT généré :\n");
console.log(token);
