<?php
require_once 'admin/config.php';
$games = json_decode(GAMES, true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <a href="/" class="text-2xl font-bold"><?php echo SITE_NAME; ?></a>
                <div class="hidden md:flex space-x-4">
                    <a href="#live-results" class="text-gray-300 hover:text-white">Live Results</a>
                    <a href="#historical" class="text-gray-300 hover:text-white">Historical</a>
                    <a href="#charts" class="text-gray-300 hover:text-white">Charts</a>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <span id="current-time" class="text-gray-300"></span>
                <a href="/admin/login.php" class="text-gray-300 hover:text-white">
                    <i class="fas fa-user"></i>
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to <?php echo SITE_NAME; ?></h1>
            <p class="text-xl text-gray-200 mb-8">Get Live Results and Historical Data</p>
            <div class="inline-flex rounded-md shadow">
                <a href="#live-results" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    View Results
                </a>
            </div>
        </div>
    </div>

    <!-- Live Results Section -->
    <section id="live-results" class="py-12">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center">Live Results</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($games as $gameId => $gameInfo): ?>
                <div class="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold"><?php echo $gameId; ?></h3>
                        <span class="text-sm text-gray-400"><?php echo $gameInfo['time']; ?></span>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-yellow-500 mb-2" data-game="<?php echo strtolower($gameId); ?>">
                            **
                        </div>
                        <div class="text-sm text-gray-400">
                            Next Update: <span class="countdown">Loading...</span>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Historical Results Section -->
    <section id="historical" class="py-12 bg-gray-800">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center">Historical Results</h2>
            <div class="bg-gray-900 rounded-lg p-4">
                <iframe src="https://docs.google.com/spreadsheets/d/e/<?php echo GOOGLE_SHEETS_ID; ?>/pubhtml?widget=true&amp;headers=false"
                        class="w-full h-96 border-0"></iframe>
            </div>
        </div>
    </section>

    <!-- Charts Section -->
    <section id="charts" class="py-12">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center">Game Charts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($games as $gameId => $gameInfo): ?>
                <div class="bg-gray-800 rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-4"><?php echo $gameId; ?> Chart</h3>
                    <div class="grid grid-cols-10 gap-2">
                        <?php for ($i = 0; $i < 100; $i++): ?>
                        <div class="aspect-square bg-gray-700 rounded flex items-center justify-center text-sm">
                            <?php echo str_pad($i, 2, '0', STR_PAD_LEFT); ?>
                        </div>
                        <?php endfor; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 py-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="text-center md:text-left mb-4 md:mb-0">
                    <h3 class="text-xl font-bold mb-2"><?php echo SITE_NAME; ?></h3>
                    <p class="text-gray-400">Live Results and Historical Data</p>
                </div>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-telegram"></i>
                    </a>
                </div>
            </div>
            <div class="mt-8 text-center text-gray-400 text-sm">
                <p>&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>