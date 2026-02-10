export default function IngredientsList(props: { ingredientList: string[], getRecipe: () => void }) {
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{props.ingredientList.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
            {props.ingredientList.length > 2 ? (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            ) : (
                <div className="get-recipe-container message-container">
                    <div>
                        <h3>Keep adding ingredients!</h3>
                        <p>Add at least {3 - props.ingredientList.length} more ingredient{3 - props.ingredientList.length > 1 ? 's' : ''} to unlock the "Get a recipe" button.</p>
                    </div>
                    <button disabled className="disabled-btn">Get a recipe</button>
                </div>
            )}
        </section>
    )
}