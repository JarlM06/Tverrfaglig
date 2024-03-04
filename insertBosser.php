<?php
// Before decoding
echo "Before decoding: $bss_js <br>";

// Convert JavaScript array string to PHP array
$bss_php = json_decode($bss_js, true);

// After decoding
echo "After decoding: ";
var_dump($bss_php);

$servername = "172.20.128.60";
$username = "jm";
$password = "Akademiet99";
$dbname = "wordle_project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$bossName = $_POST['bossName'];
$bossArea = $_POST['bossArea'];
$bossLocation = $_POST['bossLocation'];
$bossPhases = $_POST['bossPhases'];
$bossSpecies = $_POST['bossSpecies'];

if ($_POST['bossAreaOpt'] != "") {
    $bossArea .= "\", \"" . $_POST['bossAreaOpt'];
}

if ($_POST['bossLocationOpt'] != "") {
    $bossLocation .= "\", \"" . $_POST['bossLocationOpt'];
}

if ($_POST['bossSpeciesOpt'] != "") {
    $bossSpecies .= "\", \"" . $_POST['bossSpeciesOpt'];
}

// JavaScript array containing bosses data
$bss_js = <<<EOT
[
    {
        "name": "$bossName",
        "area": ["$bossArea"],
        "location": ["$bossLocation"],
        "phases": $bossPhases,
        "species": ["$bossSpecies"]
    }
]
EOT;

// Convert JavaScript array string to PHP array
$bss_php = json_decode($bss_js, true);

/// Insert each boss into the MySQL table if it doesn't already exist
foreach ($bss_php as $boss) {
    $name = $conn->real_escape_string($boss['name']);
    $area = $conn->real_escape_string(json_encode($boss['area']));
    $location = $conn->real_escape_string(json_encode($boss['location']));
    $phases = $boss['phases'];
    $species = $conn->real_escape_string(json_encode($boss['species']));

    // Check if the boss already exists in the table
    $check_query = "SELECT * FROM Bosser WHERE name = '$name' AND area = '$area' AND location = '$location' AND phases = $phases AND species = '$species'";
    $result = $conn->query($check_query);

    // If the boss doesn't exist, insert it into the table
    if ($result->num_rows == 0) {
        $sql = "INSERT INTO Bosser (name, area, location, phases, species) 
                VALUES ('$name', '$area', '$location', $phases, '$species')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully: $name<br>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Record already exists: $name<br>";
    }
}

// Close connection
$conn->close();

header("Location: index.html");
exit;
?>