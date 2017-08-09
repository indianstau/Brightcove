 Kyle 有將 js css json 分離出來 
  
O開頭是原始檔  
[OCustomize.css](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/OCustomize.css)  
[OCustomize.js](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/Customize.js)  
  
product file into textTrack  
[sample.vtt](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/sample.vtt)    
[LV.vtt](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/LV.vtt)  
  
  
### change ###  
[Customize.css](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/Customize.css)    
主要調整icon位置 (for player style Graphite Xluna)
```
.material-icons {
    margin-top: 5px;
}
```  

調整product-thumbs的大小  
```  
.product-thumbs{ 
    height: 81%; //原本331px
}
```  

把@media 拿掉 全螢幕有問題  待解決    
抓螢幕大小無法要用JS 寫全螢幕判斷蓋height:760px  

[Customize.js](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/Customize.js)  
Demo是三個Video放一頁所以修正control bar抓的位置把icon掛上去  
```  
controlBar[2].appendChild(newElement);
```  
index改成2  
  
單獨一個player時沒有問題  
但多個player時按不到向下 
```  
.product-arrow.down{  
   z-index:99;     
}  
```  
      
[bootstrapMin.css](https://raw.githubusercontent.com/IXlinfairuser/Shoppable-Sample/master/ShoppingVideo_Customize/bootstrapMin.css)  
由於modal會使全部變黑   修正bootstrap裡的css  未解決  
另掛css檔  
```  
.modal backdrop {
     background-color: none;
}
```  
