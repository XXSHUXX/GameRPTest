var ifclick = Array(101);
var ifboom = Array(101);
var count = 0;
var intLen,intWid;
function getLenWid()
{
    var len = document.getElementById("getLength").value;
    var wid = document.getElementById("getWidth").value;
    if(len == "" || wid == "" || isNaN(len) || isNaN(wid))
    {
        len = "5";
        wid = "5";
    }
    intLen = parseInt(len);
    intWid = parseInt(wid);
    if(intLen>20 || intLen <0 || intWid > 5 || intWid < 0)
    {
        intLen = 5;
        intWid = 5;
    }
}
function isBlack(value)
{
    var nowImg = document.getElementById(value);
    if(ifclick[parseInt(value)]) return;
    ifclick[parseInt(value)] = true;
    count++;
    if( ifboom[parseInt(value)])
    {
        nowImg.src = "img/red.png";
        var str = "unlucky！";
        if(count <  (intLen*intWid / 10 + 1))
            str = "very lucky！";
        else
        if(count < (intLen*intWid / 4 + 1))
            str = "lucky！"
        else
        if(count < (intLen*intWid / 2 + 1))
            str = "good！";
        var gameView = document.getElementById("gameView");
        gameView.innerHTML = "\nYou tired " + count +" times！<br/>" + str + "<br/> <button onclick='rePaint()'>restart</button><br/><br/>";
        for(var i=1;i<=intLen;i++)
        {
            for(var j=1;j<=intWid;j++)
            {
                var strId = i.toString() + j.toString();
                var intId = parseInt(strId);
                if(ifclick[intId] && ifboom[intId])
                    gameView.innerHTML += "<img src = 'img/red.png' /> ";
                else
                    if(ifclick[intId] && !ifboom[intId])
                        gameView.innerHTML += "<img src = 'img/black.png' /> "
                else
                    if(!ifclick[intId])
                        gameView.innerHTML += "<img src = 'img/white.png' /> "
            }
            gameView.innerHTML += "<br/>";
        }

    }
    else
    {
        nowImg.src = "img/black.png";
    }
}
function randInt(L,R)
{
    var range = R - L + 1;
    return Math.floor(Math.random()*range + 1);
}
function rePaint()
{
    count = 0;
    var gameView = document.getElementById("gameView");
    gameView.innerHTML = "Click white block and try to find out the red block!<br/><br/>";
    getLenWid();
    for(var i=1;i<=intLen;i++)
    {
        for(var j=1;j<=intWid;j++)
        {
            var itid =  i.toString() + j.toString();
            ifboom[parseInt(itid)] = false;
            ifclick[parseInt(itid)] = false;
            gameView.innerHTML += "<img " +
                ("src = 'img/white.png'"  ) +
                ("id  = '" + itid + "'" ) +
                "onclick='isBlack(this.id)'/> ";
        }
        gameView.innerHTML += "<br/>"
    }
    var rndx = randInt(1,intLen);
    var rndy = randInt(1,intWid);
    var itid =  rndx.toString() + rndy.toString();
    ifboom[parseInt(itid)] = true;
}

rePaint();
