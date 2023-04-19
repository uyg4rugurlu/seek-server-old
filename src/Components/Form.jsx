import React, {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {css} from '@emotion/react';
import {FaExclamationCircle} from 'react-icons/fa';
import {BeatLoader} from 'react-spinners';

function Form() {
    const [result, setResult] = useState(null);
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setDomain(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!domain) return toast.error('Alan adı nerede? 🤔');
        if (!domain.includes('.')) return toast.error('Alan adı geçersiz. 🤔');
        if (domain.includes('http') || domain.includes('https'))
            return toast.error('Alan adı geçersiz. 🤔');
        if (domain.includes('www.')) return toast.error('Alan adı geçersiz. 🤔');

        setLoading(true);

        const get_token = async () => {
            const response = await fetch(`/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'auth',
                    domain: domain,
                    iss: 'googleankara.com.tr',
                    aud: 'seek-server.vercel.app',
                }),
            });
            return await response.json();
        };

        const get_server = async () => {
            const tokenData = await get_token();
            if (!tokenData.token) {
                setLoading(false);
                return toast.error('Token alınamadı.');
            }

            const response = await fetch(`/api/get_server`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    domain: domain,
                    token: tokenData.token,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (!data.status) {
                setResult(null);
                return toast.error(data.message);
            }

            setResult(data.server);
            return toast.success(data.message);
        };

        await get_server();
    };

    const override = css`
      display: block;
      margin: 0 auto;
    `;

    return (
        <div className="container mx-auto px-4">
            <form className="max-w-md mx-auto py-4" onSubmit={handleFormSubmit}>
                <label className="block font-bold text-purple-500 mb-2" htmlFor="domain-input">
                    Alan adı:
                </label>
                <input
                    className="w-full border py-2 px-3 mb-4 rounded focus:outline-none focus:shadow-outline"
                    type="text"
                    name="domain-input"
                    id="domain-input"
                    value={domain}
                    onChange={handleInputChange}
                    placeholder="ankaragoogle.com"
                />
                <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-500 ease-in-out text-lg"
                    disabled={loading}
                >
                    {loading ? (
                        <BeatLoader css={override} color="#ffffff" loading={loading} size={10}/>
                    ) : (
                        'Sunucu Ara'
                    )}
                </button>
                <Toaster position="top-right"/>
            </form>
            {loading && (
                <div className="max-w-md mx-auto py-4">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-center">
                            <BeatLoader css={override} color="#7c3aed" loading={loading} size={30}/>
                            <p className="ml-2 font-bold text-purple-500">Sunucu sorgulanıyor...</p>
                        </div>
                    </div>
                </div>
            )}
            {result && (
                <div className="max-w-md mx-auto py-4">
                    <h2 className="text-2xl font-bold text-center mb-4">Sonuç</h2>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <p className="text-xl mb-2">
                            Sunucu: <span className="text-purple-500">{result.server}</span>
                        </p>
                        <p className="text-lg">
                            Alan Adı: <span className="text-purple-500">{result.domain}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;
