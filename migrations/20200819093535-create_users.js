module.exports = {
  async up(db) {
    await db.collection('users').insertMany(
      [
        {
          name: 'test user1',
          email: 'test_user1@gmail.com',
          contactNumber: '1234567890',
          password: 'abcd1', // lets keep this as plain string
        },
        {
          name: 'test user2',
          email: 'test_user2@gmail.com',
          contactNumber: '1234567890',
          password: 'abcd2', // lets keep this as plain string
        },
        {
          name: 'test user3',
          email: 'test_user3@gmail.com',
          contactNumber: '1234567890',
          password: 'abcd3', // lets keep this as plain string
        },
        {
          name: 'test user4',
          email: 'test_user4@gmail.com',
          contactNumber: '1234567890',
          password: 'abcd4', // lets keep this as plain string
        },
      ],
      { $set: { blacklisted: true } }
    );
  },

  async down(db) {
    await db.collection('users').remove({});
  },
};
