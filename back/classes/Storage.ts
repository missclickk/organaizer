import * as Mongoose from 'mongoose';

export class Storage {
    private database;
    private MONGO_URI: string = "mongodb+srv://us:123@organizer.x9hju.mongodb.net/<dbname>?retryWrites=true&w=majority";
    constructor(mDb) {
        this.database = mDb;
    }
    async intitStorage() {
        try {
            await this.database.connect(this.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    static async getItemWithOrConditionally(model, filds, fildsVal, fildsOr, fildsValOr, returnVals:string[] = []){
        try {
            const conditions = filds.map((e, i) => { return { [e]: fildsVal[i] } });
            const conditionsOr = fildsOr.map((e, i) => { return { [e]: fildsValOr[i] } });
            const test = await model.find({}, returnVals.reduce((a, val) => a + ' ' + val, " ")).or([{ $and: conditions }, { $and: conditionsOr }])
            return test;
        }
        catch (e) {
            console.log(e);
            return false;
        }
        
    }
    
static async getItemWithConditionally (model, filds, fildsVal, returnVals = []){
    try {
        const conditions = filds.map((e, i) => { return { [e]: fildsVal[i] } });
        return await model.find({}, returnVals.reduce((a, val) => a + ' ' + val, " ")).and(conditions);

    }
    catch (e) {
        console.log(e);
        return false;
    }
}
static async getAllItems(model, returnVals = []){
    try {

        return await model.find({}, returnVals.reduce((a, val) => a + ' ' + val, " "));
    }
    catch (e) {
        console.log(e);
        return false;
    }
} 
static async  getItemByID(model, id, returnVals= null) {
    try {
        return returnVals === null ?
            await model.findById(id) :
            await model.findById(id, returnVals.reduce((a, val) => a + ' ' + val, " ")).exec();
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
static async  addItem (model, item, returnObj = false){
    try {
        const obj = new model({ ...item });
        await obj.save();
        return returnObj ? obj : true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
static async pushItem(model, query, param, val){
    try {
        const updateDocument = { $push: { [param]: val } };
        await model.updateOne(query, updateDocument)
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
static async deleteItem  (model, query, value)  {
    try {
        await model.deleteOne({ [query]: value });
        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}
static async setItem(model, query, param, val){
    try {
        const updateDocument = { $set: { [param]: val } }
        await model.updateOne(query, updateDocument);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
static async getIncludesItems(model, valName, val, returnVals:string[] =[]){
    try {

        return returnVals.length === 0 ?
            await model.find({ [valName]: { $in: val } }) :
            await model.find({ [valName]: { $in: val } }, returnVals.reduce((a, val) => a + ' ' + val, " "));
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
}

export const storage = new Storage(Mongoose);