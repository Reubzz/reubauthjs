const error = {
    101: {
        message: "Authentication System Error || User doesn't exist",
        code: 101
    },
    102: {
        message: "Authentication System Error || Database Error",
        code: 102
    },
    103: {
        message: "Authentication System Error || Schema not supplied",
        code: 103
    },
    104: {
        message: "Authentication System Error || User ID missing",
        code: 104
    }
};

exports.deleteUser = async (options={id, Schema, response}) => {

    const id = options.id || null;
    const schema = options.Schema || null
    
    return new Promise(async (resolve, reject) => {
        if(!id) {
            return reject(error[104])
        }

        if(!schema) {
            reject(error[103]);
            return;
        }
        
        try {
            let searchUser = await schema.findOne({ _id: id })
            if (!searchUser) {
                return reject(error[101]);
            }
            schema.deleteOne({ _id: id })
                .then(() => {
                    return resolve({ code: 200, message: `Username: "${searchUser.username}" Deleted`, userdata: searchUser });
                })
                .catch(() => {
                    return reject(error[102]);
                })
        } catch (error) {
            console.log(error)
            return reject(error[102]);
        }
    })
}