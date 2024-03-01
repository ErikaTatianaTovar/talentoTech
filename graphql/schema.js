//para provar, en el navegadro localhost:3000/graphql y se hacen peticiones
const { GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema } = require('graphql')

const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        avatar: { type: GraphQLString }
    }
})

const Message = new GraphQLObjectType({
    name: 'Message',
    fields: {
      _id: { type: GraphQLString},
      body: { type: GraphQLString},
      from: { type: User},
      to: { type: User},
      readed: {type: GraphQLBoolean}
    }
  })
  

const Housing = new GraphQLObjectType({
    name: 'House',
    fields: {
        _id: { type: GraphQLID },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        zip_code: { type: GraphQLString },
        code: { type: GraphQLString },
        rooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        price: { type: GraphQLInt },
        image: { type: GraphQLString }
    }
})
const UserFilterInput = new GraphQLInputObjectType({
    name: 'UserFilterInput',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },

    }
})

const MessageFilterInput = new GraphQLInputObjectType({
    name: 'MessageFilterInput',
    fields: {
      body: {type: GraphQLString},
      from: {type: GraphQLString},
      to: {type: GraphQLString}
    }
  })

const HousingFilterInput = new GraphQLInputObjectType({
    name: 'HousingFilterInput',
    fields: {
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        zip_code: { type: GraphQLString },
        code: { type: GraphQLString },
        rooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        price: { type: GraphQLInt },
        image: { type: GraphQLString }
    }
})
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        Hello: {
            type: GraphQLString,
            resolve: resolvers.hello
        },
        User: {
            type: User,
            resolve: resolvers.User,
            args: {
                id: { type: GraphQLID }
            }
        },
        Users: {
            type: new GraphQLList(User),
            resolve: resolvers.Users
        },

        UsersByFilter: {
            type: new GraphQLList(User),
            resolve: resolvers.UsersByFilter,
            args: {
                filter: { type: UserFilterInput }
            }
        },
        Message: {
            type: Message,
            resolve: resolvers.Message,
            args: {
                id: { type: GraphQLID }
            }
        },
        Messages: {
            type: new GraphQLList(Message),
            resolve: resolvers.Messages,
        },

        MessagesByFilter: {
            type: new GraphQLList(Message),
            resolve: resolvers.MessagesByFilter,
            args: {
              filter: { type: MessageFilterInput }
            }
        },

        MessagesByUser: {
            type: new GraphQLList(Message),
            resolve: resolvers.MessagesByUser,
            args: {
                userId: { type: GraphQLID }
            }
        },
        House: {
            type: Housing,
            resolve: resolvers.House,
            args: {
                  code: { type: GraphQLString }
            }
        },
        Housing: {
            type: new GraphQLList(Housing),
            resolve: resolvers.Housing
        },

        HousingByFilter: {
            type: new GraphQLList(Housing),
            resolve: resolvers.HousingByFilter,
            args: {
                filter: { type: HousingFilterInput }
            }
        },
    })
})

const schema = new GraphQLSchema({
    query: queryType
})

module.exports = schema

/*queries para testear:
traer datos pasando id: 
query{
  User(id: "65ceb797600b0159e555930f"){
    email
  }
}

usuarios pasando id y apellido y filtrando:
query{
  User(id: "65ceb797600b0159e555930f"){
    email
  }
  UsersByFilter (filter: {name: "marc"}) {
    avatar
    lastname
  }
}

usuarios pasando id y email por variable incluyendo y excluyendo información:
query UserName($ID: String!, $withEmail: Boolean!, $skipLastname: Boolean!) {
  User(id: $ID) {
    name
    @include(if: $withEmail) email
    @skip(if: $skipLastname) lastname
  }

  consulta usando el filtro:
  query{
  UsersByFilter(filter: {name: "Marce"}){
    name
    lastname
    email
  }  
}
}*/