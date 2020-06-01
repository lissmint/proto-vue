export default function assignWebSocketListeners(socket, serviceIdx){
    socket.onopen = function(event) {
        console.log("[open] Соединение установлено");
        console.log("Отправляем данные на сервер. id сервиса = " + serviceIdx);
        // services[s].ws.send("Меня зовут Джон" +);
      };
      
      socket.onmessage = function(event) {
        console.log(`[message] Данные получены с сервера: ${event.data}`);
      };
      
      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log('[close] Соединение прервано');
        }
      };
      
      socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);}
}