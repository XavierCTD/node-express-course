const jwt = require('jsonwebtoken');

exports.logon = (req, res) => {
  const { name, password } = req.body;
   console.log(req.body);

    if (!name || !password) {
        return res.status(400).json({ message: 'Please provide a name and password' });
    }

  const token = jwt.sign({ name: name }, process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_LIFETIME || '24h' } 
  );
    res.status(200).json({ message: 'user logged in', token });
};


 exports.hello = async (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.name}` });
};