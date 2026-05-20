// import Imap from "imap";
// import { simpleParser } from "mailparser";

// export const checkBounceWithinTime = (timeout = 30000) => {
//   return new Promise((resolve) => {
//     let completed = false;

//     const imap = new Imap({
//       user: process.env.EMAIL_USER,
//       password: process.env.EMAIL_PASS,

//       host: "imap.gmail.com",
//       port: 993,
//       tls: true,

//       tlsOptions: {
//         rejectUnauthorized: false,
//       },
//     });

//     const finish = (result) => {
//       if (!completed) {
//         completed = true;

//         try {
//           imap.end();
//         } catch {}

//         resolve(result);
//       }
//     };

//     // wait max 30 sec
//     const timer = setTimeout(() => {
//       console.log(" No bounce mail received");

//       finish({
//         bounce: false,
//       });
//     }, timeout);

//     imap.once("ready", () => {
//       imap.openBox("INBOX", false, (err) => {
//         if (err) {
//           clearTimeout(timer);

//           return finish({
//             bounce: false,
//           });
//         }

//         imap.search(
//           [["UNSEEN"], ["FROM", "mailer-daemon@googlemail.com"]],
//           (err, results) => {
//             if (err || !results.length) {
//               return;
//             }

//             console.log(" Bounce Mail Found");

//             const fetch = imap.fetch(results, {
//               bodies: "",
//               markSeen: true,
//             });

//             fetch.on("message", (msg) => {
//               msg.on("body", async (stream) => {
//                 const parsed = await simpleParser(stream);

//                 const text = (parsed.text || "").toLowerCase();

//                 const isBounce =
//                   text.includes("550 5.1.1") ||
//                   text.includes("address not found") ||
//                   text.includes("no such user");

//                 if (isBounce) {
//                   clearTimeout(timer);

//                   console.log(" Invalid Email Detected");

//                   finish({
//                     bounce: true,
//                   });
//                 }
//               });
//             });
//           },
//         );
//       });
//     });

//     imap.once("error", (err) => {
//       console.log("IMAP ERROR:", err);

//       clearTimeout(timer);

//       finish({
//         bounce: false,
//       });
//     });

//     imap.connect();
//   });
// };

import Imap from "imap";
import { simpleParser } from "mailparser";

export const checkBounceWithinTime = (receiverEmail, timeout = 30000) => {
  return new Promise((resolve) => {
    let completed = false;

    const imap = new Imap({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,

      host: "imap.gmail.com",
      port: 993,
      tls: true,

      tlsOptions: {
        rejectUnauthorized: false,
      },
    });

    const finish = (result) => {
      if (!completed) {
        completed = true;

        clearInterval(pollingInterval);

        try {
          imap.end();
        } catch {}

        resolve(result);
      }
    };

    // max wait timer
    const timer = setTimeout(() => {
      console.log("No bounce mail received");

      finish({
        bounce: false,
      });
    }, timeout);

    const checkInbox = () => {
      imap.search(
        [["UNSEEN"], ["FROM", "mailer-daemon@googlemail.com"]],
        (err, results) => {
          if (err || !results.length) {
            return;
          }

          const fetch = imap.fetch(results, {
            bodies: "",
            markSeen: true,
          });

          fetch.on("message", (msg) => {
            msg.on("body", async (stream) => {
              try {
                const parsed = await simpleParser(stream);

                const text = (parsed.text || parsed.html || "").toLowerCase();

                const lowerReceiver = receiverEmail.toLowerCase();

                // receiver email match
                const emailMatched = text.includes(lowerReceiver);

                // bounce keywords
                const isBounce =
                  text.includes("550 5.1.1") ||
                  text.includes("address not found") ||
                  text.includes("does not exist") ||
                  text.includes("no such user") ||
                  text.includes("your message wasn't delivered");

                if (emailMatched && isBounce) {
                  clearTimeout(timer);

                  console.log("Invalid Email Detected:", receiverEmail);

                  finish({
                    bounce: true,
                  });
                }
              } catch (error) {
                console.log("MAIL PARSE ERROR:", error);
              }
            });
          });
        },
      );
    };

    let pollingInterval;

    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err) => {
        if (err) {
          clearTimeout(timer);

          return finish({
            bounce: false,
          });
        }

        // initial check
        checkInbox();

        // poll every 3 sec
        pollingInterval = setInterval(() => {
          checkInbox();
        }, 3000);
      });
    });

    imap.once("error", (err) => {
      console.log("IMAP ERROR:", err);

      clearTimeout(timer);

      finish({
        bounce: false,
      });
    });

    imap.connect();
  });
};
