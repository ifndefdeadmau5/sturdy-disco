const { ApolloServer, gql } = require("apollo-server");

const Rooms = [
  {
    id: "1",
    name: "Room A",
    address: "J.K. Rowling"
  },
  {
    id: "2",
    name: "Room B",
    address: "J.K. Rowling"
  }
];

const Users = [
  {
    email: "apple@gmail.com"
  }
];

const Reservations = [{ user: Users[0], room: Rooms[0] }];

const typeDefs = gql`
  type User {
    email: String
  }

  type Reservations {
    user: User
    room: Room
  }

  type Room {
    id: ID
    name: String
    address: String
  }

  type Query {
    reservations(email: String): [Reservations]
  }
`;

const resolvers = {
  Query: {
    reservations: (_, args) => {
      return Reservations.filter(v => v.user.email === args.email);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
