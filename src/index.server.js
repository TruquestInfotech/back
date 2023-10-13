const express=require("express")
const env = require('dotenv')
const mongoose=require("mongoose")
const app=express()
const path=require('path');
const cors =require('cors')



//routes

const authRoutes=require('./routes/auth')
const adminRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart')
const initialDataRoutes=require('./routes/admin/initialData');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");


env.config() 





mongoose.connect((process.env.MONGODB_URL),{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    writeConcern: { 
      w: 'majority', 
      j: true, 
      wtimeout: 1000 
    } 





})




.then(()=>{
    console.log("Database Connected")
})




app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));




app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);





app.listen(2000,()=>{
    console.log(`Server is runnung on Port ${process.env.PORT}`,)
});




