export const isUserRole = (req, res, next) =>{
    if(!req.user){
        return res.status(500).json({
            msg: 'Cant validate user without validating token first'
        });
    }

    const { role, name} = req.user;

    if(role !== 'USER_ROLE'){
        return res.status(401).json({
            msg: `${name} is not an user, cant use this endpoint`
        })
    }
    next()
}