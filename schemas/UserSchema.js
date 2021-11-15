const mongoose = require("mongoose");

Schema = mongoose.Schema;

var UserSchema = Schema({
    username: mongoose.Schema.Types.String,
    discordId: {type: mongoose.Schema.Types.String, required: true},
    currentStreak: Number
});

module.exports = mongoose.model('Users', UserSchema);