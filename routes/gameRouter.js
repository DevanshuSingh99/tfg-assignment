import {Router} from 'express'
import gameController from '../controller/gameController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const gameRouter = Router()

gameRouter.use(authMiddleware)

gameRouter.post('/newgame',gameController.createGame)
gameRouter.get('/:userId',gameController.getUserGames)
gameRouter.put('/:gameId',gameController.updateGame)
gameRouter.delete('/:gameId',gameController.deleteGame)

export default gameRouter;