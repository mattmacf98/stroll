import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";
 
export default Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
      strolling: true,
      profilePicId: params.profilePicId as bigint,
      strolls: [],
      lastUpdatedTimestamp: new Date().toISOString()
    };
  },
});