/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/**
 * THIS IS FOR NOTIFICATION FIREBASE
 */
// importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js")
// importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js")

// firebase.initializeApp({
//   apiKey: "AIzaSyBIFEFI89NRgkVwyPbQfS-KOb1Cjvdqkug",
//   authDomain: "testls-8f0d1.firebaseapp.com",
//   projectId: "testls-8f0d1",
//   storageBucket: "testls-8f0d1.appspot.com",
//   messagingSenderId: "481776257236",
//   appId: "1:481776257236:web:8742360f5383dd4d1b5341"
// })

// const isSupported = firebase.messaging.isSupported()

// if (isSupported) {
//   const messaging = firebase.messaging()

//   messaging.onBackgroundMessage(({ notification: { title, body, image }, data }) => {
//     const options = { body, icon: image }

//     self.registration.showNotification(title, options)

//     self.onnotificationclick = (event) => {
//       // console.log('On notification click: ', event.notification.tag);
//       event.notification.close()

//       // This looks to see if the current is already open and
//       // focuses if it is
//       event.waitUntil(
//         clients
//           .matchAll({
//             type: "window"
//           })
//           .then((clientList) => {
//             for (const client of clientList) {
//               if (client.url === "/" && "focus" in client) return client.focus()
//             }
//             // if (clients.openWindow) {
//             //   let link = (notificationId) ? clients.openWindow(`/user/notifyBell/${notificationId}`) : ''
//             //   // let link = (notificationId) ? clients.openWindow(`/user/notifyBell/${notificationId}`) : clients.openWindow(`/`)
//             //   return link
//             // }
//           })
//       )
//     }
//   })
// }
