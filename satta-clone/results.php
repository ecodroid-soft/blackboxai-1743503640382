<?php
header('Content-Type: application/json');

// Function to read results from JSON file
function getResults() {
    $resultsFile = __DIR__ . '/data/results.json';
    if (file_exists($resultsFile)) {
        return json_decode(file_get_contents($resultsFile), true);
    }
    return [];
}

// Function to fetch historical results from Google Sheets
function getHistoricalResults() {
    $SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
    $SHEET_NAME = 'Results';
    
    // In production, implement proper Google Sheets API integration
    // For now, return empty array
    return [];
}

// Get current results
$currentResults = getResults();
$historicalResults = getHistoricalResults();

// Combine current and historical results
$response = [
    'date' => date('Y-m-d'),
    'results' => $currentResults,
    'historical' => $historicalResults,
    'status' => 'success',
    'message' => 'Results fetched successfully'
];

// Send JSON response
echo json_encode($response);