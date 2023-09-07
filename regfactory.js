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
    async function errors(){

    }
    return {
        insertRegistration,
        getReg,
        errors
       
    };
}