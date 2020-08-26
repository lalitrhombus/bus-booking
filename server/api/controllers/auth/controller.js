import dbService from '../../services/db.service';
import jwt from 'jsonwebtoken';

export class Controller {
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;

      const data = await dbService.findOne('User', {
        userName,
        password,
      });

      if (!data) {
        res.status(401).send();
        return null;
      }

      const token = jwt.sign(
        {
          userName,
          id: data.id,
          name: data.name,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      res.json({
        token,
        userName,
      });
    } catch (err) {
      next(err);
    }
  }
}
export default new Controller();
