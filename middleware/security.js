let WORKING_DIR = '/';

const accessChecker = () => {
    if(localStorage.getItem('connectedUser') && localStorage.getItem('connectedUser').token){
        if(localStorage.getItem('connectedUser').accountType === 1)
            WORKING_DIR = '/Staffs';
        else if(localStorage.getItem('connectedUser').accountType === 2)
            WORKING_DIR = '/Director';
        else if(localStorage.getItem('connectedUser').accountType === 3)
            WORKING_DIR = '/Admin';
        else
            WORKING_DIR = '/';
    }
    
    return WORKING_DIR;
}

export default { WORKING_DIR, accessChecker };