import { GraphQLID, GraphQLList } from "graphql";
import { Users } from '../../Entities/Users';
import { UserType } from "../typeDefs/User";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {
        return Users.find();
    }
}

export const GET_A_SINGLE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_: any, args: { id: number }) {
        return Users.findOneBy({ id: args.id });
    }
}