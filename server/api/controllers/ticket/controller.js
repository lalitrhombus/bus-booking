import dbService from '../../services/db.service';

export class Controller {
  all(req, res) {
    dbService.all('Booking').then((r) => res.json(r));
  }

  byId(req, res) {
    dbService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    dbService
      .create(req.body.name)
      .then((r) =>
        res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
      );
  }
}
export default new Controller();
