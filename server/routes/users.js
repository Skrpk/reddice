import express from 'express';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import commonValidations from '../shared/validations/signup';
import User from '../models/user';

const router = express.Router();

function validateInput(data, otherValidations) {
  const { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username },
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'There is a user with such username';
      }

      if (user.get('email') === data.email) {
        errors.email = 'There is a user with such email';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  });
}

router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier },
  }).fetch().then(user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations)
    .then(({ errors, isValid }) => {
      if (isValid) {
        const { username, password, timezone, email } = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        User.forge({
          username,
          timezone,
          email,
          password_digest,
        }, { hasTimestamps: true }).save()
          .then((user) => {
            res.json({ success: true });
          })
          .catch(error => res.status(500).json({ error }));
      } else {
        res.status(400).json(errors);
      }
    })
    .catch()
});

export default router;
