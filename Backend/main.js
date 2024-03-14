// Angir variablene som inneholder alle bossene og hvilke bosser man allerede har gjettet
var BOSSES;

// En ajax som snakker med getData.php
// Nesten all koden er skrevet innenfor her
$.ajax({
    url: '../Backend/getData.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        BOSSES = data;

        // Velger en tilfeldig boss som skal være det riktige svaret
        let rightBoss = BOSSES[Math.floor(Math.random() * BOSSES.length)];
        console.log(rightBoss);

        $(".attributeText").hide();

        // Legger inn alle valgene spilleren kan velge mellom når de skriver inn et input
        const guessInput = $('#guessInput');
        BOSSES.forEach(function(boss) { 
            const option = $('<option>').attr('value', boss.name);
            guessInput.append(option);
        });

        // Sjekker om inputet til spilleren er gyldig, og enabler/disabler knappen avhengig av det
        $('#bossInput').on('input', function() {
            const inputValue = $(this).val();
            const bossNames = BOSSES.map(boss => boss.name);

            if (bossNames.includes(inputValue)) {
                $('#guessButton').prop('disabled', false);
            } else {
                $('#guessButton').prop('disabled', true);
            }
        });

        // Kjører når spilleren trykker 'submit'
        // Styrer resten av funksjonene og rekkefølgen ting skjer
        $("#guessButton").click(function() {    
            $(".attributeText").show();
            
            let info = checkBoss();
            let board = document.getElementById("gameBoardCol");
            let row = document.createElement("div");
            row.className = "attribute-row";
            
            createBoxes(info, row);
            board.appendChild(row);

            $('#bossInput').val('');
            $(this).prop('disabled', true);
        });

        // Sjekker om hver verdi til bossen spilleren gjettet er riktig, delvis riktig eller feil
        // Returner denne informasjonen
        function checkBoss() {
            let bossGuess = BOSSES.find(item => item.name === $("#bossInput").val());
            
            let name;
            let area;
            let location;
            let phases;
            let species;

            if(bossGuess.name === rightBoss.name) {
                name = "correct";
            } else {
                name = "wrong";
            }

            if (arraysMatch(bossGuess.area, rightBoss.area)) {
                area = "correct";
            } else if (containsCommonValue(bossGuess.area, rightBoss.area)) {
                area = "partial";
            } else {
                area = "wrong";
            }
            
            if (arraysMatch(bossGuess.location, rightBoss.location)) {
                location = "correct";
            } else if (containsCommonValue(bossGuess.location, rightBoss.location)) {
                location = "partial";
            } else {
                location = "wrong";
            }        

            if(arraysMatch(bossGuess.phases, rightBoss.phases)) {
                phases = "correct";
            } else {
                phases = "wrong";
            }

            if(arraysMatch(bossGuess.species, rightBoss.species)) {
                species = "correct";
            } else if(containsCommonValue(bossGuess.species, rightBoss.species)) {
                species = "partial";
            } else {
                species = "wrong";
            }

            return {
                boss: bossGuess,
                name: name,
                area: area,
                location: location,
                phases: phases,
                species: species
            }
        }

        // Lager boksene som sier hvor riktig spilleren var på gjettet sitt
        function createBoxes(info, row) {
            let bossGuess = info.boss;
            delete info.boss;

            // Går igjennom hver verdi og lager en boks med klasse
            for(const attribute in info) {
                let box = document.createElement("div");
                box.className = "attribute-box";
                row.appendChild(box);

                // Legger til tekst og klasser
                if(attribute === "name" || attribute === "phases") {
                    let text = document.createElement("p");
                    text.innerHTML = bossGuess[attribute];
                    text.className = "attribute-text";
                    box.appendChild(text);
                } else {
                    for(let i = 0; i < bossGuess[attribute].length; i++) {
                        let text = document.createElement("p");
                        text.innerHTML = bossGuess[attribute][i];
                        text.className = "attribute-text";
                        box.appendChild(text);
                    }
                }

                // Angir farge etter hvor korrekt gjettet var
                if(info[attribute] === "correct") {
                    box.style.backgroundColor = "green";
                } else if(info[attribute] === "partial") {
                    box.style.backgroundColor = "yellow";
                } else {
                    box.style.backgroundColor = "red";
                }
            }

            checkWin(bossGuess);
        }

        // Sjekker om to lister inneholder en lik verdi
        function containsCommonValue(array1, array2) {
            return array1.some(value => array2.includes(value));
        }

        // Sjekker om to lister er like
        function arraysMatch(arr1, arr2) {
            return JSON.stringify(arr1) === JSON.stringify(arr2);
        }

        // Sjekker om spilleren har vunnet, og gjør alert boksen synlig
        function checkWin(bossGuess) {
            if (bossGuess === rightBoss) {
                document.getElementById('alertBox').style.display = 'block';
                document.getElementById('correctGuess').innerHTML = rightBoss.name;
            }
        }

        // Fjerner alert boksen
        $(".close-btn").click(function() {
            document.getElementById('alertBox').style.display = 'none';
        });

        // Reloader siden
        $("#reloadPage").click(function() {
            location.reload();
        });
    },
    
    error: function(xhr, status, error) {
        console.error('Error retrieving data:', error);
    }
});