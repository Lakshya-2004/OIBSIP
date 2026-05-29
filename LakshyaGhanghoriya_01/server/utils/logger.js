// utils/logger.js

const logger = (message) => {
  const currentTime =
    new Date().toLocaleString()

  console.log(
    `[${currentTime}] ${message}`
  )
}

export default logger