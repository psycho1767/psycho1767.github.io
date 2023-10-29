const btnflesh = document.querySelectorAll('.btnnext');

btnflesh.forEach((e)=>{
    e.addEventListener('mouseover', ()=>{
        const nextbtnimage = e.querySelector('img');
        nextbtnimage.src = '../image/aroowhite.png';
    })
    e.addEventListener('mouseleave', ()=>{
        const nextbtnimage = e.querySelector('img');
        nextbtnimage.src = '../image/aroo.png';
    })
})