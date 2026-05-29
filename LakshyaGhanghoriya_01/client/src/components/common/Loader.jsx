// components/common/Loader.jsx

function Loader({
  size = '60px',
  text = 'Loading...',
}) {
  return (
    <div className='loader-wrapper'>
      <div
        className='loader'
        style={{
          width: size,
          height: size,
        }}
      ></div>

      <p className='loader-text'>{text}</p>
    </div>
  )
}

export default Loader