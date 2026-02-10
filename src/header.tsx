import RecipeGenieIcon from './assets/RecipeGenie.jpg'
export default function Header() {
    return (
        <header>
            <img src={RecipeGenieIcon} alt='RecipeGenieIcon' />
            <h1>RecipeGenie</h1>
        </header>
    )
}