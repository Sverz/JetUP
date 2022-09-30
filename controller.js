const db = require('./db')
const cheerio = require('cheerio');
const axios = require('axios');
class UserController {
   async createTeam(req, res) {
      const getHTML = async (url) => {
         const { data } = await axios.get(url);
         return cheerio.load(data);
      };

      const selector = await getHTML(
         `https://jetup.digital/team`
      )

       selector('.text-block-item').each((i, element) => {
         const name = selector(element).find('h2').text();
         const position = selector(element).find('h3').text();
         const description = selector(element).find('p').text();
         db.query('INSERT INTO team (name, position, description) values ($1, $2, $3) RETURNING *', [name, position, description])
      });
   }
   async getTeam(req, res) {
      const teams = await db.query('SELECT * From team')
      res.json(teams.rows)
   }
   async getNameTeam(req, res) {
      const name = req.params.name
      const teams = await db.query('SELECT * From team where name = $1', [name])
      res.json(teams.rows)
   }
   async deleteTeam(req, res) {
      db.query('DELETE FROM team')
      res.json('ALL ARE DELETED ^_^')
   }
}
module.exports = new UserController()