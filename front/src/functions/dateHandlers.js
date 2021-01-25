import moment from 'moment'

export const getNumberOfDays = (currentDate = moment()) => {
    switch (currentDate.month()) {
        case 0:
           return 31;
           case 1:
            return 28;
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
             return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
        default:break;
    }

}


const getNextDate=(date,num,type)=>{
    return date.add(num,type);
}

const getPrevDate=(date,num,type)=>{
    return date.subtract(num,type);
}



export const changeMonthWithFlag = (flag, date) => {
    return    flag === "next" ?getNextDate(date,1,'M').date(1) : getPrevDate(date,1,'M').date(1);
}

export const changeWeekWithFlag = (flag, date) => {
    return    flag === "next" ? getNextDate(date,7,'d') : getPrevDate(date,7,'d');
}


export const getWeekRange=(date,type=null)=>{
    const clone=moment(date);
    const clone1=moment(date);
            if(date.weekday()==0){
                return type==Number?{
                    first: clone1.add(-6, "days").date(),
                    last: clone.date()
                }:
                {
                    first: clone1.add(-6, "days"),
                    last: clone
                }
            }
            return type==Number?{
                first: clone1.subtract(clone1.weekday() - 1, "days").date(),
                last: clone.add(7 - clone.weekday(), "days").date()
            }:
            {
                first: clone1.subtract(clone1.weekday() - 1, "days"),
                last: clone.add(7 - clone.weekday(), "days")
            }

}

/*   if(flag==='next'){
        console.log(date.format());
    return  mode === "CALENDAR" ? date.add(1, "M") : date.add(7, "d");}
    return  mode === "CALENDAR" ? date.subtract(1, "M") : date.subtract(7, "d");*/ 