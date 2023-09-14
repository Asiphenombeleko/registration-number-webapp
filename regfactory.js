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
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);

        if (!isValidFormat) {
           return 'Invalid registration number format'
        }

        // Assuming registrationModule.checkAllPlates exists, you can call it here.
        const checking = await registrationModule.checkAllPlates(formattedRegNo);

        return checking; // Return the result of checking
    }
     function errorHandling(regNo) {

        let errorMessage = ""
        if(regNo.length < 1){
            errorMessage = "Please enter registration number"
        }
        if(!getReg(regNo)){
            errorMessage = "Please enter valid registration number"
        }

        return errorMessage;
    }
  
    return {
        insertRegistration,
        getReg,
        checkPlate,
        errorHandling
    };
}