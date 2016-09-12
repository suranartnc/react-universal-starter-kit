import express from 'express';
import passport from 'passport';
import firebase from 'firebase';
import { AUTH_TOKEN } from 'shared/configs/auth';

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
    const customToken = firebase.auth().createCustomToken(req.user.id);
    res.cookie(AUTH_TOKEN, customToken, { maxAge: 60*30*1000, httpOnly: true });
    res.redirect('/');
  });

export default router;