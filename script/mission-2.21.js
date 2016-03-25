window.onload=function(){
    var oInput=document.getElementById("in");
    var tag=document.getElementById("tag");
    var oBtn=document.getElementById("search");
    var oTxt=document.getElementById("text");
    oInput.onkeyup=function(e){
        var oe=e||event;
        if(oe.keyCode==13||oe .keyCode==32||oe.keyCode==188){
            var liTxt=this.value;
            liTxt=liTxt.replace(/[，]+/g,"");
            liTxt=liTxt.replace(/[,]+/g,"");
            liTxt=liTxt.replace(/(^\s+)|(\s+$)/,"");
            if(!duCheck(tag,liTxt)){
                if(liTxt.length){
                    var li=document.createElement("li");
                    li.innerHTML=liTxt;
                    tag.appendChild(li);
                    li.onmouseover=add;
                    li.onmouseout=delAdd;
                    li.onclick=delChild;
                    var aLi=tag.getElementsByTagName("li");
                    if(aLi.length>10){
                        tag.removeChild(aLi[0]);
                    }
                }
            }
            this.value="";
        }
        else{
            console.log(oInput.value);
            if(oInput.value[0]==","){
                oInput.value=oInput.value.substring(1);
            }
        }
    }
    oBtn.onclick=function(){
        var oHob=document.getElementById("hobby");
        var arr=new Array;
        arr=oTxt.value.split(/\s+/);
        for(var i=0;i<arr.length;i++){
            if(arr[i].length){
                if(!duCheck(oHob,arr[i])){
                    var li=document.createElement("li");
                    li.innerHTML=arr[i].replace("<","&lt");
                    console.log(arr[i]+" "+li.innerHTML);
                    oHob.appendChild(li);
                    var aLi=oHob.getElementsByTagName("li");
                    if(aLi.length>10){
                        oHob.removeChild(aLi[0]);
                    }
                }
            }
        }
    }
    oTxt.onfocus=function(){
        if(this.value==this.defaultValue){
            this.value="";
        }
    }
    oTxt.onblur=function(){
        if(this.value==""){
            this.value=this.defaultValue;
        }
    }
}
function add(){
    this.innerHTML="点击删除 "+this.innerHTML;
}
function delAdd(){
    this.innerHTML=this.innerHTML.substring(5);
}
function delChild(){
    tag.removeChild(this);
}
function duCheck(tag,txt){
    var aLi=tag.getElementsByTagName("li");
    for(var i=0;i<aLi.length;i++){
        if(aLi[i].innerHTML.toLowerCase()==txt.toLowerCase())
            return true;
    }
    return false;
}