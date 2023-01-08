import React, {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

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
        const goFetch = async () => {
            const response = await fetch(`https://catfact.ninja/fact`);
            const data = await response.json();
            setResult(data);
        }
        await toast.promise(goFetch(), {
            loading: 'Arıyorum 🔎',
            success: 'Bulundu! 🎉',
            error: 'Bulamadım! 😢',
        });
    };

    return (
        <div
            className="bg-dark-primary text-dark-secondary font-sans leading-normal tracking-normal text-sm">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-full mx-auto px-4 py-4 bg-dark-tertiary rounded-lg shadow-lg">
                    <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-4">dijital.me
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
                            <>
                                <div className="max-w-md mx-auto px-4 py-4 bg-dark-senary rounded-lg shadow-lg mt-4">
                        <pre
                            className="text-dark-primary font-mono whitespace-pre-wrap break-words overflow-auto max-h-96 p-4">{JSON.stringify(result, null, 2)}</pre>
                                </div>
                            </>
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
