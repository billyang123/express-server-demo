<style lang="less" scoped>
    
</style>
<template>
    <article>
    	<h1>{{content.title}}</h1>
    	<p>{{content.abstract}}</p>
    	<div class="article-content" v-html="dMarkHtml">
    	</div>
    </article>
</template>
<script>
	import Vue from 'vue';
	import Marked from 'marked'
	import highlightjs from 'highlight.js'
 	import 'highlight.js/styles/googlecode.css'
 	Marked.setOptions({
	  highlight: (code) => highlightjs.highlightAuto(code).value
	})
    export default {
        data () {
            return {
            	
                // s_markdown: markdown,
            }
        },
        components: {},
        computed: {
           dMarkHtml(){
           		return Marked(this.content.content||'',{ sanitize: true })
           }
        },
        props:["content"],
        created(){
           // console.log(console.log(marked('I am using __markdown__.'));)
        },
        methods: {
           
        }
    }
</script>