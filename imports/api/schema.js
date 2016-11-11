import { Random } from 'meteor/random';
import { Products } from '/imports/data/pg-connector';

export const typeDefs = [`

    type Email {
      address: String
      verified: Boolean
    }

    type User {
      emails: [Email]
      username: String
      randomString: String
      _id: String
    }

    type Product {
      id: String,
      title: String,
      description: String,
      price: String,
      createdAt: String
    }

    type Query {
      user(id: String!): User,
      products: [Product]
    }

    schema {
      query: Query
    }

`];

export const resolvers = {
  Query: {
    user(root, args, context) {
      // console.log(" context ");
      // console.log(context);
      // Only return the current user, for security
      if (context && context.userId === args.id) {
        return context.user;
      }
    },
    async products(root, args) {
      return Products.findAll({});
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
}
