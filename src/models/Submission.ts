import mongoose, { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = models.Submission || model("Submission", SubmissionSchema);

export default Submission;
