import assert from 'assert'
import pgPromise from 'pg-promise';
import database from '../db/databaseLogic.js'
// import { describe } from 'mocha';

const connectionString = process.env.DATABASE_URL || "postgresql://codex:xcode123@localhost:5432/projectdb";

const db = pgPromise()(connectionString);


describe('insertRegData', () => {
  let data = database(db);

  it('should insert registration data into the database', async () => {
    const regNo = 'CA 123 456';
    const townTag = 'CA';
    const townId = await data.getTownId(townTag);


    try {
      const inserted = await data.insertRegData(regNo, townTag);
      assert(inserted), true;
    } catch (error) {
      assert.fail(error);
    }
  });

  it('should not insert invalid registration data into the database', async () => {
    const invalidRegNo = 'kl 123 45678';
    const townTag = 'kl';

    try {
      const inserted = await data.insertRegData(invalidRegNo, townTag);
      assert.equal(inserted, false);
    } catch (error) {
      assert.fail(error);
    }
  });
});


  describe('getTownId', () => {

  let data = database(db)
    it('should return the town ID for a valid town tag', async () => {
      const townTag = 'CA';
      const townId = await data.getTownId(townTag);
      assert.notStrictEqual(townId, 'CA');

    });

    it('should return null for an invalid town tag', async () => {
      const townTag = 'ZZ';
      const townId = await data.getTownId(townTag);
      assert.strictEqual(townId, null);
    });
  });

  describe('getAllTowns', () => {

  let data = database(db)
    it('should return an array of all towns', async () => {
      const towns = await data.getAllTowns();
      assert(Array.isArray(towns));

    });
  });

  describe('filterTowns', () => {

  let data = database(db)
    it('should return registration data for a specific town', async () => {
      const townId = 1;
      
      const registrations = await data.filterTowns(townId);
      assert(Array.isArray(registrations));

    });

    it('should return an empty array for an invalid town ID', async () => {
      const townId = -1;
      const registrations = await data.filterTowns(townId);
      assert(Array.isArray(registrations) && registrations.length === 0);
    });
  });
  describe('resetData', () => {

  let data = database(db)
    it('should reset the registration data in the database', async () => {
      try {
        await data.resetData();

      } catch (error) {
        assert.fail(error);
      }
    });
  });

