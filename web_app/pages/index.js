import { useState } from "react";
import { stream } from 'replicate';

import Head from "next/head";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [predictionTwo, setPredictionTwo] = useState(null);
  const [error, setError] = useState(null);
  const [errorTwo, setErrorTwo] = useState(null);
  const [processed_pred, setProcessedPred] = useState(null);
  const [processed_pred_two, setProcessedPredTwo] = useState(null);


  async function cleanDataTwo(output) {
    console.log("calling clean function second") ;
    const new_response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Suppose you are a medical physician assistant. For the given string, suggest concisely the clinical plans including lifestyle advice, medications with dosage and strength, and tests advised for each problem. Do not acknowledge at the start. \nString: \"" + output + "\"",
      }),
    });
    let new_prediction = await new_response.json();
    if (new_response.status !== 201) {
      setErrorTwo(new_prediction.detail);
      return;
    }
    // setPredictionTwo(new_prediction);
    // console.log(new_prediction.output) ;
    setProcessedPredTwo(new_prediction.output) ;
    // setProcessedPred(extractContent(new_prediction.output)) ;

    while (new_prediction.status !== "succeeded" && new_prediction.status !== "failed") {
      await sleep(1000);
      console.log(new_prediction.status) ;
      const new_response = await fetch("/api/proxy/" + new_prediction.id);
      new_prediction = await new_response.json();
      if (new_response.status !== 200) {
        setErrorTwo(new_prediction.detail);
        return;
      }
      setProcessedPredTwo(new_prediction.output);
    }
  };

  const callModelTwo = async (input) => {
    console.log("Calling Model two") ;
    const response = await fetch("/api/prediction-two", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true ,
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictionTwo(prediction);
    console.log(prediction) ;
    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      console.log(prediction.status) ;
      await sleep(1000);
      const response = await fetch("/api/prediction-two/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictionTwo(prediction);
    }

    if (prediction.status === "succeeded") {
      
      cleanDataTwo(prediction.output) ;
    }
  };


  async function cleanDataOne(e) {
    e.preventDefault();
    console.log("calling clean function") ;
    let out_one = "" ;
    const new_response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "For the given string, extract and return all of the problems and their assessments in the following format: Problem 1; Assessment 1, Problem 2, Assessment 2, Problem x; Assessment x... and so on. Do not add anything which is not mentioned by the user. \nString: \"" + e.target.prompt.value + "\"",
      }),
    });
    let new_prediction = await new_response.json();
    if (new_response.status !== 201) {
      setErrorTwo(new_prediction.detail);
      return;
    }
    // setPredictionTwo(new_prediction);
    // console.log(new_prediction.output) ;
    setProcessedPred(new_prediction.output) ;
    out_one = out_one + new_prediction.output ;
    // setProcessedPred(extractContent(new_prediction.output)) ;

    while (new_prediction.status !== "succeeded" && new_prediction.status !== "failed") {
      await sleep(1000);
      console.log(new_prediction.status) ;
      const new_response = await fetch("/api/proxy/" + new_prediction.id);
      new_prediction = await new_response.json();
      if (new_response.status !== 200) {
        setErrorTwo(new_prediction.detail);
        return;
      }
      setProcessedPred(new_prediction.output);
      out_one = out_one + new_prediction.output ;
    }

    if (new_prediction.status === "succeeded") {
      // callModelTwo(out_one) ;
      console.log(out_one) ;
      cleanDataTwo(out_one) ;
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Clicked submit") ;
  //   const response = await fetch("/api/predictions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials" : true ,
  //     },
  //     body: JSON.stringify({
  //       prompt: e.target.prompt.value,
  //     }),
  //   });
  //   let prediction = await response.json();
  //   if (response.status !== 201) {
  //     setError(prediction.detail);
  //     return;
  //   }
  //   setPrediction(prediction);
  //   console.log(prediction) ;
  //   while (prediction.status !== "succeeded" && prediction.status !== "failed") {
  //     console.log(prediction.status) ;
  //     await sleep(1000);
  //     const response = await fetch("/api/predictions/" + prediction.id);
  //     prediction = await response.json();
  //     if (response.status !== 200) {
  //       setError(prediction.detail);
  //       return;
  //     }
  //     setPrediction(prediction);
  //   }

  //   if (prediction.status === "succeeded") {
      
  //     cleanDataOne(prediction.output) ;
  //   }
  // };



  return (
    <div className="container max-w-2xl mx-auto p-5">
      <Head>
        <title>Darcheeni Assessment and Plan</title>
      </Head>
      <h1 className="py-6 text-center font-bold text-2xl">
        Darcheeni Medical Decision-making (MDM) Test
      </h1>
      <form className="w-full flex" onSubmit={cleanDataOne}>
        <textarea rows="10" cols="30" placeholder="Enter the clinical note" name="prompt" className="flex-grow"></textarea>
        <button className="button" type="submit">Go</button>
      </form>
      {/* {error && <div>{error}</div>}
      {processed_pred && (
        <div className="image-wrapper">
          <h2> Problems and Assessment </h2>
          <pre id="output">{processed_pred}</pre>
          <p className="py-3 text-sm opacity-50">status: {processed_pred.status}</p>
        </div>
      )}
      {errorTwo && <div>{errorTwo}</div>} */}
      
      {processed_pred_two && (
        <div className="image-wrapper">
          <h2> Assessment, Plan, and Orders </h2>
          <pre id="output">{processed_pred_two}</pre> 
          <p className="py-3 text-sm opacity-50">status: {processed_pred_two.status}</p>
        </div>
      )}
    </div>
  );
}
