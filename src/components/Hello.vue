<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ msg }}</h2>
    <p>{{ msg }}</p>
    <p class="xxx">{{ msg }}</p>
    <a>{{ msg }}</a>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

/**
 * import语法
 * sass的导入(@import)规则和CSS的有所不同，编译时会将@import的scss文件合并进来只生成一个CSS文件。但是如果在sass文件中导入css文件如@import 'reset.css'，那效果跟普通CSS导入样式文件一样，导入的css文件不会合并到编译后的文件中，而是以@import方式存在。
 * 所有的sass导入文件都可以忽略后缀名.scss。一般来说基础的文件命名方法以_开头，如_mixin.scss。这种文件在导入的时候可以不写下划线，可写成@import "mixin"。
 * 引入.css文件，会是全局的样式，上面加scoped并不能限制，而scss可以。
 */
@import "css.css";
@import "./scss";  // 可以不加后缀


/**
 * 变量
 * sass的变量必须是$开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(:)分隔开（就像CSS属性设置一样），如果值后面加上!default则表示默认值。
 * 默认变量
 * sass的默认变量仅需要在值后面加上!default即可。
 */
$fontSize: 20px !default;
p{
    font-size:$fontSize;
}
$fontSize: 12px;
p.xxx{
    font-size:$fontSize;
}

/**
 * 特殊变量
 * 一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以#{$fontSize}形式使用。
 */
$borderDirection:       top !default; 
$baseFontSize:          12px !default;
$baseLineHeight:        1.5 !default;

//应用于class和属性
.border-#{$borderDirection}{
  border-#{$borderDirection}:1px solid #ccc;
}
//应用于复杂的属性值
body{
    font:#{$baseFontSize}/#{$baseLineHeight};
}


/**
 * 多值变量
 * 多值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象。
 */
/**
 * list
 * list数据可通过空格，逗号或小括号分隔多个值，可用nth($var,$index)取值。关于list数据操作还有很多其他函数如length($list)，join($list1,$list2,[$separator])，append($list,$value,[$separator])等，具体可参考sass Functions（搜索List Functions即可）
 */

//一维数据
$px: 5px 10px 20px 30px;
//二维数据，相当于js中的二维数组
$px: 5px 10px, 20px 30px;
$px: (5px 10px) (20px 30px);
a{
  padding: nth($px,1);
  font-size: nth(nth($px,2), 2);
}

$linkColor:         #08c #1ff !default;//第一个值为默认值，第二个鼠标滑过值
a{
  color:nth($linkColor,1);

  &:hover{
    color:nth($linkColor,2);
  }
}

/**
 * map
 * map数据以key和value成对出现，其中value又可以是list。格式为：$map: (key1: value1, key2: value2, key3: value3);。可通过map-get($map,$key)取值。关于map数据还有很多其他函数如map-merge($map1,$map2)，map-keys($map)，map-values($map)等，具体可参考sass Functions（搜索Map Functions即可）
 */
$headings: (h1: 2.5em, h2: 2.0em, h3: 1.7em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
h4 {
  font-size: map-get($headings,h3);
}


/**
 * 选择器嵌套
 * 所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。在选择器嵌套中，可以使用&表示父元素选择器
 */
#top_nav{
  line-height: 40px;
  text-transform: capitalize;
  background-color:#333;
  li{
    float:left;
  }
  a{
    display: block;
    padding: 0 10px;
    color: #fff;

    &:hover{
      color:#ddd;
    }
  }
}


/**
 * 混合(mixin)
 * sass中使用@mixin声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的@mixin通过@include来调用。
 */
@mixin center-block {
    margin-left:auto;
    margin-right:auto;
}
.demo{
    @include center-block;
}

@mixin opacity($opacity:50) {
  opacity: $opacity / 100;
  filter: alpha(opacity=$opacity);
}
.demo{
    @include opacity;
    @include opacity();
}
.demo{
    @include opacity(80);
}

/**
 * 多个参数mixin
 * 调用时可直接传入值，如@include传入参数的个数小于@mixin定义参数的个数，则按照顺序表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。
 */
