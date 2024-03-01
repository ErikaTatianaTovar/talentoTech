const UserSchema = require('../models/User');
const MessageSchema = require('../models/Message');
const HousingSchema = require('../models/Housing');

const resolvers = {
    hello: () => {
        return 'Hello World!';

    },
    User: async(_, {id}) => {
        try {
            return user = await UserSchema.findById(id);

        } catch(e) {
            console.log(e)
        }
    },
    Users: async() => {
        try {
            return await UserSchema.find();
        }
        catch(e) {
            console.log(e)
        }
    },
    UsersByFilter: async(_, {filter}) => {
        try{
            let query = {};
            if(filter){
            if(filter.name){
                query.name = {$regex: filter.name, $options: 'i'}
            }
            if(filter.email){
                query.email = {$regex: filter.email, $options: 'i'}
            }
            if(filter.lastName){
                query.lastName = {$regex: filter.lastName, $options: 'i'}
            }
            const users = await UserSchema.find(query)
            return users;
        }
        }catch(e){
            console.log("Error buscando usuario por filtro: ", e)
        }
    },

    Message: async (_, { id }) => {
        try {
            return message = await MessageSchema.findById(id).populate({
                path: 'from',
                select: '-password'
            })
                .populate({
                    path: 'to',
                    select: '-password'
                });
        } catch (e) {
            console.log(e)
        }
    },
    Messages: async () => {
        try {
            return await MessageSchema.find().populate({
                path: 'from',
                select: '-password'
            })
                .populate({
                    path: 'to',
                    select: '-password'
                });
        }
        catch (e) {
            console.log(e)
        }
    },
MessagesByFilter: async (_, {filter}) => {
    try{
        let query = {};
        if(filter){
        if(filter.from){
            query = {from: filter.from}
        }
        if(filter.to){
            query = {to: filter.to}
        }
        if(filter.body){
            query.body = {$regex: filter.body, $options: 'i'}
        }
        const messages = await MessageSchema.find(query).populate('from')
        .populate ({
            path: 'to',
            select: '-password'
        })
        return messages;
    }
    }catch(e){
        console.log("Error buscando mensajes por filtro: ", e)
    }

},

MessagesByUser: async (_,{ userId }) => {
    try {
        const user = await UserSchema.findById(userId);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const messages = await MessageSchema.find({ $or: [{ from: userId }, { to: userId }] })
        .populate("from")
        .populate("to");

        if (!messages) {
            throw new Error('Messages not found');
        }

        return messages;
    } catch (error) {
        console.error("Error al buscar mensajes por usuario:", error);
        throw error;
    }
},

House: async(_, {code}) => {
    try {
        return house = await HousingSchema.findOne({code: code});

    } catch(e) {
        console.log(e)
    }
},
Housing: async() => {
    try {
        return await HousingSchema.find();
    }
    catch(e) {
        console.log(e)
    }
},
HousingByFilter: async(_, {filter}) => {
    try{
        let query = {};
        if(filter){
        if(filter.type){
            query.type = {$regex: filter.type, $options: 'i'}
        }
        if(filter.state){
            query.state = {$regex: filter.state, $options: 'i'}
        }
        if(filter.city){
            query.city = {$regex: filter.city, $options: 'i'}
        }
        if(filter.address){
            query.address = {$regex: filter.address, $options: 'i'}
        }
        if(filter.zip_code){
            query.zip_code = {$regex: filter.zip_code, $options: 'i'}
        }
        if(filter.price){
            query.price = {$regex: filter.price, $options: 'i'}
        }
        if(filter.size){
            query.size = {$regex: filter.size, $options: 'i'}
        }
        if(filter.rooms){
            query.rooms = {$regex: filter.rooms, $options: 'i'}
        }
        if(filter.bathrooms){
            query.bathrooms = {$regex: filter.bathrooms, $options: 'i'}
        }
        if(filter.parking){
            query.parking = {$regex: filter.parking, $options: 'i'}
        }
        const housing = await HousingSchema.find(query)
        return housing;
    }
    }catch(e){
        console.log("Error buscando la vivienda por filtro: ", e)
    }
},

};


module.exports = resolvers

