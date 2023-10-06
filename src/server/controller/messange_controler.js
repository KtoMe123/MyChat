
const db = require('../data_base')

class mesController {
  async getMes(req, res) {
    const mess = await db.query('SELECT * FROM messenge')
    res.json(mess.rows)
  }

  async CreateMes(req, res) {
    const {id, message, u_from, u_to} = req.body
    const NewMes = await db.query('INSERT INTO messenge (id, message, u_from, u_to) values ($1, $2, $3, $4) RETURNING *', [id, message, u_from, u_to])
    res.json(NewMes)
  }

}

module.exports = new mesController()