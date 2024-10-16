import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [1000, "Content cannot exceed 1000 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Associated blog is required"],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Optional: Indexes for faster queries
commentSchema.index({ author: 1 });
commentSchema.index({ blog: 1 });

// Virtual field to count likes
commentSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

// Pre-remove hook to handle related data (e.g. remove replies when a comment is deleted)
commentSchema.pre("remove", async function (next) {
  try {
    // Remove all replies associated with this comment
    await mongoose.model("Comment").deleteMany({ _id: { $in: this.replies } });
    next();
  } catch (err) {
    next(err);
  }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
