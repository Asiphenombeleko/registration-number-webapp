export default function Registrations(registrationModule) {
    let regex = /^C[ALZEJ][ ]\d{3}[- ]?\d{1,3}$/
    let registrationNumbers = [];
    let errorMessage;


    async function getReg(regNo) {
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);
        return isValidFormat;
    }
    async function checkPlate(regNo) {
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);

        if (isValidFormat) {
            console.log("****" + isValidFormat, regNo);

            let result = await registrationModule.insertRegData(regNo)
            console.log(result);
            return result
        }
        else {
            console.log(isValidFormat, regNo);
            errorMessage = 'Please enter correct car registration format.'
        }

    }
    function errorHandling(regNo) {

        if (regNo.length < 1) {
            errorMessage = "Please enter registration number"
        }
        if (getReg(regNo) && regNo.length > 12) {
            errorMessage = 'Too long!!'
        }
        return errorMessage;
    }

    return {
        getReg,
        checkPlate,
        errorHandling
    };
}