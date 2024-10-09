import mongoose, { Schema, model, Types } from 'mongoose'

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    groupAvatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

export const Chat = mongoose.models.Chat || model('Chat', chatSchema)
