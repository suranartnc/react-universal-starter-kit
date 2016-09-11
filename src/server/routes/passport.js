import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { secretKey } from 'server/configs';
import { AUTH_TOKEN } from 'shared/configs/auth';

function generateToken(user) {
  const token = jwt.sign({
    sub: user._id,
    name: user.name,
    avatar: user.avatar || 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg',
    iat: new Date().getTime()
  }, secretKey);
  return token;
}

const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope: 'email'
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    res.cookie(AUTH_TOKEN, generateToken(req.user), { maxAge: 60*30*1000, httpOnly: true });
    res.redirect('/');
  });

export default router;