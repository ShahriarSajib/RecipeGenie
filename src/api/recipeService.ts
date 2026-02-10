import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Debug: Check if API key is loaded
if (!apiKey) {
    console.error('❌ VITE_GEMINI_API_KEY is not defined!');
    console.error('Make sure you:');
    console.error('1. Have .env.local file with VITE_GEMINI_API_KEY');
    console.error('2. Restarted the dev server after adding the key');
} else {
    console.log('✅ API Key loaded successfully (length:', apiKey.length, ')');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Define the interface for recipe options
interface RecipeOptions {
    dietary: string; // e.g., "Vegetarian", "Vegan", "Gluten-Free", ""
    cuisine: string; // e.g., "Italian", "Mexican", "Asian", ""
    servingSize: string; // e.g., "2 people", "4 people"
}

export async function getRecipeFromAI(ingredients: string[], options: RecipeOptions): Promise<string> {
    try {
        // Check if API key exists
        if (!apiKey) {
            throw new Error('API key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file and restart the dev server.');
        }

        const ingredientsList = ingredients.join(', ');
        const { dietary, cuisine, servingSize } = options;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        let prompt = `I have the following ingredients: ${ingredientsList}. 
        
        Please suggest a delicious recipe I can make with these ingredients.`;

        if (dietary) {
            prompt += ` The recipe MUST be ${dietary}.`;
        }
        if (cuisine) {
            prompt += ` I prefer ${cuisine} cuisine.`;
        }
        if (servingSize) {
            prompt += ` Please adjust the portion for ${servingSize}.`;
        }

        prompt += `
        Format your response as follows:
        - Recipe name
        - Brief description
        - Ingredients list (including the ones I have and any common pantry items needed)
        - Step-by-step instructions
        - Nutritional information (approximate)

        Make it practical, easy to follow, and beautifully formatted!`;

        console.log('🔄 Calling Gemini API with options:', options);
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log('✅ Recipe generated successfully!');
        return text || 'Sorry, I could not generate a recipe at this time.';
    } catch (error) {
        console.error('❌ Error calling Gemini API:', error);

        // Provide more specific error messages
        if (error instanceof Error) {
            if (error.message.includes('API_KEY_INVALID')) {
                throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY in .env.local');
            } else if (error.message.includes('PERMISSION_DENIED')) {
                throw new Error('API key permission denied. Make sure your API key is enabled at https://aistudio.google.com/app/apikey');
            } else if (error.message.includes('quota')) {
                throw new Error('API quota exceeded. Please wait a moment and try again.');
            } else if (error.message.includes('expired')) {
                throw new Error('API key expired. Please get a new key at https://aistudio.google.com/app/apikey');
            }
        }

        throw new Error('Failed to generate recipe. Please check your API key and try again.');
    }
}

