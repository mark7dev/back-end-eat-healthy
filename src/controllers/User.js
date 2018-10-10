const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const Controller = {
  index: (request, response) => {
    User
      .find({})
      .exec()
      .then(users => {
        response
          .status(200)
          .json({
            users,
            total: users.length
          });
      })
      .catch(error => {
        response
          .status(500)
          .json({
            error
          });
      });
  },
  create: (request, response) => {
    User
      .find({
        email: request.body.email
      })
      .exec()
      .then(users => {
        if (users.length < 1) {
          const hash = bcrypt.hashSync(request.body.password);

          const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            dateRegister: request.body.dateRegister,
            name: request.body.name,
            lastName: request.body.lastName,
            age: request.body.age,
            gender: request.body.gender,
            company: request.body.company,
            telephone: request.body.telephone,
            email: request.body.email,
            password: hash,
            nutritionist: request.body.nutritionist
          });

          newUser
            .save()
            .then(saved => {
              response
                .status(201)
                .json({
                  message: 'User created successfully.'
                });
            })
            .catch(error => {
              response
                .status(500)
                .json({
                  error
                })
            });
        } else {
          response
            .status(422)
            .json({
              message: 'User already exists.'
            });
        }
      })
      .catch(error => console.log(error));
  },
  remove: (request, response) => {
    User
      .findByIdAndRemove(request.params.userId)
      .exec()
      .then(() => {
        response
          .status(200)
          .json({
            message: 'User was deleted.'
          });
      });
  },

  login: (request, response) => {
    User
      .find({
        email: request.body.email
      })
      .exec()
      .then(user => {
        if (user.length > 0) {

          bcrypt.compare(request.body.password, user[0].password, (error, result) => {
            if (error) {
              return response
                .status(401)
                .json({
                  message: 'Authentication failed.'
                })
            }

            if (result) {
              const token = jwt.sign({
                email: user[0].email,
                userId:  user[0]._id
              }, process.env.JWT_SECRETKEY, {
                expiresIn: '1h'
              });

              return response
                .status(200)
                .json({
                  message: 'Authentication successfull.',
                  token,
                  user
                });
            }

            response
              .status(401)
              .json({
                message: 'Authentication failed.'
              })
          });
        } else {
          response
            .status(422)
            .json({
              message: 'Authentication failed.'
            })
        }
      });
  },

    // getByEmail: (request, response) => {
    //   User
    //   .find(
    //     {email: request.params.useremail}
    //   )
    //   .exec()
    //   .then(user => {
    //     if (error) {
    //       return response
    //       .status(200)
    //       .json({
    //         user
    //       });
    //         // .status(401)
    //         // .json({
    //         //   message: 'Search failed.'
    //         // })
    //     } else {
    //       response
    //       .status(404)
    //       .json({
    //         xxxx
    //       });
    //     }
                        
    //   })
    // }

  getByEmail: (request, response) => {
    User
      .find(
        {email: request.params.useremail}
      )
      .exec()
      .then(user => {
        response
          .status(200)
          .json({
            user
          });
        })
        .catch(error => {
          response
            .status(500)
            .json({
              error
            })
        });
  }
};

module.exports = Controller;