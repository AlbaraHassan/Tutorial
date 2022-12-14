import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({


    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart'
    }],

});

const User = mongoose.model('User', UserSchema);

export default User;