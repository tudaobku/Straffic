# Straffic-server

Phần server cung cấp api cho ứng dụng Straffic
url: http://straffic.herokuapp.com/

**1. POST /login:**

- req:
  - username: String
  - password: String
- res:
  - success: {
    message: "success",
    userToken: token,
    username: username,
    }
  - not success: status 401 and massage: "User not exist!"

**2. Auth: Check auth for all api request except POST /login request (with req.headers["authorization"])**

- not success:

  - token is null: status 401

  - wrong token: status 403

**3. POST /profile:**

- res: object with keys: BirthDate, CreateAt, Id, IdNo, Name, Ranks, Religion, Sex, UpdateAt, UrlAvatar, WorkPlace, username
