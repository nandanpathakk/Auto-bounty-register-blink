import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string

mongoose.connect(MONGO_URI);

const bountySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    link: { type: String, required: false }
  });

  export const Bounty = mongoose.models.Bounty || mongoose.model("Bounty", bountySchema);


