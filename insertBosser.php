<?php
// Logger før dekoding
echo "Before decoding: $bss_js <br>";

// Konverter JavaScript string til PHP liste
$bss_php = json_decode($bss_js, true);

// Logger etter dekoding
echo "After decoding: ";
var_dump($bss_php);

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

// Angir informasjonen om bossen i PHP variabel
$bossName = $_POST['bossName'];
$bossArea = $_POST['bossArea'];
$bossLocation = $_POST['bossLocation'];
$bossPhases = $_POST['bossPhases'];
$bossSpecies = $_POST['bossSpecies'];

// Sjekker om spilleren skrev inn mer enn en verdi på noen av inputsa
if ($_POST['bossAreaOpt'] != "") {
    $bossArea .= "\", \"" . $_POST['bossAreaOpt'];
}

if ($_POST['bossLocationOpt'] != "") {
    $bossLocation .= "\", \"" . $_POST['bossLocationOpt'];
}

if ($_POST['bossSpeciesOpt'] != "") {
    $bossSpecies .= "\", \"" . $_POST['bossSpeciesOpt'];
}

// JavaScript array som innholder data om bossene
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

// Konverterer JavaScript array string til PHP array
$bss_php = json_decode($bss_js, true);

// Legger til hver boss i MySQL tabelet hvis den allerede ikke finnes
foreach ($bss_php as $boss) {
    $name = $conn->real_escape_string($boss['name']);
    $area = $conn->real_escape_string(json_encode($boss['area']));
    $location = $conn->real_escape_string(json_encode($boss['location']));
    $phases = $boss['phases'];
    $species = $conn->real_escape_string(json_encode($boss['species']));

    // Sjekker om bossen finnes i tabelet
    $check_query = "SELECT * FROM Bosser WHERE name = '$name' AND area = '$area' AND location = '$location' AND phases = $phases AND species = '$species'";
    $result = $conn->query($check_query);

    // Hvis den ikke eksisterer allerede, legg den til i tabelet
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

// Steng koblingen
$conn->close();

// Returner til hovedsiden
header("Location: index.html");
exit;
?>