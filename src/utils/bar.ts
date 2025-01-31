export const progressBar = (selector: string, filledBarNumSelector: string, remainingBarNumSelector:string, speed: number) => {
	let barSpeed = speed;
	const bar = document.querySelector(selector);
    const filledBarNum = document.querySelector(filledBarNumSelector);
    const remainingBarNum:  HTMLElement | null = document.querySelector(remainingBarNumSelector);
	
    if(bar) {
        const item: HTMLElement | null  = document.querySelector('.progress');
        if(item) {
            let itemValue:number | null = Number(item.dataset.percentage);
            if(itemValue) {
                var i = 0;
                // var value = $(this);
                
                var count = setInterval(function(){
                    if(i <= itemValue) {
                        var iStr = i.toString();

                        item.style.width = iStr+'%';
                        if(filledBarNum)
                            filledBarNum.innerHTML = iStr+'%';

                        if(remainingBarNum && Number(remainingBarNum.dataset.percentage) >= i) {
                            remainingBarNum.innerHTML = Math.round(Number(remainingBarNum.dataset.percentage))+'%';
                        }
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