import mongoose from 'mongoose';

const connectDb = async()=> {
  if(mongoose.connections[0].readyState) {
    return true
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('Ready')
    return true
  } catch (error) {
    console.log(error)
  }
}

export default connectDb