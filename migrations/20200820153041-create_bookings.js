module.exports = {
  async up(db) {
    await db.collection('bookings').insertMany(
      [
        {
          referenceId: 'booking0',
          bookingDate: Date(),
          payment: 530,
          vehicle: 'bus1',
          seats: ['A1', 'A3'],
          status: 'BOOKED',
          passengerDetails: [
            {
              name: 'lalit12',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
            {
              name: 'lalit0',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
          ],
          createdBy: 1,
          updatedBy: 2,
        },
        {
          referenceId: 'booking1',
          bookingDate: Date(),
          payment: 530,
          vehicle: 'bus1',
          seats: ['A1', 'A3'],
          status: 'BOOKED',
          passengerDetails: [
            {
              name: 'lalit',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
            {
              name: 'lalit1',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
          ],
          createdBy: 1,
          updatedBy: 2,
        },
        {
          referenceId: 'booking2',
          bookingDate: Date(),
          payment: 530,
          vehicle: 'bus1',
          seats: ['A1', 'A3'],
          status: 'BOOKED',
          passengerDetails: [
            {
              name: 'lalit2',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
            {
              name: 'lalit3',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
          ],
          createdBy: 1,
          updatedBy: 2,
        },
        {
          referenceId: 'booking3',
          bookingDate: Date(),
          payment: 530,
          vehicle: 'bus1',
          seats: ['A1', 'A3'],
          status: 'BOOKED',
          passengerDetails: [
            {
              name: 'lalit4',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
            {
              name: 'lalit5',
              age: 26,
              contact: '8743850717',
              gender: 'M',
              isSeniorCitizen: true,
              specialDetails: ['DOCTOR', 'LAW_ENFORCEMENT'],
            },
          ],
          createdBy: 1,
          updatedBy: 2,
        },
      ],
      { $set: { blacklisted: true } }
    );
  },

  async down(db) {
    await db.collection('bookings').remove({});
  },
};
