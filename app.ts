import express from 'express';
import cors from 'cors';
import { HOST, PORT } from './src/config/secrets.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
import appRouter from './src/route/index.js';
import { log } from 'console';
app.use('/api',(req, res, next) => {
        console.log("Inside index middleware");
        appRouter(req, res, next);
      });


app.get('/',(req,res,next)=>{
   return res.send('server is working');
});

app.listen(parseInt(PORT!),HOST!,()=>{
        console.log("in app ts");
        console.log(`server is running on http://${HOST}:${PORT}`)
});