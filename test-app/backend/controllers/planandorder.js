// import express from "express";
import Replicate from "replicate";

const ReplicateRun = async(req, res) => {
    const { prompt } = req.body;

    const replicate = new Replicate({
        auth: "r8_IiqXZRwFT8sHLimFABjedHasL6Apw7k451J2b", 
    });

    console.log("Replicate client created");

    try{

    const output = await replicate.run(
        "aihilums/plan_orders:dac89b62302f4292ecd53b83d2814658e5977eff511c0b87f6e0a4fef870c083",
        {
          input: {prompt},
        }
      );
      console.log(output);
      res.status(200).json({output : output});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: "An error occured"});
    }

}

export default ReplicateRun;