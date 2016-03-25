window.onload=function(){
    var LO=document.getElementById("leftOut");
    var RO=document.getElementById("rightOut");
    var LI=document.getElementById("leftIn");
    var RI=document.getElementById("rightIn");
    var UL=document.getElementById("list");
    var search=document.getElementById("search");
    var input=document.getElementById("in");
    LI.onclick=function(){
        insert(0);
    }
    RI.onclick=function(){
        insert(1);
    }
    LO.onclick=function(){
        var aLi=UL.getElementsByTagName("li");
        if(aLi.length){
            UL.removeChild(aLi[0]);
        }
    }
    RO.onclick=function(){
        var aLi=UL.getElementsByTagName("li");
        if(aLi.length){
            UL.removeChild(aLi[aLi.length-1]);
        }
    }
    search.onclick=function(){
        var in_text=input.value;
        if(in_text.length){
            var aLi=UL.getElementsByTagName("li");
            for(var i=0;i<aLi.length;i++){
                    aLi[i].style.backgroundColor="red";
                if(aLi[i].innerHTML.toLowerCase().search(in_text.toLowerCase())>-1){//匹配到改变背景颜色
                    aLi[i].style.backgroundColor="gray";
                }
            }
        }
    }
    input.onkeyup=function(e){
        if(e.keyCode==13){
            search.onclick();
        }
    }
}
//从textarea中分离出元素
function getWord(args){
    var str=new Array();
    str[0]="";
    for(var i=0,j=0;i<args.length;i++){
        if((/\w/).test(args[i])||(/^[\u4e00-\u9fa5]$/).test(args[i])){//如果匹配到字母或数字或下划线或汉字则加入str[j]中
            str[j]+=args[i];
        }
        else{
            if(str[j]!=""){//匹配到分隔符且srt[j]不是空字符串,则更新str
                str[++j]="";
            }
        }
    }
    if(str[str.length-1]=="")
        str.length=str.length-1;
    return str;
}
function insert(t){
    var txt=document.getElementById("text");
    var UL=document.getElementById("list");
    var aLi=UL.getElementsByTagName("li");
    var arr=new String;
    if(txt.value!=""){
        arr=getWord(txt.value);
    }
    if(arr.length>0){
        if(t==0){//从左插入
            var li=document.createElement("li");
            li.innerHTML=arr[arr.length-1];
            if(aLi.length){
                UL.insertBefore(li,aLi[0]);
            }
            else{
                UL.appendChild(li);
            }
            for(var i=arr.length-2;i>=0;i--){
                li=document.createElement("li");
                li.innerHTML=arr[i];
                UL.insertBefore(li,aLi[0]);
            }
        }
        else{//从右插入
            for(var i=0;i<arr.length;i++){
                var li=document.createElement("li");
                li.innerHTML=arr[i];
                UL.appendChild(li);
            }
        }
    }
}