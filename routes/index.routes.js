export default function regNumbers(registrationModule) {

    async function All(req, res) {
        let allReg = await registrationModule.getAllTowns();
        console.log(allReg);
        res.render('index', {
            allReg
        })
    }
    async function insert(req, res) {

        const { registrationNumber } = req.body;
        console.log(registrationNumber)
        await registrationModule.insertRegData(registrationNumber.toUpperCase());

        res.redirect('/')
    }
    async function  reset(req, res) {
        let reset = await registrationModule.resetData();
        res.redirect("/")
      }
    async function filters(req, res) {
        let townId =req.body.allTowns;
        let allReg = await registrationModule.filterTowns(townId);
        res.render('index',{
            allReg
        })
        
    }
    
    return {
        insert,
        All,
        filters,
        reset
    }
}
