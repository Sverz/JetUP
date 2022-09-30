const db = require('./db')
class UserController {
   async createTeam(req, res) {
      const { name, position, description } = req.body
      const newTeam = await db.query('INSERT INTO team (name, position, description) values ($1, $2, $3) RETURNING *', [name, position, description])
      res.json(newTeam.rows[0])
   }
   async getTeam(req, res) {
      const teams = await db.query('SELECT * From team')
      res.json(teams.rows)
   }
   async getNameTeam(req, res) {
      const name = req.params.name
      const teams = await db.query('SELECT * From team where name = $1',[name])
      res.json(teams.rows)
   }
   async deleteTeam(req, res) {
   db.query('DELETE FROM team')
   res.json('ALL ARE DELETED ^_^')
   }
}
module.exports = new UserController()