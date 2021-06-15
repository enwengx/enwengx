<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="item_content">
        <ul>
            <li><div class="item"></div></li>
        </ul>
    </div>
    <script>
        $(function(){
            function Pointer(x,y){
                this.x = x;
                this.y = y;
            }
            function Position(left,right) {
                this.left = left;
                this.right = right;
            }
            $(".item_content .item").each(function(i){
                this.init = function(){
                    this.box = $(this).parent();
                    $(this).attr("index",i).css({
                        position:"absolute",
                        left:this.box.offset().left,
                        top:this.box.offset().top
                    }).appendTo(".item_content");
                    this.drag();
                },
                this.move = function(callback) {
                    $(this).stop(true).animate({
                        left:this.box.offset().left,
                        top:this.box.offset().top
                    },500,function(){
                        if(callback) {
                            callback.call(this)
                        }
                    })
                },
                this.collisionCheck = function(){
                    var currentItem = this;
                    var direction = null;
                    $(this).siblings(".item").each(function(){
                        if(currentItem.pointer.x > this.box.offset().left &&
                        currentItem.pointer.y > this.box.offset().top &&
                        (currentItem.pointer.x < this.box.offset().left + this.box.width()) && 
                        (currentItem.pointer.y < this.box.offset().top + this.box.height())) {
                            if(currentItem.box.offset().top <　this.box.offset().top) {
                                direction = "down";
                            }else if(currentItem.box.offset().top > this.box.offset().top) {
                                direction = "up";
                            }else {
                                direction = "normal"
                            }
                            this.swap(currentItem, direction)
                        }
                    })
                },
                this.swap = function(currentItem,direction) {
                    if(this.moveing) return false;
                    var directions = {
                        normal: function(){
                            var saveBox = this.box;
                            this.box = currentItem.box;
                            currentItem.box = saveBox;
                            this.move();
                            $(this).attr("index",this.box.index());
                            $(currentItem).attr("index",currentItem.box.index())
                        },
                        down: function(){
                            var box = this.box;
                            var node = this;
                            var startIndex = currentItem.box.index();
                            var endIndex = node.box.index();
                            for(var i = endIndex; i > startIndex; i--) {
                                var preNode = $(".item_content .item[index=" + (i - 1) + "]");
                                node.box = preNode.box;
                                $(node).attr("index",node.box.index());
                                node.move();
                                node = preNode
                            }
                            currentItem.box = box;
                            $(currentItem).attr("index",box.index());
                        },
                        up: function(){
                            var box = this.box;
                            var node = this;
                            var startIndex = node.box.index();
                            var endIndex = currentItem.box.index();
                            for(var i = startIndex; i < endIndex; i++) {
                                var nextNode = $(".item_content .item[index=" + (i + 1) + "]");
                                node.box = nextNode.box;
                                $(node).attr("index",node.box.index());
                                node.move();
                                node = nextNode
                            }
                            currentItem.box = box;
                            $(currentItem).attr("index",box.index());
                        }
                    }
                    directions[direction].call(this);
                },
                this.drag = function(){
                    var oldPositon = new Position();
                    var oldPointer = new Pointer();
                    var isDrag = false;
                    var currentItem = null;
                    $(this).mousedown(function(e){
                        e.preventDefault();
                        oldPositon.left = $(this).position().left;
                        oldPositon.top = $(this).position().top;
                        oldPointer.x = e.clientX;
                        oldPointer.y = e.clientY;
                        isDrag = true;
                        currentItem = this
                    });
                    $(document).mousemove(function(e){
                        var currentPointer = new Pointer(e.clientX, e.clientY);
                        if(!isDrag) return false;
                        $(currentItem).css({
                            opacity:"0.8",
                            "z-index":999
                        })
                        var left = currentPointer.x - oldPointer.x + oldPointer.left;
                        var top = currentPointer.y - oldPointer.y + oldPointer.top;
                        $(currentItem).css({
                            left: left,
                            top: top
                        })
                        currentItem.pointer = currentPointer;
                        currentItem.collisionCheck()
                    });
                    $(document).mouseup(function(){
                        if(!isDrag) return false;
                        isDrag = false;
                        currentItem.move(function(){
                            $(this).css({
                                opacity:"1",
                                "z-index":0
                            })
                        })
                    })
                }
                this.init()
            })
        })
    </script>
</body>
</html>
