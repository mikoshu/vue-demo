<style lang="sass">
	.select{
		position: relative;
		display: inline-block;
		input[type="text"]{
			border-radius: 6px;
		    border: 1px solid #ccc;
		    background: #fff;
		    line-height: 40px;
		    height:40px;
		    font-size: 16px;
		    text-indent: 12px;
		}
		
	    &:after{
	    	content: " ";
	    	position:absolute;
	    	right:10px;
	    	top:16px;
	    	border:10px solid #ccc;
	    	border-left:10px solid transparent;
	    	border-right:10px solid transparent;
	    	border-bottom:10px solid transparent;
	    }
	    .showList-transition{
	    	transition: opacity .3s;
	    	opacity:1;
	    }
	    .showList-leave,.showList-enter{
	    	opacity:0;
	    }
	    ul{
	    	box-sizing: border-box;
	    	position: absolute;
	    	width:100%;
	    	max-height: 150px;
	    	background:#fff;
	    	overflow: auto;
	    	border:1px solid #ccc;
	    	border-radius: 6px;
	    	z-index:999;
	    	li{
	    		line-height: 30px;
				padding:0 10px;
				&:hover{
					background:#f0f0f0;
				}
	    	}
	    	.active{
	    		background:#ccc;
	    	}
	    }
	}
</style>

<template>
	<div class="select">
		<input type="text" placeholder="请选择..." v-on:focus="showList" v-on:blur="hideList" v-el:input v-on:input="search" >
		<input type="hidden" v-el:hidden>
		<ul v-show="show" v-el:list transition="showList" >
			<li v-for="(index,val) in listData" v-el:list data-value="{{val.value}}" v-on:mousedown="chooseList" >{{val.title}}</li>
		</ul>
	</div>
	
</template>

<script>
	module.exports = {
		props: {
			mockData: {
				type: Array
			}
		},
		data: function(){
			return {
				show: false, 
				listData: this.mockData,
				scrollTop: 0
			}
		},
		methods:{
			showList:function(){
				this.show = true;
				var text = this.$els.input.value;
				if(text != ""){
					this.listData.every(function(val,index){
						if(val.title == text){	
							var li = this.$els.list.querySelectorAll('li');
							for(var i=0;i<li.length;i++){
								if(i == index){
									li[i].className = "active";

								}else{
									li[i].className = "";
								}
							}
							return false
						}else{
							return true
						}
					}.bind(this))
				}
				setTimeout(function(){
					this.$els.list.scrollTop = this.scrollTop;
				}.bind(this),0)



				
			},
			hideList: function(){
				this.show = false
			},
			chooseList: function(e){
				var text = e.target.innerHTML;
				var value = e.target.getAttribute("data-value");
				this.$els.input.value = text;
				this.$els.hidden.value = value;	
				this.scrollTop = this.$els.list.scrollTop;
				console.log(this.scrollTop)
			},
			search: function(e){
				var text = e.target.value;
				this.mockData.sort(function(pre,next){
					if(!!~pre.title.indexOf(text)){
						return -1
					}
					if(!!~next.title.indexOf(text)){
						return 1
					}
				})
			}
		}
	}
</script>