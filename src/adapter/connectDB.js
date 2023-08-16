const {connect} = require("mongoose");

// (async()=>{
//     try {
//        await connect(process.env.MONGOURI);
//        console.log(`Connection Successfull !!!!`);
//     } catch (error) {
//         console.log(error);
//     }
// })()


(async()=>{
    try {
       await connect(process.env.MONGOURI2);
       console.log(`Connection Successfull !!!!`);
    } catch (error) {
        console.log(error);
    }
})()