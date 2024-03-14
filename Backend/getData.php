<?php
// Informasjon om MySQL server og login angis
$servername = "172.20.128.60";
$username = "jm";
$password = "Akademiet99";
$dbname = "wordle_project";

// Lager kobling til MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Sjekker koblingen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Henter data fra MySQL tabelet
$sql = "SELECT * FROM Bosser";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    // Henter data fra hver rad og formaterer det til et JavaScript array med objekter
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

// Steng koblingen
$conn->close();

// Sett header for å indikere JSON-innhold
header('Content-Type: application/json');

// Output data som JSON
echo json_encode($data);
?>