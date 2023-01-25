// // const mongoose = require("mongoose");

// const Event = require("./eventModel");
// // const Event = mongoose.model('Event', EventSchema);

// /**
//  *
//  *
//  * @class EventMachine
//  *
//  * @get allEvents
//  * @get numberOfEvents
//  * @method getEventByIndex(index)
//  * @method newEvent(Event)
//  */

// class EventMachine {
//   constructor() {
//     this.events = [];
//     this.quantity = 0;
//     this.fetched = false;
//     this.#initiate();
//   }

//   // Return the data
//   // for the frontend to consume
//   get allEvents() {
//     return this.#promisedData(this.events);
//   }

//   get numberOfEvents() {
//     return this.#promisedData(this.quantity);
//   }

//   getEventByIndex(index) {
//     return this.#promisedData(this.events[index]);
//   }

//   // Setting up a new Event
//   newEvent({ host, created, details }) {
//     // Making sure we get the proper data
//     if (
//       typeof host != "string" ||
//       typeof details.title != "string" ||
//       // !details.date instanceof Date ||
//       !created instanceof Date
//     ) {
//       throw new Error("Input the proper data");
//     }

//     // Set the contructor with
//     // the inputer data
//     const newEvent = {
//       host,
//       created,
//       details,
//     };

//     this.#addEventToDB(newEvent);
//     return newEvent;
//   }

//   ////////////////////////////////////////////////
//   // Private Methods
//   ////////////////////////////////////////////////

//   // Printing all the events from the DB
//   async #initiate() {
//     // If we already fetched the data
//     // we just return all the events
//     if (this.events.length != 0) return;

//     // If not, we fetch the data
//     async function fetchingData(events) {
//       const allEvents = await Event.find({});
//       return allEvents;
//     }

//     try {
//       // After succesful fetching
//       const allEvents = await fetchingData(this.events);

//       // Update contructor data
//       this.events.push(...allEvents);
//       this.quantity = allEvents.length;
//       this.fetched = true;

//       // console.table(allEvents);
//     } catch (error) {
//       console.error("Couldn't fetch the data from MongoDB ");
//       console.error(error);
//     }
//   }

//   // Setting up asynchronusly
//   // the new event to the database
//   async #addEventToDB(event) {
//     const eventFromDB = await Event.create(event);
//     this.events.push(this.quantity);
//     this.quantity++;
//   }

//   #promisedData(dataToGet) {
//     return new Promise((resolve, reject) => {
//       const checkingData = () => {
//         if (this.fetched) {
//           resolve(dataToGet);
//           clearInterval(attempts);
//           clearInterval(ticking);
//         }
//       };

//       const failedToGetData = () => {
//         reject("Couldn't fetch the data succesfully");
//       };

//       const attempts = setInterval(checkingData, 50);
//       const ticking = setTimeout(failedToGetData, 2000);
//     });
//   }
// }

// module.exports = EventMachine;
