const { people } = require("../data");

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

const getPerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find((p) => p.id === id);

    if(!person) {
        return res
        .status(404)
        .json({ message: "Person not found." });
    }

    res.status(200).json({ success: true, data: person})
};

const addPerson = (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res
        .status(400)
        .json({ success: false, message: 'Please provide name'});
    }

    people.push({ id: people.length + 1, name})
  
    res.status(201).json({ success: true, name: name })
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const person = people.find((p) => p.id === id);
  
  if(!name) {
    return res
    .status(404)
    .json({ success: false, message: `No person with id ${id}` };
  }

  person.name = name;
  res.status(200).json({ success: true, data: person });
}

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id);
    const personExists = people.find((p) => p.id === id);

    if (!personExists) {
        return res
          .status(404)
          .json({ success: false, message: `No person with id ${id}.` });
    }

    const newPeople = people.filter((p) => p.id !== id);
    people.length = 0;
    people.push(...newPeople);

    res.status(200).json({ success: true, data: people });
}

module.exports = {
    getPeople,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
};