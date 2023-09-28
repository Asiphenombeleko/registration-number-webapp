export default function Registrations(registrationModule) {
    let regex = /^C[AEYJLZ][ ]\d{3}[- ]?\d{1,3}$/
    let errorMessage = ''

    async function getReg(regNo) {
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);
        return isValidFormat;
    }
    async function checkPlate(regNo) {
        errorMessage = ""
        const formattedRegNo = regNo.toUpperCase();
        const isValidFormat = regex.test(formattedRegNo);

        if (isValidFormat) {
            if (await registrationModule.checkDuplicates(regNo) == 0) {
               await registrationModule.insertRegData(regNo)
            } else {
                errorMessage = 'Registration number already exists'
                return errorMessage
            }


        } else {
            errorMessage = 'Please enter correct car registration format.'
        }
        return errorMessage
    }
    function errorHandling(regNo) {
        errorMessage ='';

        if (regNo.length < 1) {
            errorMessage = "Please enter registration number"
        }
        if (getReg(regNo) && regNo.length > 12) {
            errorMessage = 'Registration number Too long!!'
        }
        return errorMessage;
    }

    return {
        getReg,
        checkPlate,
        errorHandling
    };
}