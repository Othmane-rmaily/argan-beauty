<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Argan Beauty</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-soft-beige">
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-argan-gold">Argan Beauty</h1>
                <p class="text-rich-brown">Admin Dashboard</p>
            </div>
            
            @if(session('error'))
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {{ session('error') }}
                </div>
            @endif
            
            <form method="POST" action="{{ route('admin.login.submit') }}">
                @csrf
                <div class="mb-4">
                    <label for="email" class="block text-charcoal-black mb-2">Email</label>
                    <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-argan-gold" required>
                </div>
                
                <div class="mb-6">
                    <label for="password" class="block text-charcoal-black mb-2">Password</label>
                    <input type="password" id="password" name="mot_de_passe" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-argan-gold" required>
                </div>
                
                <button type="submit" class="w-full bg-argan-gold text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
                    Login
                </button>
            </form>
        </div>
    </div>
</body>
</html>