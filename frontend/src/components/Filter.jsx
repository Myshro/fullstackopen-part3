const Filter = ({ value, handler }) => {
  return (
    <input value={value} onChange={handler} />
  )
}

export default Filter