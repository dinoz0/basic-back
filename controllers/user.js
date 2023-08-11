/*************************/
/*** Import used modules */


/*****************************************/
/*** Unit route for User resource */

exports.getAllUsers = (req, res) => {
    return res.json({ message: "All user" })
}

exports.getUser = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `One user id ${pid}` })
}

exports.addUser = async (req, res) => {
    return res.json({ message: 'User Created'})
}

exports.updateUser = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `User id:${pid} Updated`})
}

exports.deleteUser =  (req, res) => {
    let pid = parseInt(req.params.id)

    return res.status(204).json({})
}