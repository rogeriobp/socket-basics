var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' joined ' + room);

socket.on('connect', function(){
  console.log('connected to socket.io server!');

});

socket.on('message', function(message){
  var momentTimestamp = moment.utc(message.timestamp);
  var $messages = jQuery('.messages');

  console.log('New message:');
  console.log(message.text);

  $messages.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('HH:mm') + '</strong></p>');
  $messages.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
  event.preventDefault();

  var $message = $form.find('input[name=message]')

  socket.emit('message', {
    name: name,
    text: $message.val()
  });

  $message.val('');
});
