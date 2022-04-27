import aws from 'aws-sdk';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()

const cognito = new aws.CognitoIdentityServiceProvider({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
});
const jwks_url = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`;
const jwks = await fetch(jwks_url).then(r => r.json());
const getKey = (header, callback) => {
        const kid = header.kid;
        const key = jwks.keys.find(k => k.kid === kid);
        if (!key) return callback(new Error('Public key not found in jwks.json'));
        return callback(null, key);
}
const verify = (token, callback) => {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, callback);
}
const getUser = (token) => {
        return new Promise((resolve, reject) => {
                verify(token, (err, decoded) => {
                        if (err) return reject(err);
                        resolve(decoded);
                });
        });
}
export default {
        getUser,
        getKey,
        verify
}