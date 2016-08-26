<template>
	<h3>here is a test input</h3>
	<input type="text" class="input" v-on:input="check" placeholder="请输入..." >
	<span class="input-msg">{{notice}}</span>
	<slot></slot>
	<slot name="a"></slot>
</template>

<script>
	module.exports = {
		props: ['rules'],
		data: function data() {
	        return {
	            notice: "",
	            test: {
	            	digital: [/^[\d\.]+$/, '请输入纯数字']
	            }
	        };
	    },
	    methods:{
	    	check: function(e){
	    		var text = e.target.value,
	    			textLength = text.length;
	    		var rules = this.rules.split(";")
	    		rules.every(function(val,index){
	    			if(!!~val.indexOf(":")){
	    				var rule = val.split(":");
	    				if(rule[0] == 'min'){
	    					if(textLength < rule[1]){
	    						this.notice = '字数最多不得少于'+rule[1]+'个字！';
	    						return false
	    					}
	    				}else if(rule[0] == 'max'){
	    					if(textLength > rule[1]){
	    						this.notice = '字数最多不得超过'+rule[1]+'个字！';
	    						return false
	    					}
	    				}
	    			}else{
	    				if(this.test[val] != undefined){
	    					if(!this.test[val][0].test(text)){
	    						this.notice = this.test[val][1]
	    						return false
	    					}else{
	    						this.notice = "√"
	    					}
	    				}else{
	    					throw "input组件没有该规则 "+val
	    					return false
	    				}
	    			}
	    			return true
	    		}.bind(this))
	    	}
	    }
	}
</script>

<style>
	.input{
		border-radius: 6px;
		border:1px solid #eee;
		background:#fff;
		line-height: 40px;
		font-size:16px;
		text-indent: 12px;
	}
	.input-msg{
		color:red;
		font-size:14px;
		line-height: 40px;
	}
</style>