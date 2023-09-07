export default function DbRegistration(db) {

    async function insertRegData(regNo) {

        let town_id = await getTownId(regNo);
        console.log(town_id);
        await db.none(`INSERT INTO registration_table (registrations, town_id) VALUES($1, $2)`, [regNo, town_id])
    }

    async function getTownId(regNo) {
        let townTag = regNo.substring(0, 2);
        console.log(townTag)
        let results = await db.oneOrNone(`SELECT id FROM town_table WHERE town_tag = $1`, [townTag])
        console.log(results);
        return results ? results.id : null;
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
        resetData

    }

}