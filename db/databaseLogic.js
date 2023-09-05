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
        // let results = await db.oneOrNone(`SELECT id FROM town_table WHERE town_tag = $1`, [townTag])
        return results ? results.id : null;
    }
     async function getAllTowns(){
        return await db.any(`SELECT * FROM registration_table`)
     }

    async function filterTowns(townTag) {
        let idResult = await getTownId(townTag);
        if (idResult === null) {
            return [];
        }
        let results = await db.oneOrNone(`SELECT registrations from registration_table where town_id = $1`, [idResult]);
        return results ? results.registrations : [];
    }

    return {
        insertRegData,
        getTownId,
        filterTowns,
        getAllTowns

    }

}