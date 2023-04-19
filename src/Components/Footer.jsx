import React from 'react';

function Footer() {
    return (
        <footer className="bg-purple-500 text-white py-4">
            <div className="container mx-auto px-4 text-center">
                <p>
                    dijital.me made with ❤️ by{' '}
                    <a
                        className="underline hover:text-purple-300 transition duration-500 ease-in-out"
                        href="https://twitter.com/uuygarugurlu"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        @uuygarugurlu
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;