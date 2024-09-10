const headers = {

    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  
};

module.exports = { headers };
