import express, {Request,Response, NextFunction } from 'express'
const app = express();
const port = 3000
//at first use parser to parse json and text file than create router than as well use them than request and logger is used to next file and 


//parser 
  app.use(express.json())
  app.use(express.text())
//create router 
const userRoute = express.Router();
const courseRouter = express.Router()

//use them 
app.use('/api/v1/users/',userRoute);
app.use('/api/v1/courses',courseRouter);


userRoute.post('/create-user',(req:Request,res:Response)=>{
  const user = req.body;
  console.log(user);
  res.json({
    success:true,
    message:'user created successfully',
    data:user,
  })
})

courseRouter.post('/courses',(req:Request,res:Response)=>{
  const  course = req.body;
  console.log(course)
  res.json({
    success:true,
    message:'course is created',
    data:course
  })
})
const logger = (req:Request,res:Response,next:NextFunction)=>{
  console.log(req.url, req.method);
  next()
}
app.get('/',logger, async(req, res,next) => {
   try{

     res.send('something');
   }
   catch(err){
    console.log(err)
    next(err)
    // res.status(400).json({
    //   success:false,
    //   message:'failed to get data'
    // })
   }
})
app.post('/',logger,(req:Request, res: Response)=>{
  console.log(req.body);
  res.send('got data');
  })

  app.all("*",(req:Request,res:Response)=>{
    res.status(400).json({
      success:false,
      message:'Route is not found'
    })
  })
  
  //global error handler 

  app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(error)
    if(error){
      res.status(400).json({
        success:false,
        message:'somthing went wrong'
      })

    }
  })
export default app;
