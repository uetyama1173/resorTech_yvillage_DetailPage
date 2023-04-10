
window.onload = function () {

    // URLを取得
    let url = new URL(window.location.href);

    // URLSearchParamsオブジェクトを取得
    let params = url.searchParams;

    //　param受け取り　.get(パラメータ名)
    let GetImg_url = params.get("img_url")
    let GetlandName = params.get("land_name") 
    let GetlandOutline = params.get("land_outline") 
    let Getbusinessday = params.get("businessday") 
    let Getaddress = params.get("address")
    let Getclosedday = params.get("closed_day")  
    let Getofficiallink = params.get("officiallink") 

    //パラメータ渡し
    const img_url = document.getElementById('img_url').innerHTML = `<img src=${GetImg_url}>`;
    const land_name = document.getElementById('land_name').innerHTML = GetlandName;
    const land_outline = document.getElementById('land_outline').innerHTML = GetlandOutline;
    const businessday = document.getElementById('businessday').innerHTML = `営業時間:${Getbusinessday}`;
    const address = document.getElementById('address').innerHTML = `住所:${Getaddress}`;
    const closed_day = document.getElementById('closed_day').innerHTML = `休館日:${Getclosedday}`;
    const officiallink = document.getElementById('official_link').innerHTML = `<a href=${Getofficiallink}>${Getofficiallink }`;


};