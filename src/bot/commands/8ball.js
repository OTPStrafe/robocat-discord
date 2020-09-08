
function rollBall(args){
    const ball = [
        "Sapen't", 'Tu vieja es trola.', 'Soy yo literal',
        'SAPEEEEEEEE', 'No soy yo la concha de tu madre.', 'Sin tiempo para morir solo en cines.',
        'https://paypal.me/otpstrafe, Que lindo link.', 'Pasen porno :enojao:', 'Pueden usar -info para irse a la concha de su madre',
        'Pueden aportar al proyecto en https://paypal.me/otpstrafe'
    ]
    let response = ball[Math.floor(Math.random() * ball.length)]
    if(!args){
        return 'Tienes que ingresar tu pregunta...'
    }
    
    return response;

}

module.exports = {
    rollBall
}