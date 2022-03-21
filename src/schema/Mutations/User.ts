import {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../typeDefs/User";
import { MessageType } from "../typeDefs/Messages";
import bcryptjs from "bcryptjs";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
  async resolve(
    _: any,
    args: {
      name: string;
      username: string;
      password: string;
    }
  ) {
    const encryptedPassword = await bcryptjs.hash(args.password, 10);
    const result = await Users.insert({
      ...args,
      password: encryptedPassword,
    });
    return {
      ...args,
      password: encryptedPassword,
      id: result.identifiers[0].id,
    };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(
    _: any,
    args: {
      id: number;
    }
  ) {
    const result = await Users.delete({ id: args.id });
    return result.affected === 1;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: {
      type: GraphQLID,
    },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: {
            type: GraphQLString,
          },
          username: {
            type: GraphQLString,
          },
          oldPassword: {
            type: GraphQLString,
          },
          newPassword: {
            type: GraphQLString,
          },
        },
      }),
    },
  },
  async resolve(
    _: any,
    args: {
      id: number;
      input: {
        name: string;
        username: string;
        oldPassword: string;
        newPassword: string;
      };
    }
  ) {
    const {
      id,
      input: { name, username, oldPassword, newPassword },
    } = args;
    const userFound = await Users.findOneBy({ id });
    if(!userFound) return { success: false, message: "User not found" };
    const isMatch = await bcryptjs.compare(
      oldPassword,
      userFound?.password || ""
    );
    if (!isMatch)
      return { success: false, message: "The old password is incorrect" };

    const encryptedPassword = await bcryptjs.hash(newPassword, 10);
    const result = await Users.update(
        { id },
        {
            name,
            username,
            password: encryptedPassword,
        },
      
    );

    return result.affected === 1
      ? {
          success: true,
          message: "User updated successfully",
        }
      : {
          success: false,
          message: "User result affected 0",
        };
  },
};
