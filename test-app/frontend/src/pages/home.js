import react from 'react';
// import Link from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Select One</h1>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <a 
                    href="/problemandassessment" 
                    className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-all ease-in-out duration-300 text-center">
                    Problem and Assessment
                </a>
                <a 
                    href="/planandorder" 
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all ease-in-out duration-300 text-center">
                    Plan and Order
                </a>
            </div>
        </div>
    );
}

export default Home;