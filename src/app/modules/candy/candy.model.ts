import { model, Schema } from "mongoose";
import { TAddress, TCandy, TCandyModel } from "./candy.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import moment from "moment";

const addressSchema = new Schema<TAddress>(
  {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CandySchema = new Schema<TCandy,TCandyModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: addressSchema,
    location: {
      coordinates: [Number],
      type: { type: String, default: "Point" },
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// filter out deleted documents
CandySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CandySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CandySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});



CandySchema.statics.isCandyExistWithSameDate = async function (userId: string,date:string) {
  return await Candy.findOne({ user:userId,date:moment(date).format("YYYY-MM-DD") });
};
export const Candy = model<TCandy,TCandyModel>("Candy", CandySchema);
