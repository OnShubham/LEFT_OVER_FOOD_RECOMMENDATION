import React, { useState } from 'react';
import axios from 'axios';

function RecipeForm() {
  const [ingredients, setIngredients] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/recommend', { ingredients });
      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients" className="form-label">Enter the leftover ingredients separated by commas:</label>
        <input type="text" id="ingredients" className="form-input" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <button type="submit" className="form-button">Get Recommendations</button>
      </form>

      {Array.isArray(recommendations) && recommendations.length > 0 && (
        <ul className="recommendations-list">
          {recommendations.map((recommendation) => (
            <li key={recommendation.rank} className="recommendation-item">
              <div className="recommendation-image">
                <img src={recommendation.img_src} alt="Recipe" />
              </div>
              <div className="recommendation-details">
                <span className="recommendation-rank">{recommendation.rank}.</span>
                <a className="recommendation-link" href={recommendation.url} target="_blank" rel="noopener noreferrer">{recommendation.recipe_name}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="recommendation-match">({Math.round(recommendation.cosine_sim * 100)}% Match)</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeForm;
