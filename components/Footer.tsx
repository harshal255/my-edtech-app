import { Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-white py-6 mt-auto">
            <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between px-8 mx-auto max-w-4xl">
                <p className="text-sm text-gray-500">
                    © 2025 DevResource Hub. Built for House of Edtech Assignment.
                </p>

                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-700">Created by Harshal Kahar</span>

                    <div className="flex items-center gap-4">
                        {/* Replace these hrefs with your actual profile links! */}
                        <a
                            href="https://github.com/harshal255"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-black transition-colors"
                        >
                            <Github size={20} />
                            <span className="sr-only">GitHub</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/harshalkahar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            <Linkedin size={20} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}