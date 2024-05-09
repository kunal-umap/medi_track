const mongoose=require("mongoose")

const reportSchema=new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    Records: {
        type: Array,
        default: []
    },
})

// const reportData = new mongoose.Schema({
//     hospitalName:{
//         type:String,
//         required:[true,"Please enter the name of the hospital"]
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     },
//     image: {
//         public_id: {
//             type: String,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     },
//     description:{
//         type:String,
//         required:[true,"Please enter description of checkup"]
//     }
// })

module.exports= Report =mongoose.model('Report',reportSchema)