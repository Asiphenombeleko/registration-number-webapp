import assert from 'assert'
import pgPromise from 'pg-promise';
import database from '../db/databaseLogic.js'
// import { describe } from 'mocha';

const connectionString = process.env.DATABASE_URL || "postgresql://codex:xcode123@localhost:5432/projectdb";

const db = pgPromise()(connectionString);

describe('Registration Data', function () {
  this.timeout(20000)

  beforeEach(async function () {
    await db.none('DELETE FROM registration_table')

  })
  let data = database(db)
  // it('should insert registration data into the database', async () => {
  //   const regNo = 'CA 123 123';
  //     const regId = 1
  //     await data.getTownId(regId)

  //   let regData  = await data.insertRegData(regNo)

  //   assert.deepEqual(regData.regNo, 'CA 123 123')
  //   // You can add more assertions to check if the data was inserted correctly.
  // });

  describe('getTownId', () => {
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
    it('should return an array of all towns', async () => {
      const towns = await data.getAllTowns();
      assert(Array.isArray(towns));

    });
  });

  describe('filterTowns', () => {
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
    it('should reset the registration data in the database', async () => {
      try {
        await data.resetData();

      } catch (error) {
        assert.fail(error);
      }
    });
  });
});
