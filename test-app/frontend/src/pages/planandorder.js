import react from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const PlanAndOrder = () => {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [errorOccur, setErrorOccur] = useState(false);
    const [prompt, setPrompt] = useState("");

    const RunReplicate = async () => {
        try {
            const response = await axios.post("http://localhost:8000/planandorder/replicate", {prompt: prompt});
            console.log(response.data.output)
            setData(response.data.output);
        }
        catch (error) {
            // console.error(error);
            setErrorOccur(true);
            setError("An error occured");
        }     
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Replicate Runner - Plan and Order</h1>
                <textarea
                    value={prompt}
                    placeholder="Enter Prompt"
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-40 p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button
                    onClick={RunReplicate}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
                >
                    Run Replicate
                </button>
                <div className="mt-8 text-gray-800 text-lg font-semibold">Output:</div>
                {data && <textarea className="w-full h-40 mt-4 p-4 bg-green-100 text-green-600 rounded-lg resize-none" readOnly>{data}</textarea>}
                {errorOccur && <textarea className="w-full h-40 mt-4 p-4 bg-red-100 text-red-600 rounded-lg resize-none" readOnly>{error}</textarea>}
            </div>
        </div>
    )


}

export default PlanAndOrder;