


function toggleSelected()
{
    const selected = document.querySelector(".selected");
    const tabs = document.getElementsByClassName("tabs");
    for (const tab of tabs) {
        if (tab.classList.contains("selected")) {
            tab.classList.remove("selected");
        }
        else
        {
            tab.classList.add("selected");
        }
        
    }
 
}