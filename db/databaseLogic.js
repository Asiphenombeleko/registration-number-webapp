
export default function DbRegistration(db) {

    async function insertRegData(regNo) {
        let town_id = await getTownId(regNo);
       
        await db.none(`INSERT INTO registration_table (registrations, town_id) VALUES($1, $2)`, [regNo, town_id])
    }

    async function getTownId(regNo) {
        let townTag = regNo.substring(0, 2);
        try{

            let results = await db.oneOrNone(`SELECT id FROM town_table WHERE town_tag = $1`, [townTag])
            return results.id
        }
        catch(errors){
            console.log("error", "please");
        }
    }
    async function getAllTowns() {
        return await db.any(`SELECT * FROM registration_table`)
    }
    // async function checkAllPlates(regNo){
    //     let checkedPlate =  await db.oneOrNone('SELECT * FROM registration_table WHERE registrations = $1', [regNo])
    //     return checkedPlate
    // }

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
        // checkAllPlates

    }

}