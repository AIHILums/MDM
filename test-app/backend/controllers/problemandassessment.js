import Replicate from "replicate";

const ReplicateRunProblem = async(req, res) => {
    const { prompt } = req.body;

    const replicate = new Replicate({
        auth: "r8_IiqXZRwFT8sHLimFABjedHasL6Apw7k451J2b", 
    });

    console.log("Replicate client created");

    try{

    const output = await replicate.run(
        "aihilums/problem_assessment:01b4c15370eeac74b770f6c127b2130185c70536269f6aaf81564555f44b0019",
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

export default ReplicateRunProblem;