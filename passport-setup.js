import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import url from 'url';
import dotenv from 'dotenv'
dotenv.config()

export default function Auth() {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    const TYPEFORM_API_BASE_URL = process.env.TYPEFORM_API_BASE_URL;
    const AUTHORIZATION_URL = url.resolve(TYPEFORM_API_BASE_URL, '/oauth/authorize');
    const TOKEN_URL = url.resolve(TYPEFORM_API_BASE_URL, '/oauth/token');
    const APPLICATION_URL = process.env.APPLICATION_URL;
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;


    passport.use(new OAuth2Strategy({
        authorizationURL: AUTHORIZATION_URL,
        tokenURL: TOKEN_URL,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: APPLICATION_URL + "/callback",
        scope: ["responses:read"],
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken, refreshToken, profile);
        cb(null, {
            "access_token": accessToken
        });
    }
    ));
}