export const createStompClient = () => {
    const Stomp = require('stompjs')
    var SockJS = require('sockjs-client')
    SockJS = new SockJS('http://localhost:8080/ws')
    return Stomp.over(SockJS)
}