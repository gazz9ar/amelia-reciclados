const tabs = document.querySelectorAll(".tabs");

for (const tab of tabs) {

    tab.addEventListener('click',(e) => {
     
    
        if (e.target.classList.contains('selected')) {
            
        }
        else {
            for (const tab of tabs) {
                if (tab.classList.contains('selected')) {
                    tab.classList.remove('selected');
                }
            }
            e.target.classList.add('selected');
        }
    })
}



