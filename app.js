const meals = [
  { name: 'Le veggie croquant', category: 'Végétarien', price: 7.50, score: 'B', tags: ['vegetarien','moins8'], description: 'Galette végétale, salade, tomate et sauce légère.', allergens: 'Gluten, soja (selon recette)', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80', alt: 'Burger végétarien avec salade et tomate' },
  { name: 'Le wrap poulet frais', category: 'À emporter', price: 8.90, score: 'C', tags: ['moins8'], description: 'Poulet grillé, crudités et sauce au yaourt.', allergens: 'Gluten, lait (selon recette)', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80', alt: 'Wrap garni de poulet et de légumes frais' },
  { name: 'Le bol coloré', category: 'Végétarien', price: 9.50, score: 'A', tags: ['vegetarien','sans-gluten'], description: 'Riz, légumes croquants, avocat et légumineuses.', allergens: 'À vérifier : sésame, soja selon sauce', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', alt: 'Bol de légumes, avocat et céréales' },
  { name: 'Le burger classique', category: 'Le grand classique', price: 6.90, score: 'D', tags: ['moins8'], description: 'Steak, salade, tomate et pain moelleux.', allergens: 'Gluten, lait, moutarde (selon recette)', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', alt: 'Burger classique avec salade fraîche' }
];

const grid = document.querySelector('#meal-grid');
const search = document.querySelector('#search');
const emptyState = document.querySelector('#empty-state');
let activeFilter = 'all';

function renderMeals() {
  const query = search.value.trim().toLocaleLowerCase('fr');
  const shown = meals.filter(meal => {
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'moins8' ? meal.price < 8 : meal.tags.includes(activeFilter));
    return matchesFilter && `${meal.name} ${meal.category} ${meal.description} ${meal.allergens}`.toLocaleLowerCase('fr').includes(query);
  });
  grid.innerHTML = shown.map(meal => `
    <article class="meal-card">
      <div class="meal-image" role="img" aria-label="${meal.alt}" style="background-image:url('${meal.image}')"><span class="price-tag">≈ ${meal.price.toFixed(2).replace('.', ',')} €</span></div>
      <div class="meal-content">
        <div class="meal-meta"><span class="meal-category">${meal.category}</span><span class="nutri score-${meal.score.toLowerCase()}" aria-label="Repère Nutri-Score estimatif ${meal.score}">${meal.score}</span></div>
        <h3>${meal.name}</h3><p>${meal.description}</p>
        <div class="meal-facts"><span>✳ Repère nutritionnel</span><span>estimé*</span></div>
        <div class="allergen-label"><strong>Allergènes à vérifier :</strong> ${meal.allergens}</div>
      </div>
    </article>`).join('');
  emptyState.hidden = shown.length > 0;
}

document.querySelectorAll('.filter-pill').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-pill.active')?.classList.remove('active');
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderMeals();
  });
});
search.addEventListener('input', renderMeals);
renderMeals();
