const respondWith = (status, statusCode, data, res) => {
    res.status(statusCode).json({
        status,
        message: "success",
        data,
    });
};

module.exports = respondWith;
