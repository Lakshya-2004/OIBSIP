// components/common/Button.jsx

function Button({
  text,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn ${className}`}
    >
      {text}
    </button>
  )
}

export default Button