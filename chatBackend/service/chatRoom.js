module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('connected:', socket);
        var srvSockets = io.sockets.sockets;
        console.log('count:', Object.keys(srvSockets).length);
        // socket.on()
        socket.on('disconnect', () => {
            console.log('disonnected');
            var newsrvSockets = io.sockets.sockets;

            console.log('count:', Object.keys(newsrvSockets).length);
        })
    })
}