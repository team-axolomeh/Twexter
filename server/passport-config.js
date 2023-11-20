if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("./models/twexterModel.js");

const initializePassport = async (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (user == null) {
        return done(null, false);
      }
      //If the user exists and doesn't have a password, that means it was
      //Created using oauth. Return an error here
      if (!user.password) {
        return done(null, false);
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticateUser,
    ),
  );

  const handleOauthResponse = async (
    externalWebsite,
    id,
    username,
    name,
    done,
  ) => {
    try {
      let query = `SELECT * FROM users WHERE username = $1`;
      let result = await db.query(query, [username]);
      let userResponse = result.rows[0];
      if (userResponse) {
        return done(null, userResponse);
      }
      query = `INSERT INTO users (username) VALUES ($1) RETURNING *;`;
      result = await db.query(query, [username]);
      userResponse = result.rows[0];
      if (userResponse) {
        return done(null, userResponse);
      }
      return done(null, response[0]);
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          if (!profile.id || !profile.emails || !profile.displayName) {
            return done(
              new Error(
                `Unable to retrieve the data required from Google to create an account. ` +
                  `Go to your profile settings, and make sure that your account id, email, ` +
                  `and name are all publicly accessible.`,
              ),
              false,
            );
          }
          await handleOauthResponse(
            "google",
            profile.id,
            profile.email,
            profile.displayName,
            done,
          );
        } catch (err) {
          console.log(err);
          return done(err, false);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) =>
    done(null, await getUserById(id)),
  );
};

initializePassport(
  passport,
  async (newUsername) => {
    try {
      const query = `SELECT* FROM users WHERE username = $1`;
      const result = await db.query(query, [newUsername]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
  async (newId) => {
    try {
      const query = `SELECT* FROM users WHERE _id = $1`;
      const result = await db.query(query, [newId]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
);

module.exports = passport;
