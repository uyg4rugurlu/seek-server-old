import React from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Result from './Components/Result';
import Footer from './Components/Footer';

import './tw.css'
import {FaExclamationTriangle} from "react-icons/all.js";

function App() {
    const [result, setResult] = React.useState(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-grow bg-gray-100">
                <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8 mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div
                                className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 flex text-center justify-center items-center">
                                <FaExclamationTriangle className="h-5 w-5 text-yellow-400"/>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-yellow-500 leading-tight mb-2 text-center lg:text-left">
                                    Dikkat!
                                </h1>
                                <hr className="mb-2 w-16 border-yellow-500 border-2 rounded-full mx-auto lg:mx-0"/>
                                <p className="text-sm text-gray-700 leading-snug font-semibold">
                                    Bu yazılım senin işlerini kolaylaştırman ve zamandan tasarruf etmen için kodlandı.
                                    Lütfen Güzel Hosting ve ya hafızan yerine bu aracı tercih et.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                        <Form setResult={setResult}/>
                    </div>
                </div>

                {result && <Result result={result}/>}
            </div>
            <Footer/>
        </div>
    );
}

export default App;
