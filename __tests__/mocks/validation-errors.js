module.exports = {
  register : {
    emptyEmailNicknamePassword: {
        "code": 400,
        "message": "Validation error!",
        "errors": [
            {
                "field": [
                    "email"
                ],
                "location": "body",
                "messages": [
                    "\"email\" is required"
                ],
                "types": [
                    "any.required"
                ]
            },
            {
                "field": [
                    "nickname"
                ],
                "location": "body",
                "messages": [
                    "\"nickname\" is required"
                ],
                "types": [
                    "any.required"
                ]
            },
            {
                "field": [
                    "password"
                ],
                "location": "body",
                "messages": [
                    "\"password\" is required"
                ],
                "types": [
                    "any.required"
                ]
            }
        ]
    },

    wrongEmail_emptyNicknamePassword: {
        "code": 400,
        "message": "Validation error!",
        "errors": [
            {
                "field": [
                    "email"
                ],
                "location": "body",
                "messages": [
                    "\"email\" must be a valid email"
                ],
                "types": [
                    "string.email"
                ]
            },
            {
                "field": [
                    "nickname"
                ],
                "location": "body",
                "messages": [
                    "\"nickname\" is required"
                ],
                "types": [
                    "any.required"
                ]
            },
            {
                "field": [
                    "password"
                ],
                "location": "body",
                "messages": [
                    "\"password\" is required"
                ],
                "types": [
                    "any.required"
                ]
            }
        ]
    },

    wrongNickname_emptyPassword: {
        "code": 400,
        "message": "Validation error!",
        "errors": [
            {
                "field": [
                    "nickname"
                ],
                "location": "body",
                "messages": [
                    "\"nickname\" length must be at least 4 characters long"
                ],
                "types": [
                    "string.min"
                ]
            },
            {
                "field": [
                    "password"
                ],
                "location": "body",
                "messages": [
                    "\"password\" is required"
                ],
                "types": [
                    "any.required"
                ]
            }
        ]
    },

    wrongPassword: {
        "code": 400,
        "message": "Validation error!",
        "errors": [
            {
                "field": [
                    "password"
                ],
                "location": "body",
                "messages": [
                    "\"password\" length must be at least 6 characters long"
                ],
                "types": [
                    "string.min"
                ]
            }
        ]
    },

    emailAlreadyExists: {
        "code": 409,
        "message": "Validation Error",
        "errors": [
            {
                "field": "email",
                "location": "body",
                "messages": [
                    "\"email\" already exists"
                ]
            }
        ]
    }
  },
  login: {
    emptyEmailPassword: {
      "code": 400,
      "message": "Validation error!",
      "errors": [
          {
              "field": [
                  "email"
              ],
              "location": "body",
              "messages": [
                  "\"email\" is required"
              ],
              "types": [
                  "any.required"
              ]
          },
          {
              "field": [
                  "password"
              ],
              "location": "body",
              "messages": [
                  "\"password\" is required"
              ],
              "types": [
                  "any.required"
              ]
          }
      ]
    },
    wrongEmail_emptyPassword: {
      "code": 400,
      "message": "Validation error!",
      "errors": [
          {
              "field": [
                  "email"
              ],
              "location": "body",
              "messages": [
                  "\"email\" must be a valid email"
              ],
              "types": [
                  "string.email"
              ]
          },
          {
              "field": [
                  "password"
              ],
              "location": "body",
              "messages": [
                  "\"password\" is required"
              ],
              "types": [
                  "any.required"
              ]
          }
      ]
    },
    wrongPassword: {
      "code": 400,
      "message": "Validation error!",
      "errors": [
          {
              "field": [
                  "password"
              ],
              "location": "body",
              "messages": [
                  "\"password\" length must be at least 6 characters long"
              ],
              "types": [
                  "string.min"
              ]
          }
      ]
    }
  }
};



// {
//     "user": {
//         "_id": "5aba1c7e740ab30058de2a4e",
//         "email": "jekatka@gmail.com",
//         "nickname": "tester",
//         "password": "e\ufffd\ufffd\ufffd\r\ufffd\ufffd\ufffd\ufffd\ufffd}G(\ufffd$\ufffd:O)\ufffd\ufffd[$\ufffd2s\ufffd\u001d\ufffd$\ufffd\u0005,\ufffd\ufffdW53\ufffd\n\ufffd\ufffd\u0014\u00061\ufffdD\ufffdԏ\ufffd\ufffd\tr+g\u0011\ufffd\ufffdZ\u0000\ufffdD\ufffd3\ufffdq\ufffd\u0012\u0005̅w\u0012\ufffd\f\ufffd\ufffd\u0013`2\ufffd\ufffd\u001b\ufffd؊\ufffd\ufffd\u001bLi\ufffd\ufffd\u0014\ufffd\u0007\ufffd:\u0006ˀ\ufffd\ufffde7\u0016\t\ufffd\ufffd\ufffdP\ufffd\ufffd\ufffd\ufffd\u0019P1\ufffd\u0011F\ufffd",
//         "createdAt": "2018-03-27T10:27:10.228Z",
//         "updatedAt": "2018-03-27T10:27:10.228Z",
//         "salt": "YDL/67jFWhgLinWPMtUw5XteCtuROafFC+uRZIXsT7VDkQj7paz3HtCQwLAMuiRzwai30xUZPUEKPmEbmJl7Rh0LeTSoYe+zZonJ5USMInvFj4WZ8hG1bV9kzY5l2UmseHfs767HbG9PUSCx8M+dOeJKQ/gAR9TGljbKMc0Nz6Y="
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmExYzdlNzQwYWIzMDA1OGRlMmE0ZSIsImlhdCI6MTUyMjE0NjQzMH0.9pqgHzvMsfikWlEPDZdHJAsyPtHR-yqPoAnHfzvYH6A"
// }
