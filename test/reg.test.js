import assert from 'assert'
import pgPromise from 'pg-promise';
import database from '../db/databaseLogic.js'
// import { describe } from 'mocha';

const connectionString = process.env.DATABASE_URL || "postgresql://codex:xcode123@localhost:5432/projectdb";

const db = pgPromise()(connectionString);

describe('Registration Data', function(){
    this.timeout(20000)

    beforeEach(async function () {
      await db.none('DELETE FROM registration_table')
  
    })
    let data  = database(db) 
  it('should insert registration data into the database', async () => {
    const regNo = 'CA 123 123';
      const regId = 1
      await data.getTownId(regId)
      
    let regData  = await data.insertRegData(regNo)

    assert.deepEqual(regData.regNo, 'CA 123 123')
    // You can add more assertions to check if the data was inserted correctly.
  });
})