const getAllItems = async (model, returnVals = []) => {
    try {

        return await model.find({}, returnVals.reduce((a, val) => a + ' ' + val, " "));
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

const getItemWithConditionally = async (model, filds, fildsVal, returnVals = []) => {
    try {

        const conditions = filds.map((e, i) => { return { [e]: fildsVal[i] } });
        return await model.find({}, returnVals.reduce((a, val) => a + ' ' + val, " ")).and(conditions);

    }
    catch (e) {
        console.log(e);
        return false;
    }
}

const getItemWithOrConditionally = async (model, filds, fildsVal, fildsOr, fildsValOr, returnVals = []) => {
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


const getItemByID = async (model, id, returnVals= null) => {
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
//добавить новый
const addItem = async (model, item, returnObj = false) => {
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

//добавить в уже сущ
const pushItem = async (model, query, param, val) => {
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
const deleteItem = async (model, query, value) => {
    try {
        await model.deleteOne({ [query]: value });
        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}

const setItem = async (model, query, param, val) => {
    try {
        console.log('hi');
        const updateDocument = { $set: { [param]: val } }
        console.log(updateDocument);
        await model.updateOne(query, updateDocument);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}


const getIncludesItems = async (model, valName, val, returnVals = null) => {
    try {

        return returnVals === null ?
            await model.find({ [valName]: { $in: val } }) :
            await model.find({ [valName]: { $in: val } }, returnVals.reduce((a, val) => a + ' ' + val, " "));
    }
    catch (e) {
        console.log(e);
        return false;
    }
}


module.exports = { getItemWithOrConditionally, getIncludesItems, getAllItems, getItemByID, addItem, getItemWithConditionally, pushItem, setItem, deleteItem };