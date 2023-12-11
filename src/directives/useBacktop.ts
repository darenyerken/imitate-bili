import type { DirectiveBinding } from "vue";
function useBackTop (){
    return {
        mounted(el:HTMLElement, binding:DirectiveBinding) {
            el.addEventListener('click',function(){
                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                })
            })
            window.addEventListener('scroll',function() {
                if(this.document.documentElement.scrollTop > binding.value) {
                    el.style.display = 'block'
                } else {
                    el.style.display = 'none'
                }
            })
        },
    }
}

export {useBackTop}