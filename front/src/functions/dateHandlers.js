import moment from 'moment'

export const getNumberOfDays = (currentDate = moment()) =>moment(currentDate).add(1,"M").date(1).subtract(1,'d').date();


const getNextDate=(date,num,type)=>{
    return moment(date).add(num,type);
}

const getPrevDate=(date,num,type)=>{
    return moment(date).subtract(num,type);
}



 const getMonth = (direction, date) => {
    return    direction === "next" ?getNextDate(date,1,'M').date(1) : getPrevDate(date,1,'M').date(1);
}

 const getWeek = (direction, date) => {

     const d=direction === "next" ? getNextDate(date,7,'d') : getPrevDate(date,7,'d');
    return d;
    }


export const getNewDate=(mode,direction,date)=>{
            return mode==="CALENDAR"?getMonth(direction,date):getWeek(direction,date);
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
