const fetchData = require("../services/apiService");

const USERS_API_URL = "https://bever-aca-assignment.azurewebsites.net/users";

const fetchUsers = async (req, res, next) => {
    try {
        const usersData = await fetchData(USERS_API_URL);
        req.users = usersData.value;
        next();
    } catch (error) {
        next({ status: 500, message: "Internal Server Error!" });
    }
}

module.exports = fetchUsers;