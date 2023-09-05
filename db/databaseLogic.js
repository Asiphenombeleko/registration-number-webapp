export default function DbRegistration(db) {
    async function insertRegData(regNo) {

        let town_id = await getTownId(regNo);
        await db.none(`
          INSERT INTO registration_table (registrations, town_id)
          VALUE($1, $2)`, [regNo, town_id])
    }

    async function getTownId(regNo) {
        let townTag = regNo.substring(0, 2)
        let results = await db.oneOrNone(`SELECT id from town_table WHERE town_tag = $1`, [townTag])
        return results ? results.id : null;
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
        filterTowns

    }

}