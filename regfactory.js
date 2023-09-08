export default function Registrations(registrationModule) {
    const regex = /([A-Z]{2} \d{3,}[-\s]?\d{3,})+/g;
    let registrationNumbers = [];

    async function insertRegistration(regNo) {
        const formattedRegNo = regNo.toUpperCase();
        registrationNumbers.push(formattedRegNo);
        return formattedRegNo;
    }

    async function getReg(regNo) {
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);
        return isValidFormat;
    }
    async function checkPlate(regNo) {
        let checked = regex.test(regNo)
        let checking = await registrationModule.checkAllPlates(regNo)
        if (checked) {
            
        }

    }
    async function errors(req, res) {
      //  let townAvail = await registrationModule.getAllTown()
        let townId = req.body;
        let errorMessage = ""
        const { registrationNumber } = req.body;
        if(registrationNumber.length <1){
            errorMessage = "Please enter registration"
        }
        if(!townId){
          errorMessage = "No Registration plates found"  
            
        }
        return errorMessage
    }
    return {
        insertRegistration,
        getReg,
        errors,
        checkPlate

    };
}