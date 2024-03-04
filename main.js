var BOSSES;
var currentGuesses = [];

$.ajax({
    url: 'getData.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        BOSSES = data;

        let rightBoss = BOSSES[Math.floor(Math.random() * BOSSES.length)];
        console.log(rightBoss);

        $(".attributeText").hide();


        const guessInput = $('#guessInput');
        BOSSES.forEach(function(boss) { 
            const option = $('<option>').attr('value', boss.name);
            guessInput.append(option);
        });

        $('#bossInput').on('input', function() {
            const inputValue = $(this).val();
            const bossNames = BOSSES.map(boss => boss.name);

            if (bossNames.includes(inputValue)) {
                $('#guessButton').prop('disabled', false);
            } else {
                $('#guessButton').prop('disabled', true);
            }
        });


        $('#bossInput').on('input', function() {
            const inputValue = $(this).val();
            const options = $('#guessInput').children();

            let optionFound = false;
            options.each(function() {
                if ($(this).val() === inputValue) {
                    optionFound = true;
                    return false;
                }
            })

            if (optionFound) {
                $('#guessButton').prop('disabled', false);
            } else {
                $('#guessButton').prop('disabled', true);
            }
        })


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


        function checkBoss() {
            let bossGuess = BOSSES.find(item => item.name === $("#bossInput").val());
            currentGuesses.push(bossGuess);
            
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


        function createBoxes(info, row) {
            let bossGuess = info.boss;
            delete info.boss;

            for(const attribute in info) {
                let box = document.createElement("div");
                box.className = "attribute-box";
                row.appendChild(box);

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

                if(info[attribute] === "correct") {
                    box.style.backgroundColor = "green";
                } else if(info[attribute] === "partial") {
                    box.style.backgroundColor = "yellow";
                } else {
                    box.style.backgroundColor = "red";
                }
            }
        }


        function containsCommonValue(array1, array2) {
            return array1.some(value => array2.includes(value));
        }

        function arraysMatch(arr1, arr2) {
            return JSON.stringify(arr1) === JSON.stringify(arr2);
        }
    },
    error: function(xhr, status, error) {
        console.error('Error retrieving data:', error);
    }
});