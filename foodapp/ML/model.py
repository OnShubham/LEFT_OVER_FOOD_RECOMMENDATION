from flask import Flask, request, render_template
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load the recipe dataset
recipes_df = pd.read_csv('recipes.csv')

# Clean the dataset by removing unnecessary columns
recipes_df.drop(columns=["prep_time", "cook_time", "total_time", "yield",
                         "rating", "cuisine_path", "nutrition"], inplace=True)

# Create a bag of words for the ingredients column
cv = CountVectorizer(stop_words='english')
ingredients_matrix = cv.fit_transform(recipes_df['ingredients'])

# Calculate the cosine similarity between the ingredients matrix
cosine_sim = cosine_similarity(ingredients_matrix)


def get_recipe_recommendations(leftover_ingredients):
    if leftover_ingredients is None:
        return []

    leftover_list = leftover_ingredients.split(',')
    recipes_df['cosine_sim'] = recipes_df['ingredients'].apply(
        lambda x: cosine_similarity(
            cv.transform([x]), cv.transform([leftover_ingredients]))[0][0]
    )
    sorted_df = recipes_df.sort_values('cosine_sim', ascending=False).reset_index()
    sorted_df['rank'] = sorted_df.index + 1  # Add rank column starting from 1
    recommendations = sorted_df[['rank', 'recipe_name', 'cosine_sim', 'url', 'img_src']].head(10)

    return recommendations.to_dict(orient='records')


# @app.route('/recommend', methods=['POST'])
# def recommend():
#     if request.method == 'POST':
#         # Get the user input from the form
#         ingredients = request.form.get('ingredients')

#         # Get recipe recommendations based on the user input
#         recommendations = get_recipe_recommendations(ingredients)

#         # Render the recommendations template with the recommendations
#         return render_template('recommendations.html', recommendations=recommendations)
#     else:
#         return render_template('recommend.html')


if __name__ == '__main__':
    app.run()
