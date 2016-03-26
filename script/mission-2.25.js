var oDt=null;
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
//张开和伸缩
function toggle(){
    var obj=this.parentNode.parentNode;
    var abj=obj.children;
    if(abj[1]){
        if(abj[1].className.search("hide")==-1){
            var aDd=obj.getElementsByTagName("dd");
            var aDt=obj.getElementsByTagName("dt");
            for(var i=0;i<aDd.length;i++){
                if(aDd[i].className.search("hide")==-1){
                    aDd[i].className+=" hide";
                }
            }
            for(var i=0; i<aDt.length;i++){
                aDt[i].children[0].innerHTML="+";
            }
        }
        else{
            for(var i=1;i<abj.length;i++){
                abj[i].className=abj[i].className.replace(/^\s*hide\s*$/,"");
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
    if(oDt){
        oDt.style.background="white";
        oDt.style.color="black";
    }
    this.style.background="gray";
    this.style.color="white";
    oDt=this;
} 
//插入新节点
function insertNode(){
    var txt=document.getElementById("node");
    if(txt.value){
        var add=oDt.parentNode.children;
        for(var i=1;i<add.length;i++){
            var dt=add[i].children[0].children[0].childNodes[1].nodeValue ;
            if(dt==txt.value){
                alert("节点创建失败，此目录下已含此节点！");
                return;
            }
        }
        var oDd=document.createElement("dd");
        oDd.innerHTML="<dl><dt><span>+</span>"+txt.value+"</dt></dl>";
        oDt.parentNode.appendChild(oDd);
        var newDt=oDd.getElementsByTagName("dt")[0];
        newDt.onclick=addColorChange;
        newDt.children[0].onclick=toggle;
        newDt.children[0].onselectstart=function(){return false;}//
        var abj=oDt.parentNode.children;
        for(var i=1;i<abj.length-1;i++){
            abj[i].className=abj[i].className.replace(/^\s*hide\s*$/,"");
        }
        oDt.children[0].innerHTML="-";
    }
}
//删除节点
function delNode(){
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
        for(var i=0;i<aDt.length;i++){
            if(aDt[i].childNodes[1].nodeValue==txt.value){
                aDt[i].onclick();
                expandParent(aDt[i]);
                return ;
            }
        }
        alert("未创建此节点！");
        return;
    }
}
//展开父节点
function expandParent(obj){
    var odd=obj.parentNode.parentNode;
    if(odd.nodeName.toLowerCase()!="body"){
        var ad=odd.parentNode.children;
        for(var i=1;i<ad.length;i++){
            ad[i].className=ad[i].className.replace(/^\s*hide\s*$/,"");
        }
        odd.parentNode.children[0].children[0].innerHTML="-";
        expandParent(odd);
    }
}