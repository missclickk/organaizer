

const checkForEmptyString=str=>str==='';
const passwordsAreEquel=(p,rp)=>p===rp;


export const getErrorList=({email,pas,rPas})=>{
    let errorList=[];
    if(checkForEmptyString(email)||checkForEmptyString(pas)||checkForEmptyString(rPas))
        errorList.push("ЗАПОЛНИТЕ ВСЕ СТРОКИ")
    if(!passwordsAreEquel(pas,rPas))
    errorList.push('ПАРОЛИ НЕ СОВПАДАЮТ')
    return errorList;    
}