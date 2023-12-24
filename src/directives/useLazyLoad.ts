import type { DirectiveBinding } from "vue";
function useLazyLoad (){
    return {
        mounted(el:HTMLElement, binding:DirectiveBinding) {
            const observer = new IntersectionObserver((entries)=> {
                // isIntersecting，元素当前是否在视口检测范围内
                // 因为有时元素初次渲染会在视口一闪而过
                // console.log(entries[0].isIntersecting,' ',binding.value);
                if( entries[0].isIntersecting) {
                    el.setAttribute('src',binding.value)
                    console.log(1);
                }
            }, {
                root:null,  //null代表window窗口是视口
                rootMargin:'100px', //扩大视口检测范围100px
                threshold:0.1 //元素与视口交叉率为0.1时候执行回调函数
            });
            observer.observe(el)
        }
    }
}

export {useLazyLoad}