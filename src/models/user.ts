import mongoose,{Document, Model, Schema} from "mongoose";


interface UserAttrs {
    email: string;
    password: string;
    fullName: string;
    createdAt?: Date;
}

interface UserDoc extends Document {
    email: string;
    password: string;
    fullName: string;
    createdAt?: Date;
}

interface UserModel extends Model<UserDoc> {
    // build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc>({
    email:{ type: String, required: true, lowercase: true, unique: true},
    password: { type: String, required: true},
    fullName: { type: String, required: true},
    createdAt: { type: Date, default: Date.now}
});

// userSchema.statics.build = function (attrs: UserAttrs):UserDoc  {
//     return new User(attrs);
// };

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserAttrs, UserDoc};