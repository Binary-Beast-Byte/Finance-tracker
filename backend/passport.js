const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const { Users } = require("./models");

const ClientID = process.env.CLIENT_ID;
const ClientSecret = process.env.CLIENT_SECRET;

// google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: ClientID,
      clientSecret: ClientSecret,
      callbackURL: "https://api.everestsound.com/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        await Users.findOne({
          where: {
            email: profile.emails[0].value,
          },
        }).then(async (data) => {
          if (data) {
            return done(null, data);
          } else {
            //create a user
            await Users.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              profilePicture: profile.photos[0].value,
              password: null,
              provider: "google",
              isVerified: true,
            });
            // res.json({ message: "success" });
            console.log("success");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
  });

  if (user) done(null, user);
});

passport.initialize();

// Custom middleware to handle the login process
const loginMiddleware = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      // Handle authentication failure
      return res.redirect("/login");
    }
    
    // Login the user using req.login
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      
      // Redirect to the authenticated user's page
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

module.exports = {
  loginMiddleware,
};
