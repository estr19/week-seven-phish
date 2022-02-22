function SongInfo({label, image, calories, ingredients}) {
  return (
    <div>
      <h2>{label}</h2>
      <img src={image} aria-label={label} />
      <h3>{calories.toFixed()} calories</h3>
      <ul>
        {ingredients.map(item => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SongInfo;