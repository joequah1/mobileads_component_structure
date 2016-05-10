/*
* Description
* so the whole idea behind the structure, is with minimal changes neded to use it in both templated ad and freeflow ad 
* make sure that there's NO changes needed in the prototype render and events, when using in both ad
* the only minimal changes is only allowed in the constructor 
*
* the params pass in vary for different type, but will have those which is necessary, please refer to the commments below
* 
* use only javascript in the whole component if possible
* prototye EVENTS support only NATIVE Javascript, NO jquery allowed, because freeflow ad serving doesn't import jquery
* constructor and render can use jquery, but not recommeneded 
*/
var component = function (options) {
    /* currently the content is pass in as jquery object, and need to change to javascript object */
    this.content = document.querySelector(options.content.selector);
    this.data = options.data;
    
    /* variable which need to be manipulated for freeflow */
    this.slider;
    this.l = 0;
    
    this.render();
    this.events();
}

component.prototype = {
    initialize : function () {},
    render : function () {
        
        this.slider = document.createElement('div');
        this.slider.className
            = 'slider';
        
        for (var i = 0; i < this.data.images.length; i++) {
            var img = '<img src="'+ this.data.images[i].src +'"/>';
            
            this.slider.innerHTML += img;
        }
        this.l = i;
        
        this.content.appendChild(this.slider);
    },
    events : function () {
        var _this = this;
        /* native javascript only */
        var i = 0;
        setInterval(function () {
            console.log();
            _this.slider.childNodes[i].style.display = 'none';
            
            i++;
            
            if (i >= _this.l) {
                i = 0;
            }
            
            _this.slider.childNodes[i].style.display = 'block';
            
        }, 2000);
    }
}

/* Initializing */
new component ({
    container : $('#test'), //optional (freeflow ad creation)
    id : 1,
    content : $('#test'), // needed for rendering only
    controller : null, //optional (freeflow creation)
    sdk : null, //optional (freeflow)
    tab : 'tab1',
    layer : 'layer1', //optional (freeflow)
    data : {
        images : [
            {src:'https://unanchor-blog.s3.amazonaws.com/2011/04/destination-seoul.jpg',click:'http://www.landing.com'},
            {src:'http://www.compares.sg/wp-content/uploads/2015/08/seoul-south-korea-300x250.jpg',click:'http://www.test.com'},
            {src:'http://data.whicdn.com/images/165572428/superthumb.jpg',click:'http://www.example.com'}
        ]
    } // needed for rendering only
})