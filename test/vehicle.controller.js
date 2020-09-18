import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

let userName, token, vehicleId;

describe('Test Vehicle module', () => {
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

  it('Should be able to create vehicle', () =>
    request(Server)
      .post('/api/v1/vehicles/')
      .set('Authorization', token)
      .send({
        name: 'Blue bus',
        route: 'delhi to mumbai',
        type: 'BUS',
        faciliy: {
          toilet: true,
          Blanket: true,
          water: true,
        },
        rows: 11,
        colums: 6,
        layers: 2,
        seats: [
          {
            name: 'A',
            layer: '1',
            location: ['00', '01', '02'],
            price: 300,
            isBookable: true,
            specialDetails: {
              femaleOnly: true,
              isHAndicapped: true,
              isDriverSeat: false,
            },
          },
          {
            name: 'A',
            layer: '1',
            location: ['00', '01', '02'],
            price: 300,
            isBookable: true,
            specialDetails: {
              femaleOnly: true,
              isHAndicapped: true,
              isDriverSeat: false,
            },
          },
          {
            name: 'B',
            layer: '1',
            location: ['00', '01', '02'],
            price: 300,
            isBookable: true,
            specialDetails: {
              femaleOnly: true,
              isHAndicapped: true,
              isDriverSeat: false,
            },
          },
          {
            name: 'C',
            layer: '1',
            location: ['00', '01', '02'],
            price: 300,
            isBookable: true,
            specialDetails: {
              femaleOnly: true,
              isHAndicapped: true,
              isDriverSeat: false,
            },
          },
          {
            name: 'D',
            layer: '1',
            location: ['00', '01', '02'],
            price: 300,
            isBookable: true,
            specialDetails: {
              femaleOnly: true,
              isHAndicapped: true,
              isDriverSeat: false,
            },
          },
        ],
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.name).equal('Blue bus');
        vehicleId = r.body.id;
      }));

  it('Should be able to get list of all vehicles', () =>
    request(Server)
      .get('/api/v1/vehicles/')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('array');
      }));

  it('Should be able to get single vehicle', () =>
    request(Server)
      .get(`/api/v1/vehicles/${vehicleId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.status).equals(200);
        expect(r.body).to.be.an.an('object');
        expect(r.body.name).equal('Blue bus');
        expect(r.body.id).equal(vehicleId);
      }));
});
