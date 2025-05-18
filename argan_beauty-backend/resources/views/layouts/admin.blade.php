<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Argan Beauty Admin - @yield('title')</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.css')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-soft-beige text-charcoal-black">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-rich-brown text-white">
            <div class="p-4">
                <h1 class="text-2xl font-bold text-argan-gold">Argan Beauty</h1>
                <p class="text-sm">Administration</p>
            </div>
            <nav class="mt-6">
                <ul>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.dashboard') }}" class="block">Dashboard</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.products') }}" class="block">Products</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.categories') }}" class="block">Categories</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.users') }}" class="block">Users</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.producteurs') }}" class="block">Producteurs</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.admins') }}" class="block">Admins</a>
                    </li>
                    <li class="px-4 py-2 hover:bg-argan-gold">
                        <a href="{{ route('admin.logout') }}" class="block">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto">
            <header class="bg-white shadow">
                <div class="px-6 py-4">
                    <h2 class="text-xl font-semibold text-argan-gold">@yield('header')</h2>
                </div>
            </header>
            
            <main class="p-6">
                @yield('content')
            </main>
        </div>
    </div>
    
    @vite('resources/js/app.js')
</body>
</html>