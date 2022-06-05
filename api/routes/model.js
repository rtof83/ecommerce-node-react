module.exports.model = (Model, fields, model) => {

const router = require('express').Router();
// const { Model, fields, model } = null;

router.post('/', async (req, res) => {
    fields = req.body;
  
    model = fields;
  
    try {
      await Model.create(model)
  
      res.status(201).json({ message: 'Record inserted successfully!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
router.get('/', async (_, res) => {
try {
    model = await Model.find()

    res.status(200).json(model)
} catch (error) {
    res.status(500).json({ erro: error })
}
})


}

// module.exports = (router, Model, fields, model);