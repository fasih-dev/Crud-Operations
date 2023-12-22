const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read one item by id
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Update
router.put('/:id', getItem, async (req, res) => {
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.item = item;
    next();
}

module.exports = router;
