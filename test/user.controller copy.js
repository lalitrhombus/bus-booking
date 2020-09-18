import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

let userName, token, userId;

describe('Test user module', () => {
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

  it('Should return 401 for unauthorised user.', () =>
    request(Server)
      .post('/api/v1/auth/')
      .send({
        userName,
        password: 'adsalpha',
      })
      .then((r) => {
        expect(r.status).equals(401);
      }));

  it('Should be able to create user with login creds', () =>
    request(Server)
      .post('/api/v1/users/')
      .set('Authorization', token)
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
        userId = r.body.id;
      }));

  it('Should not able to create user without login creds', () =>
    request(Server)
      .post('/api/v1/users/')
      .send({
        name: 'alpha',
        email: 'alpha@gmail.com',
        contactNumber: '8743850717',
        password: 'alpha',
      })
      .then((r) => {
        expect(r.status).equals(403);
      }));

  it('Should be able to get list of all users', () =>
    request(Server)
      .get('/api/v1/users/')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('array');
      }));

  it('Should be able to get single user', () =>
    request(Server)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.name).equal('alpha');
        expect(r.body.id).equal(userId);
      }));
});
