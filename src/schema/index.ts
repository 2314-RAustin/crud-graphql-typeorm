import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GREETING } from './Queries/Greeting';
import { GET_ALL_USERS, GET_A_SINGLE_USER } from './Queries/User';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './Mutations/User';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: GREETING,
        get_all_users: GET_ALL_USERS,
        get_a_single_user: GET_A_SINGLE_USER
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})