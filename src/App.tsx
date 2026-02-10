import React from "react";
import Recipe from "./Recipe.tsx";
import IngredientsList from "./ingredientsList.tsx";
import { getRecipeFromAI } from "./api/recipeService.ts";


export default function App() {
    const [ingredientList, setIngredientList] = React.useState<string[]>([]);
    const [recipe, setRecipe] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    // Preferences
    const [dietary, setDietary] = React.useState<string>("");
    const [cuisine, setCuisine] = React.useState<string>("");
    const [servingSize, setServingSize] = React.useState<string>("2 people");

    // History and Favorites
    const [recipeHistory, setRecipeHistory] = React.useState<string[]>(() => {
        const saved = localStorage.getItem('recipeHistory');
        return saved ? JSON.parse(saved) : [];
    });
    const [favorites, setFavorites] = React.useState<string[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const recipeSection = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [recipe]);

    React.useEffect(() => {
        localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));
    }, [recipeHistory]);

    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    function addIngredient(formData: FormData) {
        const ingredient = formData.get('ingredient') as string;
        if (ingredient) {
            // Check for duplicates (case-insensitive)
            const exists = ingredientList.some(item => item.toLowerCase() === ingredient.trim().toLowerCase());
            if (!exists) {
                setIngredientList(prevIngredients => [...prevIngredients, ingredient.trim()]);
            } else {
                alert(`${ingredient} is already in your list!`);
            }
        }
    }

    async function getRecipe() {
        setLoading(true);
        setError("");

        try {
            const options = { dietary, cuisine, servingSize };
            const generatedRecipe = await getRecipeFromAI(ingredientList, options);
            setRecipe(generatedRecipe);
            setRecipeHistory(prev => [generatedRecipe, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate recipe");
        } finally {
            setLoading(false);
        }
    }

    function toggleFavorite(recipeContent: string) {
        setFavorites(prev => {
            if (prev.includes(recipeContent)) {
                return prev.filter(r => r !== recipeContent);
            } else {
                return [...prev, recipeContent];
            }
        });
    }

    const isFavorite = favorites.includes(recipe);

    return (
        <main>
            <div className="preferences-container">
                <h3>Preferences</h3>
                <div className="preferences-grid">
                    <label>
                        Dietary:
                        <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
                            <option value="">None</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Gluten-Free">Gluten-Free</option>
                            <option value="Keto">Keto</option>
                            <option value="Paleo">Paleo</option>
                        </select>
                    </label>
                    <label>
                        Cuisine:
                        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                            <option value="">Any</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Asian">Asian</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Indian">Indian</option>
                        </select>
                    </label>
                    <label>
                        Serving Size:
                        <select value={servingSize} onChange={(e) => setServingSize(e.target.value)}>
                            <option value="1 person">1 person</option>
                            <option value="2 people">2 people</option>
                            <option value="4 people">4 people</option>
                            <option value="6+ people">6+ people</option>
                        </select>
                    </label>
                </div>
            </div>

            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. Eggs"
                    aria-label="Add Ingredients"
                    name="ingredient"
                />
                <button>Add Ingredients</button>
            </form>

            {ingredientList.length > 0 && (
                <IngredientsList
                    ingredientList={ingredientList}
                    getRecipe={getRecipe}
                />
            )}

            {loading && (
                <div className="loading-container">
                    <p>🧑‍🍳 RecipeGenie is thinking of a recipe...</p>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p>❌ {error}</p>
                </div>
            )}

            {recipe && !loading && (
                <Recipe
                    recipe={recipe}
                    isFavorite={isFavorite}
                    onToggleFavorite={() => toggleFavorite(recipe)}
                    recipeRef={recipeSection}
                />
            )}

            {/* Simple History View - could be improved */}
            {recipeHistory.length > 0 && !recipe && (
                <div className="history-section">
                    <h3>Recent Recipes</h3>
                    <ul>
                        {recipeHistory.slice(0, 5).map((hist, index) => (
                            <li key={index} onClick={() => setRecipe(hist)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Recipe #{index + 1} (Click to view)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    )
}