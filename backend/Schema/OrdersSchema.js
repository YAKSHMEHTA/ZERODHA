import { Schema } from "mongoose";

const OrdersSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
}) 

moduel.export = {OrdersSchema}