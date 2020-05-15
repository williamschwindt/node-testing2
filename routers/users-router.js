const express = require('express')
const router = express.Router()
const db = require('../data/config')

router.get('/', async (req, res, next) => {
    try{
        const users = await db('users')
        res.status(200).json(users)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const user = await db('users').where('id', req.params.id).first()
        if(!user) {
            return  res.status(404).json({
                message: 'user not found'
            })
        }
        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const payload = {
            username: req.body.username,
            password: req.body.password
        }

        const [id] = await db('users').insert(payload)
        const user = await db('users').where('id', id).first()

        res.status(201).json(user)

    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const payload = {
            username: req.body.username,
            password: req.body.password
        }

        await db('users').update(req.params.id, payload)

    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        await db('users').where('id', req.params.id).del()
        return res.status(204)

    } catch(err) {
        next(err)
    }
})

module.exports = router