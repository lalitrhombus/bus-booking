import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

let userName, token, tripId;

describe('Test Trip module', () => {
  it('should create users using Unauthenticated Methord..', () =>
    request(Server)
      .post('/api/v1/users-old/')
      .send({
        name: 'alpha',
        email: 'alpha@gmail.com',
        contactNumber: '8743850717',
        password: 'alpha',
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.name).equal('alpha');
        userName = r.body.userName;
      }));

  it('Should be able to Login using Given Credential', () =>
    request(Server)
      .post('/api/v1/auth/')
      .send({
        userName,
        password: 'alpha',
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.userName).equal(userName);
        token = r.body.token;
      }));

  it('Should be able to create Trip', () =>
    request(Server)
      .post('/api/v1/trips/')
      .set('Authorization', token)
      .send({
        startTime: '2016-10-05T14:48:00.000',
        endTime: '2016-10-05T14:48:00.000',
        driverDetails: {
          name: 'suraj',
          phoneNumber: 'mayson',
        },
        vehicleId: 1,
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.startTime).equal('2016-10-05T14:48:00.000Z');
        tripId = r.body.id;
      }));

  it('Should be able to get list of all Trips', () =>
    request(Server)
      .get('/api/v1/trip/')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('array');
      }));

  it('Should be able to get single Trips', () =>
    request(Server)
      .get(`/api/v1/trip/${tripId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.startTime).equal('2016-10-05T14:48:00.000Z');
        expect(r.body.id).equal(tripId);
      }));
});
