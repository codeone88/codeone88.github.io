
var themeMaker = {
    setHolderCSS: function (holder, innerHolder) {
    	holder.style.cssText = "text-align:center;";
    	innerHolder.style.cssText = "display:inline-block;";
    	/* doesn't work on iOS 10 */
        //holder.style.cssText = "display: flex;justify-content: center;";
    },
    makeTheme: function (obj) {
        var doc = document,
        	innerHolder = document.createElement('div');
        for (var i = 0; i < obj.dayCount; i++) {
            var box = doc.createElement('div'),
                imageHolder = doc.createElement('span'),
                image = doc.createElement('img'),
                names = doc.createElement('span'),
                mmver = doc.createElement('span'),
                price = doc.createElement('span');

            //container for elements
            /*	
            	//doesn't work on iOS10
            	float: left;
				display: flex;
		  		justify-content: center;
		  	*/
            box.style.cssText = "\
					position: relative;\
					width: " + obj.dayWidth + "px;\
					height: " + obj.dayHeight + "px;\
					margin:10px;\
					display:inline-block; \
		  			";
					
			//image holder element	
            imageHolder.style.cssText = "\
		  			position:absolute;\
					background:#6762FF;\
					border-radius:15px;\
					top:0px;\
		  			left:50%; \
		  			-webkit-transform:translate(-50%, 0); \
					width: " + obj.imgWidth + "px;\
					height: " + obj.imgWidth / 1.5 + "px;\
					overflow: hidden;\
					";
            box.appendChild(imageHolder);

            //image element	
            image.id = obj.iconsName + i;
            image.style.cssText = "\
		  			position:absolute;\
					width: 120%;\
		  			left:50%; \
					top:50%;\
		  			-webkit-transform:translate(-50%, -50%); \
					";
            image.src = obj.iconURL + 'im' + (i+1) + ".png";
            imageHolder.appendChild(image);

            //name element
            names.innerHTML = "Theme";
            names.id = obj.themesName + i;
            names.style.cssText = "\
			    position:absolute;\
					color:" + obj.color +";\
					top:" + obj.dayTop + "px;\
					text-align:left;\
					left:50%; \
		  			-webkit-transform:translate(-50%, 0); \
					width: " + obj.dayWidth + "px;\
					font-size:" + obj.fontSize + "px;\
					font-family:" + obj.font + ";\
					";
            box.appendChild(names);
			
			//min - max ios element
            mmver.innerHTML = "iOS min - max";
            mmver.id = obj.mmvName + i;
            mmver.style.cssText = "\
			    	position:absolute;\
					bottom:" + obj.tempBottom + "px;\
					text-align:left;\
					left:0; \
					width: " + obj.dayWidth / 2 + "px;\
					color:" + obj.color +";\
					opacity:0.5;\
					font-size:14px;\
					font-family:" + obj.font + ";\
					;"
            box.appendChild(mmver);

            //price element
            price.innerHTML = "price";
            price.id = obj.priceName + i;
            price.style.cssText = "\
			    	position:absolute;\
					bottom:" + obj.tempBottom + "px;\
					text-align:right;\
					left:50%; \
					width: " + obj.dayWidth / 2 + "px;\
					color:" + obj.color +";\
					font-size:16px;\
					font-family:" + obj.font + ";\
					;"
            box.appendChild(price);
            innerHolder.appendChild(box);
            obj.holder.appendChild(innerHolder);
        }
        this.setHolderCSS(obj.holder, innerHolder);
        window.fcastObj = {
        	dayCount: obj.dayCount,
        	iconURL: obj.iconURL,
        	icon: obj.iconsName,
        	day: obj.themesName,
        	mmv: obj.mmvName,
        	temp: obj.priceName

        };
    }
};