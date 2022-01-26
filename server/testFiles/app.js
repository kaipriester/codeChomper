// Import functions from the slack node sdk
const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

// Create a new eventListener
const eventListener = createEventAdapter('5ac2a24de56689bf0a576f45362adcbf')

// The port we want to run our server on (should be the same as the argument we give to ngrok)
const port = 3000

// Create a new web client, used for sending messages
const client = new WebClient('xoxb-1747512047014-1769799140147-sSJhzjJR7lpJXI4PLo3iVZ0P')

// A list of user ids to represent our users in attendance
let usersInAttendance = []

// Register a new listener that will trigger on the 'message' event
eventListener.on('message', async (event) => {
  console.log('Received message: ', event)

  // If the message was sent by a bot (the 'bot_id' field exists) then do not reply
  if ('bot_id' in event)
    return

  // Check to see if '!start' is at the beginning of the message
  if (event.text.indexOf('!start') === 0) {
    // Remove '!start ' from the message to get the event name
    const eventName = event.text.substr(7)

    // Send our message back to that channel with instructions on how people can mark their attendance
    await client.chat.postMessage({
      channel: event.channel,
      text: `Welcome to ${eventName}, react with :hand: to show that you are here!`
    })
  }

  // Check to see if '!results' is at the beginning of the message
  if (event.text.indexOf('!results') === 0) {
    // This will surround the users ids in '<@' and '>' allowing it to be treated as a user reference in slack
    // Then we will join the list into a single string with a newline in between each user reference
    const usersListString = usersInAttendance.map(userId => `<@${userId}>`).join('\n')

    // Send a message displaying our user list string back to the same channel
    await client.chat.postMessage({
      channel: event.channel,
      text: `Thanks to the following people for attending:\n ${usersListString}`
    })
  }
})

// Register a new listener for the 'reaction_added' event
eventListener.on('reaction_added', async (event) => {
  console.log('Reaction Added', event)

  // Check if the reaction is specifically the :hand: reaction
  if (event.reaction === 'hand') {
    // Add the user to our users in attendance list
    usersInAttendance.push(event.user)
  }

  console.log(usersInAttendance)
})

// Start the server and print a message whenever the server has successfully started
eventListener.start(port).then(() => {
  console.log(`Server listening on port ${port}`)
})
