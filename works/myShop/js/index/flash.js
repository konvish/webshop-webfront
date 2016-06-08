// JavaScript Document
var NowFrame = 1;
var MaxFrame = 8;
var bStart = 0;
var   t; 
function fnToggle() {
    var next = NowFrame + 1;

    if(next == MaxFrame+1) 
    {
        NowFrame = MaxFrame;
        next = 1;
    }

    if(bStart == 0)
    {
        bStart = 1;
        
        t= setTimeout('fnToggle()', 4000);

        return;
    }
    else
    {
        flash.filters[0].Apply();

        document.images['oDIV'+next].style.display = "";
        document.images['oDIV'+NowFrame].style.display = "none"; 

        flash.filters[0].Play(duration=7);
 
setTimeout('gospan(NowFrame)', 1000)
        if(NowFrame == MaxFrame) 
            NowFrame = 1;
        else
            NowFrame++;
    }    t= setTimeout('fnToggle()', 5000);
}

function gonow(cur)
{
 	
	document.images['oDIV'+cur].style.display = "";
	gospan(cur);
	if(cur != NowFrame)
	{
	        document.images['oDIV'+NowFrame].style.display = "none";
	        
	        NowFrame = cur;
	}
        clearTimeout(t);  
        t= setTimeout('fnToggle()', 5000);
        
}

function gospan(cur)
{
	for(i=1;i<=MaxFrame;i++)
	{
		document.getElementById("sp"+i).className = "mouseoff";  
	}
	
	document.getElementById("sp"+cur).className = "mouseon";  
}
fnToggle();