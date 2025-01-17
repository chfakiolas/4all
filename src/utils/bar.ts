export const progressBar = (selector: string, speed: number) => {
	let barSpeed = speed;
	const bar = document.querySelector(selector);
	
    if(bar) {
        const item: HTMLElement | null  = document.querySelector('.progress');
        console.log(item);
        if(item) {
            let itemValue:number | null = Number(item.dataset.progress);
            console.log(itemValue);
            if(itemValue) {
                var i = 0;
                // var value = $(this);
                
                var count = setInterval(function(){
                    if(i <= itemValue) {
                        var iStr = i.toString();
                        item.style.width = iStr+'%';
                        // css({
                        //     'width': 
                        // });
                        // value.find('.item_value').html(iStr +'%');
                    }
                    else {
                        clearInterval(count);
                    }
                    i++;
                }, barSpeed);
            }
        }
    }
}