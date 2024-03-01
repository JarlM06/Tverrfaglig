<?php
$servername = "172.20.128.60"; // Change this to your MySQL server's hostname or IP address if it's hosted on a different server
$username = "jm";
$password = "Akademiet99";
$dbname = "wordle_project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve data from your table
$sql = "SELECT * FROM Bosser";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    // Fetch data from each row and format it into a JavaScript array of objects
    while($row = $result->fetch_assoc()) {
        $data[] = array(
            'name' => $row['name'],
            'area' => json_decode($row['area']),
            'location' => json_decode($row['location']),
            'phases' => $row['phases'],
            'species' => json_decode($row['species'])
        );
    }
} else {
    echo "0 results";
}

// Close the database connection
$conn->close();

// Set the response header to indicate JSON content
header('Content-Type: application/json');

// Output the data as JSON
echo json_encode($data);
?>