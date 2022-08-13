import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({

    item: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;