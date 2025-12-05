'use client';

import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <section className="mb-6">
            <div className="relative max-w-[400px] w-full">
                <input
                    type="text"
                    className="w-full px-4 py-2 pl-6 pr-10 bg-[#cec38c] border-2 border-[#cec38c] rounded-full text-[#120e0c] text-sm font-inherit transition-all focus:outline-none focus:border-[#07b549] focus:shadow-[0_0_0_3px_rgba(7,181,73,0.15)] placeholder:text-[#4a4540]"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Rechercher des articles"
                />
                {searchQuery && (
                    <button
                        className="absolute right-10 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#120e0c] cursor-pointer p-0"
                        onClick={() => onSearchChange('')}
                        aria-label="Effacer la recherche"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#120e0c]" />
            </div>
        </section>
    );
}