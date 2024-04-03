const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/github/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      const password = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ githubId: profile.id });
      if (!user) {
        const newUser = new User({
          first_name: profile.displayName,
          githubId: profile.id,
          username: profile.username,
          usernameLowerCase: profile.username.toLowerCase(),
          email: profile.emails[0].value,
          profile_pic_src: profile.photos[0].value,
          password: hashedPassword,
          date: new Date(),
        });
        await newUser.save();
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

module.exports = passport;