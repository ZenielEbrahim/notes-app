const express = require('express')
const Note = require('./../models/notes')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/notes', auth, (req, res)=>{
    const note = new Note({
        ...req.body,
        owner:req.user._id
    })
    note.save().then(()=>{
        console.log(note)
        res.send(note)
    }).catch((error)=>{
        res.status(400).send()
    })
})

router.get('/notes', auth, async (req, res)=>{



const sort = {}


if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]]= parts[1] === 'desc'? -1: 1
}
  try {
      await req.user.populate({
          path:'notes',
          match:{
              
          },
          options:{
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort,
          }
      }).execPopulate()
    
    res.send(req.user.notes)
  } catch (error) {
      res.status(500).send()
  }
      
})


router.get('/notes/:id', auth,async (req, res)=>{
    const _id = req.params.id
  try {
     
   const note = await Note.findOne({_id, owner:req.user._id})
  
    if(!note){
        return res.status(404).send()
    }
    res.send(note) 
  } catch (error) {
      res.status(400).send()
  }
   
})

router.patch('/notes/:id', auth, async (req, res)=>{
    
 const updates = Object.keys(req.body)
 const allowedUpdates = ['title', 'body']
 isValidOperation = updates.every(update=>{
     return allowedUpdates.includes(update)
 })

if(!isValidOperation){
    return res.status(400).send({error:'Invalid update!'})
}

try {
   
    const note = await Note.findOne({_id:req.params.id, owner:req.user._id});

    if(!note){
        return res.status(404).send()
    }
    updates.forEach(update => note[update]= req.body[update])
    await note.save()
    res.send(note)
} catch (error) {
   res.status(400) 
}


})

router.delete('/notes/:id', auth, async (req, res)=>{
    try {
        const note = await Note.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if(!note){
            return res.status(404).send()
        }
        res.send(note)
    } catch (error) {
        res.status(500)
    }
})
module.exports = router