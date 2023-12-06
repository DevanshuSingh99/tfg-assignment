import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    userId: Number,
    gameType: {
        type: String,
        required: true,
        enum: ["csgo", "cod"],
    },
    startDate: {
        type: Date,
        required: true,
    },
    playerStatistics: [
        {
            playerId: {
                type: Number,
                required: true,
            },
            score: {
                type: Number,
                default: 0,
            },
        },
    ],
    gameResults: {
        type: Object,
        default: { winnerId: null, loserId: null },
    },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
