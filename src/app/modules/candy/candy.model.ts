import { model, Schema } from "mongoose";
import { TAddress, TCandy } from "./candy.interface";

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
const CandySchema = new Schema<TCandy>(
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

export const Candy = model<TCandy>("Candy", CandySchema);
