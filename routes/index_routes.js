export default function regNumbers(registrationModule, Registration) {

    async function All(req, res) {
        let allReg = await registrationModule.getAllTowns();
        let resetMesg = req.flash("reset")[0];
        let errorMessage = req.flash("error")[0];
        console.log(allReg);
        res.render('index', {
            allReg,
            resetMesg,
            errors : errorMessage
        })
    }
    async function insert(req, res) {
        const { registrationNumber } = req.body;
        await registrationModule.insertRegData()
        req.flash("error", registrationModule.errors(registrationNumber))
        console.log(registrationNumber)
        // let checking = await registrationModule.checkAllPlates(registrationNumber)
        if (registrationNumber) {
            await registrationModule.insertRegData(registrationNumber.toUpperCase());
        }
        res.redirect('/')
    }
    async function reset(req, res) {
        let reset = await registrationModule.resetData();
        req.flash("reset", "Successfully reset")
        res.redirect("/")
    }
    async function filters(req, res) {
        let townId = req.body.allTowns;
        let allReg;
        if (townId) {
            allReg = await registrationModule.filterTowns(townId);
        }
        res.render('index', {
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
