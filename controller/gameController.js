import globalModel from "../model/globalModel.js";
import { mysqlDb } from "../integrations/mysqDb.js";
import { mongoDb } from "../integrations/mongoDb.js";
import Game from "../schemas/gameSchema.js";

const gameController = {};

gameController.createGame = async (req, res) => {
    try {
        const { gameType, players } = req.body;

        // Validate the provided data
        if (!players?.length || !gameType?.trim()) {
            return res.status(400).send({ message: "Missing required fields" });
        }
        if (!(gameType === "chess" || gameType === "tic-tac-toe")) {
            return res.status(400).send({ message: "Game type invalid" });
        }

        const gameObj = {
            gameType,
            userId: req.userId,
            startDate: new Date().getTime(),
            playerStatistics: players.map((player) => {
                return { playerId: player };
            }),
        };

        // Adding new game to the Game Schema
        const newGame = await Game.create(gameObj);

        res.status(200).send({ message: "Game created successfully", game: newGame });
    } catch (error) {
        res.sendStatus(500);
        console.log("=> gameController.createGame :", error.toString());
    }
};

gameController.getUserGames = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetching all the games with the provided userId
        const userGames = await Game.find({ userId }).lean();

        if (userGames.length === 0) {
            return res.status(404).send({ message: "No games found for this user" });
        }

        res.status(200).send({ games: userGames });
    } catch (error) {
        res.sendStatus(500);
        console.log("=> gameController.getUserGames :", error.toString());
    }
};

gameController.updateGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const { playerStatistics, gameResults } = req.body;

        const updatedGameObj = {
            playerStatistics,
            gameResults,
        };

        // Updating the game with new game stats
        const updatedGame = await Game.findByIdAndUpdate(gameId, updatedGameObj, { new: true });
        if (!updatedGame) {
            throw { name: "CastError" };
        }

        res.status(200).send({ message: "Game updated successfully", updatedGame });
    } catch (error) {
        console.log("=> gameController.updateGame :", error.toString());
        if (error.name === "CastError") {
            return res.status(400).send({ message: "Invalid Request" });
        }
        res.sendStatus(500);
    }
};

gameController.deleteGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;

        // Deleting the game
        await Game.findByIdAndDelete(gameId);
        res.status(200).send({ message: "Game deleted successfully" });
    } catch (error) {
        console.log("=> gameController.deleteGame :", error.toString());
        if (error.name === "CastError") {
            return res.status(400).send({ message: "Invalid game ID" });
        }
        res.sendStatus(500);
    }
};

export default gameController;
