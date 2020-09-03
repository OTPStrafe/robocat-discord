
function turnPlay(res) {

    var userChoice = res

    if(userChoice === undefined) {
        return 'Tienes que elegir entre; Papel, Piedra y Tijeras';
    }

    var computerChoice = Math.random();
    if(computerChoice < 0.34){ computerChoice = 'piedra'}
    else if(computerChoice <= 0.67) { computerChoice = 'papel'}
    else{computerChoice = 'tijeras'}

    var compare = function (choice1, choice2) {

        if(choice1 === choice2){

            return 'El resultado es un empate!';

        } else {

            if(choice1 === "piedra"){

                if(choice2 === "papel"){

                    return 'El Papel le gana a la Piedra. ¡Yo Gano!'
                }
                else
                {
                    return 'La Piedra le gana a las Tijeras. ¡Ganaste! '
                }

            }
            else
            {
                if(choice1 === 'papel')
                {
                    if(choice2 === 'piedra')
                    {
                        return 'El Papel le gana a la Piedra. ¡Ganaste!'
                    
                    }
                    else 
                    {
                        return '¡Te cortaron el mil pedazos y pierdes!'
                    }
                }
            }
            if(choice1 === 'tijeras')
            {
                if(choice2 === 'piedra')
                {
                    return 'La piedra rompe a la tijera. Yo Gano.'
                }
                else
                {
                    return '¡Cortas a tu oponente y ganas la partida!'
                }
            }
        
        }
    }
    return compare(userChoice, computerChoice)
}

module.exports = {
    turnPlay
}