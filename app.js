const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const shortid = require('shortid');

const fs = require('fs');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const dbl = './University.json';


app.post('/savedata',async(req,res)=>{
  const data = {
  ...req.body
  };
  const serializedData = JSON.stringify(data, null, 2);
  await fs.writeFileSync('./University.json', serializedData);
  res.status(201).json(data);
})


app.get('/loaddata',async (req,res)=>{
  
    const serializedData = fs.readFileSync(dbl, 'utf8');
    const data = JSON.parse(serializedData);
    
  res.status(201).json(data);
})




app.get('/health',(_req,res)=> {
    res.status(200).json({status:'ok'});
})

const port= process.env.PORt || 4000;

app.listen(port, ()=> {

    console.log(`Server is listenning on port ${port}`);
    console.log(`localhost:${port}`);
});

