let apiKey = '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'; 
const topic = document.getElementById('topic')
const keyword = document.getElementById('keyword')
const par = document.getElementById('paragraphs')
const btn = document.getElementById('start')
const btnc = document.getElementById('copy')
const meslist = document.getElementById('meslist')
const ding = new Audio('../audio/tel.mp3')
const img = './image/ico/close.png'
let regex = /"(.*?)"/;
let topics = []
let listpars = []
let htmlcode = ``

btn.addEventListener('click', async (e) => {
    sender('شروع فرایند تولید...')
    btnc.classList.remove('active')
    btnc.innerHTML = '';
    btnc.classList.add('loader')
    await gettopics(topic.value,par.value)
});

meslist.addEventListener('mouseover', (e)=>{
    const messages = document.querySelectorAll('.message')
    messages.forEach((EL)=>{
        EL.addEventListener('click', (e)=>{
            if(e.target.classList.contains('mesclose')){
                EL.remove()
            }
        })

    })
})

btnc.addEventListener('click', (e)=>{
    if(btnc.classList.contains('active')){
    let textarea = document.createElement('textarea');
    textarea.value = htmlcode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    }
})


async function chat(mes) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const params = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: mes }],
        temperature: 0.7
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify(params)
        });

        if (!res.ok) {
            throw new Error('خطا در دریافت داده‌ها. کد وضعیت: ' + res.status);
        }

        const data = await res.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function gettopics(mes,numpar=5){
    sender("درحال دریافت عنوان ها...")
    mes = `${numpar} از عنوان های مقاله ای با موضوع ${mes} بنویس لطفا به عنوان ها به زبان فارسی باشن و در یک لیست از یک تا ${numpar} عدد داشته باشن همچنین عنوان ها درون دابل کوتیشن باشن`
    const text = await chat(mes);
    let textspil = text.split('\n')
    textspil.forEach((Element)=>{
        topics.push(Element.match(regex)[1]);
    })
    await getpars(topics)
}

async function getpars(topicslist) {
    sender('درحال دریافت پاراگراف ها...')
    for (const item of topicslist) {
        let messagepar = `درباره ${item}  در یک پاراگراف توضیح بده به زبان فارسی`;
        let resp = await chat(messagepar);
        listpars.push(resp);
    }
    let listdata = listpars;
    listpars = []
    await addkeyword(listdata)
}


async function addkeyword(fullpars){
    sender('افزودن کلمه کلیدی...')
    for(Element of fullpars){
        let listtext = Element.split(' ');
        let randomindex = Math.floor(Math.random()*listtext.length+1)
        listtext.splice(randomindex , 0,keyword.value)
        let randomindex1 = Math.floor(Math.random()*listtext.length+1)
        listtext.splice(randomindex1 , 0,keyword.value)
        listpars.push(listtext.join(' '))
    }
    await htmlmaker()
}


async function htmlmaker(){
    for(let i = 0 ; i < topics.length;i++){
        htmlcode += `
        <h2>${topics[i]}</h2>
        <p>${listpars[i]}</p>
        `
    }
    btnc.classList.remove('loader')
    btnc.innerHTML = 'کپی کنید';
    btnc.classList.add('active')

    sender('محتوا آماده شد!')
}

function sender(message){
    let newelement = document.createElement('div');
    newelement.classList.add('message')
    newelement.innerHTML = message;
    let newimage = document.createElement('img')
    newimage.src = img
    newimage.classList.add('mesclose')
    newelement.appendChild(newimage)
    meslist.appendChild(newelement)
    ding.play()
    setTimeout(() => {
        newelement.remove()
    }, 20000);
}
