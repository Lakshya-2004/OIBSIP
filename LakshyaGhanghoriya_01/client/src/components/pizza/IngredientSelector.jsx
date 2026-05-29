// components/pizza/IngredientSelector.jsx

function IngredientSelector({
  title,
  items,
  selectedItems,
  onSelect,
  multiple = false,
}) {
  const handleClick = (item) => {
    if (multiple) {
      if (selectedItems.includes(item)) {
        onSelect(
          selectedItems.filter((selected) => selected !== item)
        )
      } else {
        onSelect([...selectedItems, item])
      }
    } else {
      onSelect(item)
    }
  }

  return (
    <div className='ingredient-section'>
      <h2>{title}</h2>

      <div className='ingredient-grid'>
        {items.map((item) => {
          const isSelected = multiple
            ? selectedItems.includes(item)
            : selectedItems === item

          return (
            <button
              key={item}
              className={
                isSelected
                  ? 'ingredient-btn active'
                  : 'ingredient-btn'
              }
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default IngredientSelector