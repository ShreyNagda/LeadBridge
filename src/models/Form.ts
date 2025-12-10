import mongoose, { Schema, model, models } from "mongoose";

const FormSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Form name is required"],
    },
    description: {
      type: String,
    },
    settings: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = models.Form || model("Form", FormSchema);

export default Form;
