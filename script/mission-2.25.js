window.onload=function(){
    var aSpan=document.getElementsByTagName("span");
    var btn_insert=document.getElementById("insert");
    var btn_del=document.getElementById("del");
    var btn_search=document.getElementById("search_btn");
    for(var i=0; i<aSpan.length;i++){
        aSpan[i].onselectstart=function(){return false;}//取消多击span文字被选中
        aSpan[i].onclick=toggle;
    }
    var aDt=document.getElementsByTagName("dt");
    for(var i=0;i<aDt.length;i++){
        aDt[i].onclick=addColorChange;
    }
    aDt[0].onclick();
    btn_insert.onclick=insertNode;
    btn_del.onclick=delNode;
    btn_search.onclick=searchNode;
}
function addClass(obj,name){
    if(obj.className.search(name)==-1){
        if(obj.className)
            obj.className+=" "+name;
        else
            obj.className=name;
    }
}
function removeClass(obj,name){
    if(obj.className){
        var reg=new RegExp("(\\s|^)"+name+"(\\s|$)")
        console.log(reg)
        obj.className=obj.className.replace(reg,"");
    } 
}
//张开和伸缩
function toggle(){
    var obj=this.parentNode.parentNode;
    var abj=obj.children;
    if(abj[1]){
        if(abj[1].className.search("hide")==-1){
            var aDd=obj.getElementsByTagName("dd");
            var aDt=obj.getElementsByTagName("dt");
            for(var i=0;i<aDd.length;i++){
                addClass(aDd[i],"hide");
            }
            for(var i=0; i<aDt.length;i++){
                aDt[i].children[0].innerHTML="+";
            }
        }
        else{
            for(var i=1;i<abj.length;i++){
                removeClass(abj[i],"hide");
                abj[i].parentNode.children[0].children[0].innerHTML="-";
            }
        }
    }
    else{
        this.innerHTML=this.innerHTML=="+"?"-":"+";
    }
    return false;
}
function addColorChange(){
    var delResult=document.getElementById("root").parentNode.getElementsByTagName("dt");
    for(var i=0;i<delResult.length;i++){
        removeClass(delResult[i],"result");
    }
    var oDt=document.getElementById("root").parentNode.getElementsByClassName("selected")[0];
    if(oDt){
        removeClass(oDt,"selected")
    }
    addClass(this,"selected");
} 
//插入新节点
function insertNode(){
    var txt=document.getElementById("node");
    if(txt.value){
        var oDt=document.getElementById("root").parentNode.getElementsByClassName("selected")[0];
        var add=oDt.parentNode.children;
        var sign=0;
        for(var i=1;i<add.length;i++){
            removeClass(add[i],"hide");
            var dt=add[i].children[0].children[0].childNodes[1].nodeValue ;
            if(dt==txt.value){
                sign=1;
                alert("节点创建失败，此目录下已含此节点！");
            }
        }
        oDt.children[0].innerHTML="-";
        if(sign) return;
        var oDd=document.createElement("dd");
        oDd.innerHTML="<dl><dt><span>+</span>"+txt.value+"</dt></dl>";
        oDt.parentNode.appendChild(oDd);
        var newDt=oDd.getElementsByTagName("dt")[0];
        newDt.onclick=addColorChange;
        newDt.children[0].onclick=toggle;
        newDt.children[0].onselectstart=function(){return false;}
    }
}
//删除节点
function delNode(){
    var oDt=document.getElementById("root").parentNode.getElementsByClassName("selected")[0];
    if(oDt.id=="root"){
        alert("根节点不可删除！");
    }
    else{
        var p1=oDt.parentNode.parentNode;
        var p2=p1.parentNode;
        p2.removeChild(p1);
        p2.children[0].onclick();
    }
}
//搜索节点
function searchNode(){
    var txt=document.getElementById("node");
    if(txt.value){
        var aDt=document.getElementsByTagName("dt");
        var sign=1;
        for(var i=0;i<aDt.length;i++){
            if(aDt[i].childNodes[1].nodeValue==txt.value){
                expandParent(aDt[i]);
                addClass(aDt[i],'result')
                sign=0;
            }
        }
        if(sign)
            alert("未创建此节点！");
    }
}
//展开父节点
function expandParent(obj){
    var odd=obj.parentNode.parentNode;
    if(odd.nodeName.toLowerCase()!="body"){
        var ad=odd.parentNode.children;
        for(var i=1;i<ad.length;i++){
            removeClass(ad[i],"hide");
        }
        odd.parentNode.children[0].children[0].innerHTML="-";
        expandParent(odd);
    }
}