export default function regNumbers(registrationModule, registrations) {

    async function All(req, res) {
        let allReg = await registrationModule.getAllTowns();
        let resetMesg = req.flash("reset")[0];
        let errorMessage = req.flash("error")[0]
        let showReg = !errorMessage;
        console.log(errorMessage);

        res.render('index', {
            display: showReg ? allReg : allReg ,
            resetMesg,
            errorMessage
        })
    }
    async function insert(req, res) {
        const registrationNumber = req.body.registrationNumber;
        if (registrations.getReg(registrationNumber)) {
            let checking = await registrations.checkPlate(registrationNumber.toUpperCase());
            console.log(checking);
            req.flash("error", checking);
        }
        req.flash("errorz", registrations.errorHandling(registrationNumber))

        res.redirect('/')
    }
    async function reset(req, res) {
        await registrationModule.resetData();
        req.flash("reset", "Successfully reset")
        res.redirect("/")
    }
    async function filters(req, res) {
        let errorMessage = '';
        let townId = req.body.allTowns;
        let allReg;
        if (townId) {
            allReg = await registrationModule.filterTowns(townId);
        
        }
        if(allReg.length === 0){
            errorMessage = "No registrations found for the selected town"
        }
        res.render('index', {
           display: allReg,
           errorMessage
        })
    }

    return {
        insert,
        All,
        filters,
        reset
    }
}
