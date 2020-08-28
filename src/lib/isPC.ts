function isPC(){
    // if(document.documentElement.clientWidth > 500){
        //   window.alert('请使用手机打开本页面，以保证浏览效果')
        //   // const img = document.createElement('img')
        //   img.src = '/qrcode.png'
        //   img.style.left = '50%'
        //   img.style.top = '50%'
        //   img.style.transform = 'translate(-50%,-50%)'
        //   img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
        //   document.body.appendChild(img)
        // }

    const userAgentInfo = navigator.userAgent
    const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
    ]
    let flag = true
    for(let i=0;i<Agents.length;i++){
        if(userAgentInfo.indexOf(Agents[i])>0){
            flag = false
            break
        }
    }
    return flag
}

export default isPC