console.log('connected: width = ', getWindowWidth())
const h1WindowWidth = document.getElementById('window-width')
function getWindowWidth(){
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width;
}

h1WindowWidth.textContent = getWindowWidth();

// Add event listener to h1 tag to update width value on resize
window
    .addEventListener('resize',()=>{
        h1WindowWidth.textContent = getWindowWidth();
    })

