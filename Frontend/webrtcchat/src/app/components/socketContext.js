import React from 'react';

const socketContext = React.createContext();

export default socketContext;


// export const connectSocket = () => {
//   return socket.connect();
// };

// export const disconnectSocket = () => {
//   return socket.disconnect();
// };

// export const onConnected = (callback) => {
//   socket.on('connectCallback', callback);
// };

// export const emitConnected = (message) => {
//   socket.emit('connected', message);
// };

// export const onMessage = (callback) => {
//   socket.on('message', callback);
// };

// export const emitMessage = (message) => {
//   socket.emit('message', message);
// };

// export const emitDisconnect = (message) => {
//   socket.emit('disconnect');
// };