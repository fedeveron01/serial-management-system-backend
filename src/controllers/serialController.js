const Serial = require('../models/serialModel');

exports.getSerials = async (req, res) => {
    try {
        const serials = await Serial.find();
    
        return res.status(200).json(serials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createSerial = async (req, res) => {
  try {
    const { quantity, durationDays} = req.body;
    if (quantity < 1 || quantity > 100) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 100' });
    }
    if (durationDays < 1 || durationDays > 730) {
        return res.status(400).json({ error: 'Duration must be between 1 and 365' });
    }

    serialsCreated = [];

    for (let i = 0; i < quantity; i++) {
      code = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
      used = false;
      usedDate = null;

      const existingSerial = await Serial.findOne({ code });

      if (existingSerial) {
        i -= 1;
        continue;
      } else {
        expirationDate = null
        const newSerial = new Serial({ code, expirationDate, durationDays, used, usedDate });
        await newSerial.save();
        serialsCreated.push(newSerial);

      }
    }

    return res.status(201).json(
        {   list : serialsCreated,
            message: 'Serial created' }
        );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateSerial = async (req, res) => {
    try {
        const { code } = req.params;
        const { expirationDate, used, usedDate } = req.body;

        const updatedSerial = await Serial.findOneAndUpdate(
            { code },
            { expirationDate, used, usedDate },
            { new: true }
        );
    
        if (!updatedSerial) {
            return res.status(404).json({ error: 'Serial not found' });
        }
    
        return res.status(200).json(updatedSerial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteSerial = async (req, res) => {
    try {
        const { code } = req.params;
        const deleteSerial = await Serial.deleteOne({ code });
        if (deleteSerial.deletedCount == 0) {
            return res.status(404).json({ error: 'Serial not found' });
        }
        return res.status(200).json({ mensaje: 'Serial deleted' });
    
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.activateSerial = async (req, res) => {
    try {
        const { code } = req.params;
        used = true;
        usedDate = new Date(Time.now());
        
        serial = await Serial.findOne({ code });
        if (serial.used) {
            return res.status(400).json({ error: 'Serial already used' });
        }
        
        expirationDate = new Date(Time.now() + durationDays * 24 * 60 * 60 * 1000);

        const updatedSerial = await Serial.findOneAndUpdate(
            { code },
            { used, usedDate, expirationDate },
            { new: true }
        );
    
        if (!updatedSerial) {
            return res.status(404).json({ error: 'Serial not found' });
        }
    
        return res.status(200).json(updatedSerial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}