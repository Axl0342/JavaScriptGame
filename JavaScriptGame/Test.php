<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Java Script Game</title>
</head>
<body>
<scirpt src= "https://unpkg.com/kaplay@3001.0.19/dist/kaplay,js">
<ul>
  <li>Id: <input id= "player" type="text"></li>
  <li>Time: <input id= "time" type="text"></li>

  <button type="button" onclick="submitForm()">Submit</button>
</ul>

<script>
function submitForm() {
  var formData = {
    player: $('#player').val(),
    time: $('#time').val()

  };

  $.ajax({
    type: 'POST',
    url: 'save_score.php',
    data: formData
  })
  .done(function(msg) {
    alert('Data Saved: ' + msg);
  })
}
</script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</body>
</html>