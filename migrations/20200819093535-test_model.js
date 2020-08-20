module.exports = {
  async up(db) {
    await db
      .collection('albums')
      .insertOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } });
  },

  async down(db) {
    await db
      .collection('albums')
      .insertOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });
  },
};
