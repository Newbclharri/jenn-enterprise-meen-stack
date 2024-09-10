console.log('animate-jenn-ent connected!');

const container = document
    .getElementById('animated-text');
const text = "Jenn's Enterprise"


// Wraps each character of string text in span element
// and appends to the animation container
for(let i = 0; i < text.length; i++){
    span = document.createElement('span');
    //'\u00A0' is non breaking space character
    span.textContent = text[i] === " " ? '\u00A0' : text[i];
    span.style.animationDelay = `${i * 0.1}s`
    container.appendChild(span);
}

console.log(h1)