
export default function DbRegistration(db) {

    async function insertRegData(regNo) {
    
        let town_id = await getTownId(regNo);
        
        await db.none(`INSERT INTO registration_table (registrations, town_id) VALUES($1, $2)`, [regNo, town_id]);
      
    }

 async function checkDuplicates(regNo) {
        let checkDuplicates = await db.any('SELECT registrations from registration_table where registrations = $1', [regNo])
        return checkDuplicates.length
    }

    async function getTownId(regNo) {

        if (typeof regNo === 'string') {
            let townTag = regNo.substring(0, 2);

            let results = await db.oneOrNone(`SELECT id FROM town_table WHERE town_tag = $1`, [townTag])

            return results ? results.id : results;
        }
    }
    async function getAllTowns() {
        return await db.any(`SELECT * FROM registration_table`)
    }

    async function filterTowns(townId) {
        return await db.manyOrNone('SELECT registrations FROM registration_table WHERE town_id = $1', [townId])

    }
    async function resetData() {
        await db.none('DELETE FROM registration_table')
    }

    return {
        insertRegData,
        getTownId,
        filterTowns,
        getAllTowns,
        resetData,
        checkDuplicates
    }

}