const text_speed = 20

function format_entry(k, v){
    k = k.replace("_", " ")
    k_split = k.split(" ")
    for (let i = 0; i < k_split.length; i++){
        k_split[i] = k_split[i][0].toUpperCase() + k_split[i].substr(1)
    }
    return k_split.join(" ") + ": " + v
}
function write_c(i, c){
    $("#" + i).html($("#" + i).html() + c)
}
function wait(m) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, m);
    })
}
async function write_p(txt, i){
    for (let j = 0; j < txt.length; j++){
        write_c(i, txt[j])
        await wait(text_speed)
    }
}

$.getJSON("https://api.ipify.org?format=json", data => {
    $.getJSON('https://ipapi.co/' + data.ip + '/json', async doxx => {
        let p_id = 0
        for ([k, v] of Object.entries(doxx)){
            $("#doxx").append("<p id='" + p_id + "'></p>")
            await write_p(format_entry(k, v), p_id)
            p_id++
        }
        $("#doxx").append("<p id='warning'></p>")
        await write_p("This website is not malicious and DOES NOT store this data.", "warning")
  });
})