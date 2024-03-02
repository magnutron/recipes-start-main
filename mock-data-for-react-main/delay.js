module.exports = (req, res, next) => {
  const delay = req.query.delay || 1000;
  const makeErrors = req.query.error;
  if (makeErrors && Math.random() > 0.5) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: 'Upps something went wrong!'
    });
  }
  console.log(`Delaying ${req.method} ${req.url} by ${delay}ms`);
  setTimeout(next, delay);
}