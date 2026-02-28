// rozwijaj
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

sections.forEach(section => {
    observer.observe(section);
});


// suwak to koloru
const slider = document.getElementById("colorSlider");

slider.addEventListener("input", () => {
    const hue = slider.value;
    document.body.style.backgroundColor = `hsl(${hue}, 60%, 92%)`;
});