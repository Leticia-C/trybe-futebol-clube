import * as express from 'express';
import teamRouter from './routers/teamsRoters';
import loginRouter from './routers/usersRouters';
import matchesRouter from './routers/matchesRouters';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.loginRouters();
    this.teamRouters();
    this.matchesRouters();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private loginRouters():void {
    this.app.use('/login', loginRouter);
  }

  private teamRouters():void {
    this.app.use('/teams', teamRouter);
  }

  private matchesRouters():void {
    this.app.use('/matches', matchesRouter);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
