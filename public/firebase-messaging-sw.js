importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');
firebase.initializeApp({
  messagingSenderId: '634466289053',
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload.data);
        // const notices = [];
        // const stringifiedNotices = windowlocalStorage.getItem('notices');
        // if (stringifiedNotices) {
        //   notices = JSON.parse(stringifiedNotices);
        // }
        // notices.unshift(payload.data);
        // localStorage.setItem('notices', JSON.stringify(notices));
      }
    })
    .then(() => {
      console.log('Sent message to tabs.', payload);
      return registration.showNotification(
        'RoomId and Password is now available! Check Tournament Page!'
      );
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
  // ToDo: Handle notification click
  console.log({ event });
});
