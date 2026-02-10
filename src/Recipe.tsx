import React from 'react';
import ReactMarkdown from 'react-markdown';

interface RecipeProps {
    recipe: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    recipeRef?: React.RefObject<HTMLElement | null>;
}

export default function Recipe({ recipe, isFavorite, onToggleFavorite, recipeRef }: RecipeProps) {
    return (
        <section className="recipe-section" aria-live="polite" ref={recipeRef}>
            <div className="recipe-header">
                <h2>RecipeGenie Recommends:</h2>
                <div className="recipe-actions">
                    <button
                        onClick={onToggleFavorite}
                        className={`favorite-btn ${isFavorite ? 'favorites-active' : ''}`}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={isFavorite}
                    >
                        {isFavorite ? "★ Saved" : "☆ Save"}
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="print-btn"
                        title="Print or Save as PDF"
                    >
                        🖨️ Print / PDF
                    </button>
                </div>
            </div>
            <article className="suggested-recipe-container">
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </article>
        </section>
    )
}