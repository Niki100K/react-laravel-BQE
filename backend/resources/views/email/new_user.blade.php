<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Registered</title>
</head>
<body>
    <h1>New Registration</h1>
    <p>user: <strong>{{ $user->first_name }} {{ $user->last_name }}</strong> just signed up</p>
    <p>Phone number: <strong>{{ $user->tel }}</strong></p>
</body>
</html>
