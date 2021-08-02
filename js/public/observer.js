const header = document.getElementById('header');
const heroSection = document.getElementById('heroSection');

const heroSectionOptions = {};

const heroSectionObserver = new IntersectionObserver(
    function(entries){

        entries.forEach((entry) => {
            if(!entry.isIntersecting)
            {
                header.classList.add('nav-scrolled');
               
            }
            else 
            {
                header.classList.remove('nav-scrolled');
            }
           
        });
    },
    
 heroSectionOptions)


 heroSectionObserver.observe(heroSection);



