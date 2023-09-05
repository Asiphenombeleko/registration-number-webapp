export default function Registrations(registrationModule) {
    const regex = /^[A-Z]{2}\s\d{3}\s\d{3}$/;
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

    async function filterTowns() {
    }

    async function getFilteredTown() {
    }

    async function errors(regNo) {
        let errorMessage = '';
        if (
            !registrationNumbers.includes(regNo.toUpperCase()) ||
            !regex.test(regNo.toUpperCase())
        ) {
            errorMessage = 'Invalid registration number';
        }
        return errorMessage;
    }

    async function reset() {
        registrationNumbers = [];
    }

    return {
        insertRegistration,
        getReg,
        filterTowns,
        getFilteredTown,
        errors,
        reset,
    };
}