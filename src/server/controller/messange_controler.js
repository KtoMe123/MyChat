
const db = require('../data_base')

class mesController {
  async getMes(req, res) {
    const mess = await db.query('SELECT * FROM messages')
    res.json(mess.rows)
  }
  async getOneMes(req, res) {
    const u_to = req.params.u_to
    const mess = await db.query('SELECT * FROM messages where u_to = $1', [u_to])
    res.json(mess.rows)
  }
  async ViewMessage(req, res) {
    const {seen, u_to, u_from} = req.body
    const mess = await db.query('UPDATE messages SET seen = $1 where u_to = $2 AND u_from = $3 RETURNING *', [seen, u_to, u_from])
    res.json(mess.rows)
  }

  async CreateMes(req, res) {
    const {id, message, u_from, u_to, seen}= req.body
    const NewMes = await db.query('INSERT INTO messages (id, message, u_from, u_to, seen) values ($1, $2, $3, $4, $5) RETURNING *', [id, message, u_from, u_to, seen])
    res.json(NewMes)
  }
  async DeleteMess(req, res) {
    const seen = req.params.seen
    const DelMess = await db.query('DELETE FROM messages where seen = $1', [seen])
    res.json(DelMess.rows[0])
  }

}

module.exports = new mesController()