@mixin horizontal-line($border:1px dashed #ccc, $padding:10px){
    border-bottom:$border;
    padding-top:$padding;
    padding-bottom:$padding;  
}
.imgtext-h li{
    @include horizontal-line(1px solid #ccc);
}
.imgtext-h--product li{
    @include horizontal-line($padding:15px);
}


/**
 * @content
 * @content在sass3.2.0中引入，可以用来解决css3的@media等带来的问题。它可以使@mixin接受一整块样式，接受的样式从@content开始。
 */
@mixin max-screen($res){
  @media only screen and ( max-width: $res )
  {
    @content;
  }
}

@include max-screen(480px) {
  body { color: red }
}
/* PS：@mixin通过@include调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，所以从3.2.0版本以后，建议传递参数的用@mixin，而非传递参数类的使用下面的继承%。 */

/**
 * 继承
 * sass中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词@extend，后面紧跟需要继承的选择器。
 */
h1{
  border: 4px solid #ff9aa9;
}
.speaker{
  @extend h1;
  border-width: 2px;
}


/**
 * 占位选择器%
 * 从sass 3.2.0以后就可以定义占位选择器%。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了@extend去继承相应的样式，都会解析出来所有的样式。占位选择器以%标识定义，通过@extend调用。
 */
$lte7: 1;
%ir{
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
%clearfix{
  @if $lte7 {
    *zoom: 1;
  }
  &:before,
  &:after {
    content: "";
    display: table;
    font: 0/0 a;
  }
  &:after {
    clear: both;
  }
}
#header{
  h1{
    @extend %ir;
    width:300px;
  }
}
.ir{
  @extend %ir;
}

//css style
//-------------------------------
/*
#header h1,
.ir{
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
#header h1{
  width:300px;
}
*/
/*
如上代码，定义了两个占位选择器%ir和%clearfix，其中%clearfix这个没有调用，所以解析出来的css样式也就没有clearfix部分。占位选择器的出现，使css文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的css。
ps：在@media中暂时不能@extend @media外的代码片段，以后将会可以。
 */



/**
 * 函数
 * sass定义了很多函数可供使用，当然你也可以自己定义函数，以@fuction开始。sass的官方函数链接为：sass fuction，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以lighten减淡和darken加深为最，其调用方法为lighten($color,$amount)和darken($color,$amount)，它们的第一个参数都是颜色值，第二个参数都是百分比。
 */

$baseFontSize:10px !default;
$color:gray;

// pixels to rems 
@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}

body{
  font-size:$baseFontSize;
  color:lighten($color,10%);
}
.test{
  font-size:pxToRem(16px);
  color:darken($color,10%);
}


/**
 * 运算
sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错。
$baseFontSize:          14px !default;
$baseLineHeight:        1.5 !default;
$baseGap:               $baseFontSize * $baseLineHeight !default;
$halfBaseGap:           $baseGap / 2  !default;
$samllFontSize:         $baseFontSize - 2px  !default;

//grid 
$_columns:                     12 !default;      // Total number of columns
$_column-width:                60px !default;   // Width of a single column
$_gutter:                      20px !default;     // Width of the gutter
$_gridsystem-width:            $_columns * ($_column-width + $_gutter); //grid system width
 */


/**
 * @if判断
 * @if可一个条件单独使用，也可以和@else结合多条件使用
 */
$lte7: true;
$type: monster;
.ib{
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

/**
 * for循环
 * for循环有两种形式，分别为：@for $var from <start> through <end>和@for $var from <start> to <end>。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。
 */
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}

/**
 * @each循环
 * 语法为：@each $var in <list or map>。其中$var表示变量，而list和map表示list类型数据和map类型数据。sass 3.3.0新加入了多字段循环和map数据循环。
单个字段list数据循环
 */
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

/**
 * 多个字段list数据循环
 */
$animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $animal, $color, $cursor in $animal-data {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

/**
 * 多个字段map数据循环
}
 */
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
</style>
