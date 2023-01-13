import React, {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {FaCheck} from "react-icons/fa";

// tailwindCSS styles
import './tw.css';

function App() {
    const [result, setResult] = useState(null);
    const [domain, setDomain] = useState('');

    const handleInputChange = event => {
        setDomain(event.target.value);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        if (!domain) return toast.error('Alan adı nerede? 🤔');
        if (!domain.includes('.')) return toast.error('Alan adı geçersiz. 🤔');
        if (domain.includes('http') || domain.includes('https')) return toast.error('Alan adı geçersiz. 🤔');
        if (domain.includes('www.')) return toast.error('Alan adı geçersiz. 🤔');

        const get_token = async () => {
            const response = await fetch(`/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "auth",
                    domain: domain,
                    iss: "googleankara.com.tr",
                    aud: "seek-server.vercel.app"
                })
            });
            return await response.json();
        }

        const get_server = async () => {
            await get_token().then(async (data) => {
                const response = await fetch(`/api/get_server`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        domain: domain,
                        token: data.token
                    })
                });
                return await response.json();
            })
                .then((data) => {
                    if (!data.status) {
                        setResult(null);
                        return toast.error(data.message);
                    }
                    toast.success(data.message);
                    setResult(data.server);
                });
        }
        await get_server();
    }

    return (
        <div
            className="bg-dark-primary text-dark-secondary font-sans leading-normal tracking-normal text-sm">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-full mx-auto px-4 py-4 bg-dark-tertiary rounded-lg shadow-lg">
                    <h1 className="font-extrabold text-transparent text-center text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-4">dijital.me
                        server seeker</h1>
                    <form className="max-w-md mx-auto px-4 py-4 bg-dark-tertiary rounded-lg shadow-lg"
                          onSubmit={handleFormSubmit}>
                        <label className="block font-bold text-dark-primary mb-2" htmlFor="domain-input">
                            Alan adı:
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-dark-secondary bg-dark-quinary border-purple-300 mb-4 focus:outline-none focus:shadow-outline focus:text-dark-primary focus:border-purple-400 transition duration-150 ease-in-out"
                            type="text"
                            name="domain-input"
                            id="domain-input"
                            value={domain}
                            onChange={handleInputChange}
                            placeholder="ankaragoogle.com"
                        />
                        <button
                            type="submit"
                            className="mt-4 bg-dark-quinary hover:bg-dark-purple text-dark-primary font-bold py-2 px-4 rounded-full w-full transition duration-500 ease-in-out text-lg">
                            🚀
                        </button>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                            gutter={8}
                            containerClassName=""
                            containerStyle={{}}
                            toastOptions={{
                                // Define default options
                                className: '',
                                duration: 5000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },

                                // Default options for specific types
                                success: {
                                    duration: 3000,
                                    theme: {
                                        primary: 'green',
                                        secondary: 'black',
                                    },
                                },
                            }}
                        />
                    </form>
                    {
                        result && (
                            <div className="max-w-screen-2xl mx-auto px-4 py-4 bg-dark-quinary rounded-lg shadow-lg mt-4">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-dark-primary font-bold">
                                            <FaCheck className="inline-block mr-2 text-green-500"/>
                                            Sunucu bulundu 🎉
                                            <small
                                                className="text-dark-secondary">
                                                {result.domain}
                                            </small>
                                        </span>
                                        <p className="text-dark-secondary">
                                            Server: {' '}
                                            <small
                                                className="text-dark-primary font-bold">
                                                {result.server}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
                <footer className="max-w-full mx-auto px-4 py-4 bg-dark-tertiary rounded-lg shadow-lg mt-4">
                    <a
                        className="text-dark-purple hover:text-dark-primary transition duration-500 ease-in-out"
                        href="https://dijital.me"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                    >
                        dijital.me made with ❤️ by @uuygarugurlu
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default App;