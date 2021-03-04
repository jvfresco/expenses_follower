function proxy(app) {

    app.get(/^\/$/, (req, res) => res.redirect('/global'))
  
  }
  
  module.exports = proxy