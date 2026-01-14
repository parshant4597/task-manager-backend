const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },
    dueDate: {
      type: Date
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

/* =======================
   🔴 OVERDUE FUNCTIONALITY
   ======================= */

// Virtual field (NOT stored in DB)
taskSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate) return false;

  return (
    new Date(this.dueDate) < new Date() &&
    this.status !== "Completed"
  );
});

// Enable virtuals in responses
taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
