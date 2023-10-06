
const db = require('../data_base')

class userController {
  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM userinfo')
    res.json(users.rows)
  }
  async getMainUsers(req, res) {
    const users = await db.query('SELECT * FROM mainusers')
    res.json(users.rows)
  }
  async getOneMainUser(req, res) {
    const mail = req.params.mail
    const user = await db.query('SELECT * FROM mainusers where mail = $1', [mail])
    res.json(user.rows)
  }
  async getOneUser(req, res) {
    const id = req.params.name
    const user = await db.query('SELECT * FROM userinfo where name = $1', [id])
    res.json(user.rows)
  }
  async updateUser(req, res) {
    const {id, messages} = req.body
    const user = await db.query('UPDATE userinfo set messages = $1 where id = $2 RETURNING *', [messages, id])
    res.json(user.rows[0]) 
  }
  async addCon(req, res) {
    const {contact, mail } = req.body
    const user = await db.query('UPDATE mainusers set contact = $1 where mail = $2 RETURNING *', [contact, mail])
    res.json(user.rows[0])
  }
  async CreateUser(req, res) {
    const {username, mail, password, phone, contact} = req.body
    const NewUser = await db.query('INSERT INTO mainusers (username, mail, password, phone, contact) values ($1, $2, $3, $4, $5) RETURNING *', [username, mail, password, phone, contact])
    res.json(NewUser)
  }
  async DeleteUser(req, res) {
    const id = req.body.id
    const user = await db.query('DELETE FROM mainusers where id = $1', [id])
    res.json(user)
  }
}

module.exports = new userController()