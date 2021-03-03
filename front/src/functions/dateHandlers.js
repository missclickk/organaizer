import moment from 'moment'

export const getNumberOfDays = (currentDate = moment()) =>currentDate.add(1,"M").date(1).subtract(1,'d').date();


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
            if(date.weekday()===0){
                return type===Number?{
                    first: clone1.add(-6, "days").date(),
                    last: clone.date()
                }:
                {
                    first: clone1.add(-6, "days"),
                    last: clone
                }
            }
            return type===Number?{
                first: clone1.subtract(clone1.weekday() - 1, "days").date(),
                last: clone.add(7 - clone.weekday(), "days").date()
            }:
            {
                first: clone1.subtract(clone1.weekday() - 1, "days"),
                last: clone.add(7 - clone.weekday(), "days")
            }

}