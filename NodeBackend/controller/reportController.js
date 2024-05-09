// const Report=require('../model/reportModel')

// const reportModel = require("../model/reportModel")
const Report = require('../model/reportModel')
// const ApiFeatures = require('../utils/apiFeatures');

//Create report
// exports.createRecord= async (req,res) => 
exports.createRecord= async (req,res) => {
    try {
        let {hospitalName, date, image, description,username} = req.body
        if(!hospitalName || !date || !image || !description){
            res.status(404).json({err:"You have to fille"})
        }
        const newReport = {
            hospitalName: hospitalName,
            date: date,
            image: image,
            description: description
        };
        const Rep = await Report.findOne({username: username})
        Rep.Records.push(newReport);
        await Rep.save({validateBeforeSave: false}).then(data =>{
            res.json(data)
        }).catch(err => {
            res.status(406).json({err:err || "work load"})
        })

    } catch(error) {
        res.status(500).json({err: error.message || "error occured"})
    }

}



exports.getAllReports= async (req,res) => {
    try {
        // console.log(req.headers)
        let {username} = req.headers
        console.log(username)

        await Report.findOne({username: username}).then(data => {
            console.log({data:data.Records})
            res.json({data:data.Records})
        }).catch(err => {
            res.json(err||{err: "error"} )
        })
        // if(!all_data){
        //     res.json("Error Occured")
        // }
        // res.json({all_data});
        
    } catch(error) {
        res.json({err: error.message || "error occured"})
    }

}