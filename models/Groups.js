const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { findOneAndRemove } = require('../Util/updateModels');
const User = require('./User');

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    members: {
      type: [String],
      set: (names) => {
        return names.map((name) => {
          const loweredCaseName = name.toLowerCase();
          return `${loweredCaseName
            .charAt(0)
            .toUpperCase()}${loweredCaseName.slice(1)}`;
        });
      },
    },
    description: String,
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    settles: [{ type: Schema.Types.ObjectId, ref: 'Settle' }],
    date: Date,
    // total: Number,
  },
  {
    timestamp: true,
  }
);

groupSchema.post('findOneAndDelete', async (doc) => {
  try {
    const user = await User.findById(doc.owner);
    findOneAndRemove(user.groups, doc._id);
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

const Group = model('Group', groupSchema);

module.exports = Group;
