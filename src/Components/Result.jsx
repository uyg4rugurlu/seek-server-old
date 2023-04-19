import React from 'react';
import {FaCheck} from 'react-icons/fa';

function Result({result}) {
    return (
        <div className="max-w-screen-2xl mx-auto px-4 py-4 bg-white rounded-lg shadow-lg mt-4">
            <div className="flex items-center">
                <div>
          <span className="text-purple-500 font-bold">
            <FaCheck className="inline-block mr-2 text-green-500"/>
            Sunucu bulundu 🎉
            <small className="text-gray-500"> {result.domain}</small>
          </span>
                    <p className="text-lg">
                        Server: <span className="text-purple-500 font-bold">{result.server}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Result;