export default function regNumbers(registrationModule,registrations) {

    async function All(req, res) {
        let allReg = await registrationModule.getAllTowns();
        let resetMesg = req.flash("reset")[0];
        let errorMessage = req.flash("error")[0]

        res.render('index', {
            allReg,
            resetMesg,
            errorMessage
        })
    }
    async function insert(req, res) {
        const  registrationNumber  = req.body.registrationNumber;
        if(registrations.getReg(registrationNumber)){
            await registrationModule.insertRegData(registrationNumber.toUpperCase());
        }
        else{
            req.flash("error" ,registrations.errorHandling(registrationNumber))
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
