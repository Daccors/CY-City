<!DOCTYPE html>
<html>
<head>
    <title>Bienvenue à CY City</title>
</head>
<body>
    <h1>Bienvenue {{ $user->name }}</h1>
    <p>Votre compte a été créé avec succès. Veuillez cliquer sur le lien ci-dessous pour activer votre compte:</p>
    
    <a href="{{ url('api/verify-email/'.$token) }}">Activer mon compte</a>
    
    <p>Si vous n'avez pas créé ce compte, vous pouvez ignorer cet email.</p>
</body>
</html>