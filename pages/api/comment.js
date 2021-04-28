export default (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'mes' })
  }

  if (req.status === 'GET') {
    res.status(200).json({ name: 'John Doe' })
  }
}
