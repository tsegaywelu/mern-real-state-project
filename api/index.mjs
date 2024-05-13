import express from 'express'

const app =express()

app.get('/api/auth/signup',(req,res)=>{
    res.send("request is comming but no answer")
    res.send(req.body)
    console.log(req.body);

})

app.listen(3000,()=>{
    console.log("check also this if it is working ok thanks for your help to me in the offece 3000");
})

